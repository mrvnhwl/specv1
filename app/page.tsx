'use client';

import Link from 'next/link';
import { Cpu, Gamepad2, MessageSquareText, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-sm text-cyan">
            <Sparkles className="h-4 w-4" /> Intelligent game recommender
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl">
            Find games your PC can actually run.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">
            GameWise analyzes your device and recommends games that match your performance.
            No more guessing. No more wasted downloads.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/recommendations"
              className="rounded-2xl bg-gradient-to-r from-accent to-cyan px-6 py-4 font-semibold text-slate-950 shadow-md hover:shadow-xl hover:scale-[1.02] transition"
            >
              Get Recommendations
            </Link>

            <Link
              href="/chat"
              className="rounded-2xl border border-line bg-white/5 px-6 py-4 font-semibold text-white hover:bg-white/10 transition"
            >
              Ask AI Assistant
            </Link>
          </div>
        </div>

        {/* RIGHT FEATURES */}
        <div className="rounded-[2rem] border border-line bg-panel/80 p-6 shadow-glow">
          <div className="space-y-4">
            {features.map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-line bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 shrink-0">
                  <Icon className="h-5 w-5 text-cyan" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-soft">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white mb-6">
          How it works
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-white/5 p-6"
            >
              <div className="flex items-center gap-2 text-cyan mb-3">
                <CheckCircle2 className="h-5 w-5" />
                Step {i + 1}
              </div>

              <h3 className="text-white font-semibold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-soft">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <GameCarousel />

      {/* DEVICE SCAN */}
      <div className="mt-16">
        <DeviceScanCard />
      </div>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Ready to find your next game?
        </h2>

        <p className="mt-3 text-soft">
          Get personalized recommendations based on your PC.
        </p>

        <Link
          href="/recommendations"
          className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-accent to-cyan px-6 py-4 font-semibold text-slate-950"
        >
          Start Exploring
        </Link>
      </section>

    </main>
  );
}