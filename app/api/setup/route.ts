import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { registerSentinelCommands } from '@/lib/discord';

export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization');
  const token = process.env.SETUP_AUTH_TOKEN;

  if (!auth || !token || auth !== `Bearer ${token}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await registerSentinelCommands();

  return NextResponse.json({ status: 'commands registered' });
}
