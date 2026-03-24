'use client';

import { useEffect, useState } from 'react';
import { GenrePicker } from '@/components/genre-picker';
import { GameCard } from '@/components/game-card';
import { scoreGames } from '@/lib/recommender';
import { DeviceProfile, PreferenceAnswers, RecommendationResult } from '@/lib/types';

const defaultPreferences: PreferenceAnswers = {
  genres: ['RPG', 'Open World'],
  customGenre: '',
  modes: ['Singleplayer'],
  freeToPlayOnly: false,
  lowStorageOnly: false,
  indieOnly: false,
  storyFocused: true
};

export default function RecommendationsPage() {
  const [device, setDevice] = useState<Partial<DeviceProfile> | null>(null);
  const [preferences, setPreferences] = useState<PreferenceAnswers>(defaultPreferences);
  const [results, setResults] = useState<RecommendationResult[]>([]);

  useEffect(() => {
    const savedDevices = JSON.parse(localStorage.getItem('gamewise-devices') || '[]') as DeviceProfile[];
    const savedPreferences = JSON.parse(localStorage.getItem('gamewise-preferences') || 'null') as PreferenceAnswers | null;
    const activeDevice = savedDevices[0] || { osName: 'Windows', browser: 'Chrome', ramGb: 8, logicalCores: 8, label: 'Demo Device' };
    const activePreferences = savedPreferences || defaultPreferences;
    setDevice(activeDevice);
    setPreferences(activePreferences);
    setResults(scoreGames(activeDevice, activePreferences));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">Recommendation Engine</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Games matched to your current device and preferences</h1>
        <p className="mt-2 text-soft">
          Using <span className="text-white">{device?.label || 'your device'}</span> with genres <span className="text-white">{preferences.genres.join(', ')}</span>.
        </p>
      </section>

      <div className="mt-8">
        <GenrePicker />
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>
    </main>
  );
}
