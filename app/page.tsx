'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Cpu, Gamepad2, MessageSquareText, Sparkles } from 'lucide-react';
import { DeviceScanCard } from '@/components/device-scan-card';
import { GenrePicker } from '@/components/genre-picker';
import { PreferenceAnswers } from '@/lib/types';

const defaultPreferences: PreferenceAnswers = {
  genres: ['RPG', 'Open World'],
  customGenre: '',
  modes: ['Singleplayer'],
  freeToPlayOnly: false,
  lowStorageOnly: false,
  indieOnly: false,
  storyFocused: true
};

const features = [
  {
    icon: Cpu,
    title: 'Device-aware recommendations',
    copy: 'Scan what the browser can detect, confirm missing specs, and save multiple PCs to your account.'
  },
  {
    icon: Gamepad2,
    title: 'Game matching by taste and power',
    copy: 'Recommendations consider preferred genres, modes, storage limits, and hardware fit.'
  },
  {
    icon: MessageSquareText,
    title: 'Upgrade assistant',
    copy: 'Ask follow-up questions about bottlenecks, upgrade routes, and what games fit your current system.'
  }
];

export default function HomePage() {
  const [preferences, setPreferences] = useState<PreferenceAnswers>(defaultPreferences);

  const handlePreferencesChange = (updated: PreferenceAnswers) => {
    setPreferences(updated);
    localStorage.setItem('gamewise-preferences', JSON.stringify(updated));
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-sm text-cyan">
            <Sparkles className="h-4 w-4" /> Intelligent game recommender
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl">
            Find Steam-ready games your current PC can actually play.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-soft">
            GameWise combines device profiles, favorite genres, and recommendation scoring to suggest games that match both your hardware and your taste.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/recommendations" className="rounded-2xl bg-gradient-to-r from-accent to-cyan px-6 py-4 font-semibold text-slate-950">
              Open recommendations
            </Link>
            <Link href="/devices" className="rounded-2xl border border-line bg-white/5 px-6 py-4 font-semibold text-white">
              Manage devices
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-line bg-panel/80 p-6 shadow-glow">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-3xl border border-line bg-white/5 p-4">
                <Icon className="h-5 w-5 text-cyan" />
                <h2 className="mt-4 text-base font-semibold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-soft">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10 space-y-8">
        <DeviceScanCard />
        <GenrePicker value={preferences} onChange={handlePreferencesChange} />
      </div>
    </main>
  );
}