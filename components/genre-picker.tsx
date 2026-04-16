'use client';

import { PreferenceAnswers } from '@/lib/types';

const genres = [
  'Action',
  'RPG',
  'FPS',
  'Adventure',
  'Strategy',
  'Simulation',
  'Horror',
  'Racing',
  'Sports',
  'Open World',
  'Indie',
  'MOBA'
];

const modes = ['Singleplayer', 'Multiplayer', 'Competitive', 'Co-op', 'Casual'];

interface GenrePickerProps {
  value: PreferenceAnswers;
  onChange: (updated: PreferenceAnswers) => void;
}

export function GenrePicker({ value, onChange }: GenrePickerProps) {

  // ✅ FIXED (normalize to uppercase)
  const toggleGenre = (genre: string) => {
    const normalized = genre.toUpperCase();

    const updated = value.genres.includes(normalized)
      ? value.genres.filter((g) => g !== normalized)
      : [...value.genres, normalized];

    onChange({
      ...value,
      genres: updated
    });
  };

  // ✅ FIXED (normalize to uppercase)
  const toggleMode = (mode: string) => {
    const normalized = mode.toUpperCase();

    const updated = value.modes.includes(normalized)
      ? value.modes.filter((m) => m !== normalized)
      : [...value.modes, normalized];

    onChange({
      ...value,
      modes: updated
    });
  };

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan">Preference Intake</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
        Tell the system what kinds of games you like
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-soft">
        These answers help rank games beyond hardware compatibility.
      </p>

      <div className="mt-6 space-y-6">

        {/* GENRES */}
        <div>
          <p className="mb-3 text-sm font-medium text-white">Choose your preferred genres</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isActive = value.genres.includes(genre.toUpperCase());

              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-accent to-cyan text-slate-950'
                      : 'border border-line bg-white/5 text-soft hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              );
            })}

            <label className="flex min-w-[220px] items-center rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-soft">
              Other
              <input
                value={value.customGenre}
                onChange={(e) =>
                  onChange({ ...value, customGenre: e.target.value })
                }
                placeholder="Type your genre"
                className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </label>
          </div>
        </div>

        {/* MODES */}
        <div>
          <p className="mb-3 text-sm font-medium text-white">What kind of experience do you prefer?</p>
          <div className="flex flex-wrap gap-2">
            {modes.map((mode) => {
              const isActive = value.modes.includes(mode.toUpperCase());

              return (
                <button
                  key={mode}
                  onClick={() => toggleMode(mode)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? 'bg-white text-slate-950'
                      : 'border border-line bg-white/5 text-soft hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* CHECKBOXES */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {([
            ['freeToPlayOnly', 'Free-to-play only'],
            ['lowStorageOnly', 'Prefer smaller installs'],
            ['indieOnly', 'Prefer indie over AAA'],
            ['storyFocused', 'Story-focused picks']
          ] as const).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between rounded-2xl border border-line bg-white/5 px-4 py-4 text-sm text-soft"
            >
              {label}
              <input
                type="checkbox"
                checked={value[key] as boolean}
                onChange={(e) =>
                  onChange({ ...value, [key]: e.target.checked })
                }
                className="h-4 w-4 accent-cyan"
              />
            </label>
          ))}
        </div>

      </div>
    </section>
  );
}