import Link from 'next/link';
import { Cpu, Gamepad2, MessageSquare, MonitorSmartphone } from 'lucide-react';

const links = [
  { href: '/devices', label: 'Devices', icon: MonitorSmartphone },
  { href: '/recommendations', label: 'Recommendations', icon: Gamepad2 },
  { href: '/chat', label: 'Upgrade Assistant', icon: MessageSquare }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#071014]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-lg font-bold tracking-[0.18em] text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10 shadow-[0_0_24px_rgba(0,255,170,0.12)]">
            <Cpu className="h-4 w-4 text-cyan" />
          </div>
          <span>SPEC<span className="text-accent">.</span></span>
        </Link>

        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto text-xs text-soft md:gap-2 md:text-sm">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-white md:px-4">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

        </nav>
      </div>
    </header>
  );
}
