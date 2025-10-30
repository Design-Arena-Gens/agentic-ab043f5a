import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  performModerationAction,
  verifyDiscordRequest,
  discordApiFetch,
  type DiscordInteraction,
  type InteractionResponse
} from '@/lib/discord';
import { env } from '@/lib/env';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  let publicKey: string;

  try {
    publicKey = env.discordPublicKey();
  } catch (error) {
    return new NextResponse('Server misconfiguration', { status: 500 });
  }

  const rawBody = await request.text();

  if (!publicKey || !verifyDiscordRequest({ body: rawBody, signature: signature ?? '', timestamp: timestamp ?? '', publicKey })) {
    return new NextResponse('Invalid request signature', { status: 401 });
  }

  const interaction = JSON.parse(rawBody) as DiscordInteraction;

  if (interaction.type === 1) {
    const response: InteractionResponse = { type: 1 };
    return NextResponse.json(response);
  }

  if (interaction.type === 2 && interaction.data) {
    try {
      const result = await performModerationAction(interaction.data.name, interaction);

      if (result.notifyChannel) {
        await broadcastAuditLog(interaction, result.message).catch(() => undefined);
      }

      const response: InteractionResponse = {
        type: 4,
        data: {
          content: result.message,
          flags: 1 << 6 // EPHEMERAL
        }
      };

      return NextResponse.json(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';

      const response: InteractionResponse = {
        type: 4,
        data: {
          content: `⚠️ Moderation action failed: ${message}`,
          flags: 1 << 6
        }
      };

      return NextResponse.json(response);
    }
  }

  return NextResponse.json(
    {
      type: 4,
      data: {
        content: 'Unsupported interaction type. Use `/sentinel-*` commands to moderate your server.',
        flags: 1 << 6
      }
    } satisfies InteractionResponse
  );
}

async function broadcastAuditLog(interaction: DiscordInteraction, message: string) {
  const channelId = env.auditChannelId();
  if (!channelId) return;

  const moderator = interaction.member?.user
    ? `<@${interaction.member.user.id}>`
    : 'Unknown moderator';

  const embed = {
    title: 'Sentinel Warning Issued',
    description: message,
    color: 0x6366f1,
    footer: {
      text: `Moderator: ${moderator}`
    },
    timestamp: new Date().toISOString()
  };

  await discordApiFetch(`/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ embeds: [embed] })
  });
}
