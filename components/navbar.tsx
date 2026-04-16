import Link from 'next/link';
import { Cpu, Gamepad2, MessageSquare, MonitorSmartphone } from 'lucide-react';

const links = [
  { href: '/devices', label: 'Devices', icon: MonitorSmartphone },
  { href: '/recommendations', label: 'Recommendations', icon: Gamepad2 },
  { href: '/chat', label: 'Upgrade Chat', icon: MessageSquare }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <div className="rounded-2xl border border-cyan/30 bg-white/5 p-2 shadow-glow">
            <Cpu className="h-5 w-5 text-cyan" />
          </div>
          SPEC
        </Link>

        <nav className="flex items-center gap-2 text-sm text-soft">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 transition hover:border-cyan/40 hover:text-white">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Link href="/login" className="rounded-full bg-gradient-to-r from-accent to-cyan px-4 py-2 font-medium text-slate-950">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
