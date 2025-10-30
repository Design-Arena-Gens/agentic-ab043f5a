import Link from 'next/link';
import {
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  CommandLineIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Slash-command automation',
    description:
      'Kick, ban, timeout, warn, and scan users directly from Discord using secure slash commands backed by REST moderation actions.'
  },
  {
    name: 'Zero-maintenance hosting',
    description:
      'Sentinel runs entirely on serverless infrastructure — no gateway websockets or background workers required.'
  },
  {
    name: 'Immutable audit trails',
    description:
      'Every moderation decision is acknowledged with an ephemeral summary to keep moderators aligned and transparent.'
  },
  {
    name: 'Security-first design',
    description:
      'Requests are signed and verified with Ed25519 signatures and need-to-know secrets to protect your Discord communities.'
  }
];

const commands = [
  {
    name: '/sentinel-kick',
    usage: '/sentinel-kick user:@member reason:"reason" notify_user:true',
    description:
      'Remove a user from the guild with an optional direct-message notification containing the moderator-provided reason.'
  },
  {
    name: '/sentinel-ban',
    usage: '/sentinel-ban user:@member reason:"reason" delete_days:1',
    description:
      'Ban a user and optionally remove up to seven days of their message history while documenting the cause.'
  },
  {
    name: '/sentinel-timeout',
    usage: '/sentinel-timeout user:@member duration_minutes:60 reason:"reason"',
    description:
      'Silence a user with a temporary timeout up to 28 days to de-escalate disruptive behavior.'
  },
  {
    name: '/sentinel-warn',
    usage: '/sentinel-warn user:@member severity:medium reason:"reason"',
    description:
      'Deliver structured warnings that help moderators enforce policy with consistent language across the team.'
  },
  {
    name: '/sentinel-scan',
    usage: '/sentinel-scan channel:#general window_minutes:15',
    description:
      'Run rapid security sweeps that highlight suspicious attachments, links, and recent joins for proactive moderation.'
  }
];

const setupSteps = [
  {
    title: 'Create a Discord application',
    details:
      'Visit the Discord Developer Portal, create a new application, enable the interactions endpoint, and grab the Application ID, Public Key, and Bot Token.'
  },
  {
    title: 'Configure environment variables',
    details:
      'Set DISCORD_PUBLIC_KEY, DISCORD_APPLICATION_ID, DISCORD_BOT_TOKEN, DISCORD_GUILD_ID, and SETUP_AUTH_TOKEN on Vercel before deploying.'
  },
  {
    title: 'Register slash commands',
    details:
      'Issue a POST request to /api/setup with the SETUP_AUTH_TOKEN header to publish or refresh Sentinel’s slash commands within your guild.'
  },
  {
    title: 'Route the interaction endpoint',
    details:
      'Point the Discord interactions URL to https://agentic-ab043f5a.vercel.app/api/interactions to begin receiving commands.'
  }
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden pb-24">
      <div className="grid-overlay" aria-hidden />
      <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-12">
        <section className="glass relative overflow-hidden p-10">
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary-700/30 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-400">Sentinel</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Discord Moderation &amp; Security Ops without the overhead
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-300">
              Sentinel pairs Discord interactions with hardened API routes so you can automate moderation, protect
              communities, and empower moderators — all hosted on serverless infrastructure that scales as fast as your
              server.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#setup"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
              >
                <ShieldCheckIcon className="h-5 w-5" />
                Secure setup guide
              </Link>
              <Link
                href="#commands"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-primary-400"
              >
                <CommandLineIcon className="h-5 w-5" />
                Explore slash commands
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          {features.map(({ name, description }) => (
            <article key={name} className="glass p-8">
              <h2 className="text-xl font-semibold text-white">{name}</h2>
              <p className="mt-3 text-sm text-slate-300">{description}</p>
            </article>
          ))}
        </section>

        <section id="setup" className="mt-24">
          <div className="flex items-center gap-3">
            <CircleStackIcon className="h-7 w-7 text-primary-400" />
            <h2 className="text-3xl font-semibold">Provision Sentinel</h2>
          </div>
          <p className="mt-4 max-w-3xl text-slate-300">
            Sentinel needs a small collection of Discord credentials. Set these secrets inside your Vercel project before
            running the setup endpoint.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {setupSteps.map((step) => (
              <div key={step.title} className="glass p-6">
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 glass p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <DocumentDuplicateIcon className="h-5 w-5 text-primary-400" /> Environment requirements
            </h3>
            <div className="mt-4 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-slate-100">Required secrets</p>
                <ul className="mt-2 space-y-2">
                  <li><code className="rounded bg-slate-900 px-2 py-1">DISCORD_PUBLIC_KEY</code></li>
                  <li><code className="rounded bg-slate-900 px-2 py-1">DISCORD_APPLICATION_ID</code></li>
                  <li><code className="rounded bg-slate-900 px-2 py-1">DISCORD_BOT_TOKEN</code></li>
                  <li><code className="rounded bg-slate-900 px-2 py-1">DISCORD_GUILD_ID</code></li>
                  <li><code className="rounded bg-slate-900 px-2 py-1">SETUP_AUTH_TOKEN</code></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-100">Optional guards</p>
                <ul className="mt-2 space-y-2">
                  <li><code className="rounded bg-slate-900 px-2 py-1">DISCORD_AUDIT_CHANNEL_ID</code> for automated audit posts</li>
                  <li><code className="rounded bg-slate-900 px-2 py-1">NEXT_PUBLIC_SITE_URL</code> to harden CORS and callbacks</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Protect the <code>SETUP_AUTH_TOKEN</code> value; it is required to invoke the command registration endpoint and
              prevents unauthorized reconfiguration.
            </p>
          </div>
        </section>

        <section id="commands" className="mt-24">
          <div className="glass p-8">
            <h2 className="text-3xl font-semibold">Slash commands</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Sentinel combines fine-grained command options with Discord permissions to keep your community safe. Each
              command responds with an ephemeral summary for moderators and optional audit channel broadcasts.
            </p>
            <div className="mt-8 space-y-6">
              {commands.map((command) => (
                <div key={command.name} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-primary-300">{command.name}</p>
                    <code className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300">{command.usage}</code>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{command.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t border-white/5 pt-8 text-center text-xs text-slate-500">
          Built with ❤ for Discord security teams. Deploy on Vercel for always-on protection.
        </footer>
      </div>
    </main>
  );
}
