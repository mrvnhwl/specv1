'use client';

import { PreferenceAnswers } from '@/lib/types';

const genres = ['Action', 'RPG', 'FPS', 'Adventure', 'Strategy', 'Simulation', 'Horror', 'Racing', 'Sports', 'Open World', 'Indie', 'MOBA'];
const modes = ['Singleplayer', 'Multiplayer', 'Competitive', 'Co-op', 'Casual'];

interface GenrePickerProps {
  value: PreferenceAnswers;
  onChange: (updated: PreferenceAnswers) => void;
}

export function GenrePicker({ value, onChange }: GenrePickerProps) {
  const toggleGenre = (genre: string) => {
    const genres = value.genres.includes(genre)
      ? value.genres.filter((g) => g !== genre)
      : [...value.genres, genre];
    onChange({ ...value, genres });
  };

  const toggleMode = (mode: string) => {
    const modes = value.modes.includes(mode)
      ? value.modes.filter((m) => m !== mode)
      : [...value.modes, mode];
    onChange({ ...value, modes });
  };

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan">Preference Intake</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Tell the system what kinds of games you like</h2>
      <p className="mt-2 max-w-2xl text-sm text-soft">
        These answers help rank games beyond hardware compatibility. The app saves them locally now, and in production they should be stored per user in Supabase.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-white">Choose your preferred genres</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  value.genres.includes(genre)
                    ? 'bg-gradient-to-r from-accent to-cyan text-slate-950'
                    : 'border border-line bg-white/5 text-soft hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
            <label className="flex min-w-[220px] items-center rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-soft">
              Other
              <input
                value={value.customGenre}
                onChange={(e) => onChange({ ...value, customGenre: e.target.value })}
                placeholder="Type your genre"
                className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </label>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-white">What kind of experience do you prefer?</p>
          <div className="flex flex-wrap gap-2">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => toggleMode(mode)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  value.modes.includes(mode)
                    ? 'bg-white text-slate-950'
                    : 'border border-line bg-white/5 text-soft hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {([
            ['freeToPlayOnly', 'Free-to-play only'],
            ['lowStorageOnly', 'Prefer smaller installs'],
            ['indieOnly', 'Prefer indie over AAA'],
            ['storyFocused', 'Story-focused picks']
          ] as const).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between rounded-2xl border border-line bg-white/5 px-4 py-4 text-sm text-soft">
              {label}
              <input
                type="checkbox"
                checked={value[key] as boolean}
                onChange={(e) => onChange({ ...value, [key]: e.target.checked })}
                className="h-4 w-4 accent-cyan"
              />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}