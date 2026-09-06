'use client';

import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Cpu, Gamepad2, Gauge, MessageSquareText, ScanLine, Sparkles } from 'lucide-react';
import { DeviceScanCard } from '@/components/device-scan-card';
import { GameCarousel } from '@/components/game-carousel';

const features = [
  {
    icon: Cpu,
    title: 'Device-aware recommendations',
    copy: 'Scan your PC specs and get accurate suggestions based on real hardware capability.'
  },
  {
    icon: Gamepad2,
    title: 'Game compatibility matching',
    copy: 'Find games your system can actually run without guessing or wasting downloads.'
  },
  {
    icon: MessageSquareText,
    title: 'AI upgrade assistant',
    copy: 'Ask what to upgrade, detect bottlenecks, and get smart hardware advice instantly.'
  }
];

const steps = [
  {
    title: 'Scan your device',
    desc: 'Detect your PC specs and confirm missing details.'
  },
  {
    title: 'Get recommendations',
    desc: 'See games that match your system performance.'
  },
  {
    title: 'Upgrade smarter',
    desc: 'Use AI chat to improve your PC step-by-step.'
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 md:px-8 md:pt-14">
      <section className="hero-grid relative overflow-hidden border-y border-white/10 py-12 md:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="eyebrow inline-flex items-center gap-2 text-cyan">
              <Sparkles className="h-4 w-4" /> Hardware-aware discovery
            </div>
            <h1 className="display-heading mt-6 max-w-4xl text-6xl font-bold leading-[0.9] text-white md:text-8xl">
              Your next game,
              <span className="block text-accent">properly matched.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-soft md:text-lg">
              SPEC reads the machine you have and surfaces the games it can deliver. Less tab-hopping, more time playing.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/recommendations" className="group inline-flex items-center gap-3 rounded-xl bg-accent px-5 py-3.5 font-bold text-[#071014] transition hover:bg-[#ff8a5f]">
                Explore matches <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/devices" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 font-semibold text-white transition hover:border-cyan/50 hover:bg-cyan/10">
                <ScanLine className="h-4 w-4 text-cyan" /> Scan my device
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-soft">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> No downloads</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Browser-based scan</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Built for real hardware</span>
            </div>
          </div>

          <div className="relative border border-white/15 bg-[#0b1a1e]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] md:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white"><Gauge className="h-4 w-4 text-cyan" /> Match engine</div>
              <span className="eyebrow text-accent">Live preview</span>
            </div>
            <div className="py-6">
              <p className="eyebrow text-soft">Current profile</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-2xl font-bold text-white">Your gaming setup</p>
                <span className="text-xs text-cyan">Ready to scan</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[['CPU', '8 cores'], ['RAM', '16 GB'], ['GPU', 'Detected']].map(([label, value]) => (
                <div key={label} className="border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-soft">{label}</p>
                  <p className="mt-2 text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 border-l-2 border-accent bg-accent/10 p-3 text-sm text-soft">
              <Cpu className="h-5 w-5 shrink-0 text-accent" /> Scan once. Get a shortlist that makes sense.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div><p className="eyebrow text-accent">The short version</p><h2 className="display-heading mt-2 text-3xl font-bold text-white md:text-4xl">From specs to shortlist.</h2></div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-soft md:block">A calmer way to decide what belongs in your library next.</p>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#0b1a1e] p-6 transition hover:bg-[#102329] md:p-8"
            >
              <div className="flex items-start justify-between"><span className="text-4xl font-bold text-white/20">0{i + 1}</span><ArrowUpRight className="h-5 w-5 text-cyan" /></div>
              <h3 className="mt-8 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-soft">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-5 flex items-end justify-between"><div><p className="eyebrow text-cyan">Popular right now</p><h2 className="display-heading mt-2 text-3xl font-bold text-white">A taste of the library.</h2></div><Gamepad2 className="h-6 w-6 text-accent" /></div>
        <GameCarousel />
      </section>

      <div className="mt-20">
        <DeviceScanCard />
      </div>

      <section className="mt-20 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end">
        <div><p className="eyebrow text-accent">Ready when you are</p><h2 className="display-heading mt-2 text-3xl font-bold text-white">Stop guessing. Start playing.</h2></div>
        <Link href="/recommendations" className="inline-flex items-center gap-3 self-start rounded-xl border border-cyan/40 bg-cyan/10 px-5 py-3.5 font-bold text-cyan transition hover:bg-cyan/20 md:self-auto">Start exploring <ArrowUpRight className="h-5 w-5" /></Link>
      </section>
    </main>
  );
}