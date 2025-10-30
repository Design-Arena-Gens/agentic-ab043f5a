import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sentinel - Discord Moderation Bot',
  description:
    'Sentinel is a Discord moderation bot powered by slash commands and security automation. Configure and deploy it from this control center.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-950">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
