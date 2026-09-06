'use client';

import { useEffect, useState } from 'react';
import { GenrePicker } from '@/components/genre-picker';
import { GameCard } from '@/components/game-card';
import { scoreGames } from '@/lib/recommender';
import { DeviceProfile, PreferenceAnswers, RecommendationResult } from '@/lib/types';

const defaultPreferences: PreferenceAnswers = {
  genres: ['RPG', 'OPEN WORLD'],
  customGenre: '',
  modes: ['SINGLEPLAYER'],
  freeToPlayOnly: false,
  lowStorageOnly: false,
  indieOnly: false,
  storyFocused: true
};

export default function RecommendationsPage() {
  const [device, setDevice] = useState<Partial<DeviceProfile> | null>(null);
  const [preferences, setPreferences] = useState<PreferenceAnswers>(defaultPreferences);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);

      const savedDevices = JSON.parse(localStorage.getItem('gamewise-devices') || '[]') as DeviceProfile[];
      const savedPreferences = JSON.parse(localStorage.getItem('gamewise-preferences') || 'null') as PreferenceAnswers | null;

      const activeDevice =
        savedDevices[0] || {
          osName: 'Windows',
          browser: 'Chrome',
          ramGb: 8,
          logicalCores: 8,
          label: 'Demo Device'
        };

      const activePreferences = savedPreferences || defaultPreferences;

      setDevice(activeDevice);
      setPreferences(activePreferences);

      try {
        const gameResults = await scoreGames(activeDevice, activePreferences);
        setResults(gameResults);
      } catch (error) {
        console.error('Error loading recommendations:', error);
        setResults([]); // fallback to empty results
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  const handlePreferencesChange = async (updated: PreferenceAnswers) => {
    setPreferences(updated);
    localStorage.setItem('gamewise-preferences', JSON.stringify(updated));

    if (device) {
      setLoading(true);
      try {
        const gameResults = await scoreGames(device, updated);
        setResults(gameResults);
      } catch (error) {
        console.error('Error updating recommendations:', error);
        setResults([]); // fallback to empty results
      } finally {
        setLoading(false);
      }
    }
  };

  // 🔥 FILTER + SEARCH
  const filteredResults = results.filter((game) => {
    // GENRE FILTER
    const genreMatch =
      preferences.genres.length === 0 ||
      game.genres.some((g) =>
        preferences.genres.some(
          (selected) => selected.toLowerCase() === g.toLowerCase()
        )
      );

    // MODE FILTER
    const modeMatch =
      preferences.modes.length === 0 ||
      preferences.modes.some((mode) =>
        game.tags.some((t) =>
          t.toLowerCase().includes(mode.toLowerCase())
        )
      );

    // SEARCH FILTER
    const searchMatch =
      search.trim() === '' ||
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.genres.some((g) =>
        g.toLowerCase().includes(search.toLowerCase())
      ) ||
      game.tags.some((t) =>
        t.toLowerCase().includes(search.toLowerCase())
      );

    return genreMatch && modeMatch && searchMatch;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* HEADER */}
      <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">
          Recommendation Engine
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Games matched to your current device and preferences
        </h1>
        <p className="mt-2 text-soft">
          Using <span className="text-white">{device?.label || 'your device'}</span> with genres{' '}
          <span className="text-white">
            {preferences.genres.length > 0
              ? preferences.genres.join(', ')
              : 'none selected'}
          </span>.
        </p>
      </section>

      {/* PREFERENCES */}
      <div className="mt-8">
        <GenrePicker value={preferences} onChange={handlePreferencesChange} />
      </div>

      {/* 🔥 SEARCH BAR (BELOW PREFERENCE INTAKE) */}
      <div className="mt-6">
        <p className="mb-2 text-sm text-soft">Search games</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search games (e.g. GTA, FPS, RPG...)"
          className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="mt-8 col-span-full text-center">
          <p className="text-soft">Loading recommendations...</p>
        </div>
      )}

      {/* RESULTS */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredResults.length > 0 ? (
          filteredResults.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-line bg-white/5 p-10 text-center text-soft">
            <p className="text-lg text-white">No games found.</p>
            <p className="mt-2 text-sm">
              Try a different search or adjust your preferences.
            </p>
          </div>
        )}
      </section>

    </main>
  );
}