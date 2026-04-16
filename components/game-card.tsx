import { RecommendationResult } from '@/lib/types';
import { Star } from 'lucide-react';

const badgeStyle = {
  'Best Match': 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'Playable': 'border-cyan/30 bg-cyan/10 text-cyan',
  'Might Struggle': 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  'Needs Upgrade': 'border-rose-400/30 bg-rose-400/10 text-rose-300'
} as const;

const cpuTierMap: Record<number, string> = {
  1: 'Intel i3 / Ryzen 3',
  2: 'Intel i5 (old) / Ryzen 3',
  3: 'Intel i5 / Ryzen 5',
  4: 'Intel i7 / Ryzen 7+'
};

const gpuTierMap: Record<number, string> = {
  1: 'Intel HD / GT 1030',
  2: 'GTX 1050 / RX 560',
  3: 'GTX 1660 / RTX 2060',
  4: 'RTX 3060 / RX 6700 XT'
};

export function GameCard({ game }: { game: RecommendationResult }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-panel shadow-glow transition hover:scale-[1.01]">

      {/* IMAGE */}
      <img src={game.image} alt={game.title} className="h-44 w-full object-cover" />

      <div className="p-6 space-y-5">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{game.title}</h3>
            <p className="mt-1 text-sm text-soft">{game.shortDescription}</p>
          </div>

          <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle[game.compatibilityLabel]}`}>
            {game.compatibilityLabel}
          </span>
        </div>

        {/* GENRES */}
        <div className="flex flex-wrap gap-2">
          {game.genres.slice(0, 3).map((genre) => (
            <span key={genre} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-soft">
              {genre}
            </span>
          ))}
        </div>

        {/* 🎯 REQUIREMENTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* MIN */}
          <div className="rounded-2xl border border-line bg-white/5 p-4">
            <p className="text-xs text-soft uppercase mb-2">Minimum</p>

            <div className="space-y-1 text-sm">
              <p className="text-white">CPU T{game.minimum.cpuTier}</p>
              <p className="text-soft text-xs">{cpuTierMap[game.minimum.cpuTier]}</p>

              <p className="text-white mt-2">GPU T{game.minimum.gpuTier}</p>
              <p className="text-soft text-xs">{gpuTierMap[game.minimum.gpuTier]}</p>

              <p className="text-soft mt-2 text-xs">
                {game.minimum.ramGb}GB RAM • {game.minimum.storageGb}GB
              </p>
            </div>
          </div>

          {/* RECOMMENDED */}
          <div className="rounded-2xl border border-line bg-white/5 p-4">
            <p className="text-xs text-soft uppercase mb-2">Recommended</p>

            <div className="space-y-1 text-sm">
              <p className="text-white">CPU T{game.recommended.cpuTier}</p>
              <p className="text-soft text-xs">{cpuTierMap[game.recommended.cpuTier]}</p>

              <p className="text-white mt-2">GPU T{game.recommended.gpuTier}</p>
              <p className="text-soft text-xs">{gpuTierMap[game.recommended.gpuTier]}</p>

              <p className="text-soft mt-2 text-xs">
                {game.recommended.ramGb}GB RAM • {game.recommended.storageGb}GB
              </p>
            </div>
          </div>
        </div>

        {/* 📊 SCORES */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-soft text-xs">Compatibility</p>
            <p className="text-white font-semibold text-lg">{Math.round(game.compatibilityScore)}%</p>
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-soft text-xs">Preference</p>
            <p className="text-white font-semibold text-lg">{Math.round(game.preferenceScore)}%</p>
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-soft text-xs">Rating</p>
            <p className="flex justify-center items-center gap-1 text-white font-semibold text-lg">
              <Star className="h-4 w-4 text-cyan" /> {game.rating}
            </p>
          </div>
        </div>

        {/* ⚙️ PERFORMANCE */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-soft text-xs">Performance</p>
            <p className={`font-semibold ${
              game.performanceLevel === 'Low' ? 'text-rose-400' :
              game.performanceLevel === 'Medium' ? 'text-amber-300' :
              game.performanceLevel === 'High' ? 'text-cyan' :
              'text-emerald-400'
            }`}>
              {game.performanceLevel}
            </p>
          </div>

          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-soft text-xs">FPS</p>
            <p className="text-white">{game.fpsEstimate}</p>
          </div>

          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-soft text-xs">Settings</p>
            <p className="text-white">{game.recommendedSettings}</p>
          </div>

          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-soft text-xs">Confidence</p>
            <p className="text-white">{game.confidence}</p>
          </div>
        </div>

        {/* ⚠️ WARNING */}
        {game.compatibilityScore < 60 && (
          <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-xs text-rose-300">
            ⚠️ Your system may struggle to run this game smoothly.
          </div>
        )}

        {/* 🧠 AI SUMMARY */}
        <p className="text-sm text-cyan">
          {game.aiSummary}
        </p>

        {/* 📌 REASONS */}
        <ul className="space-y-1 text-sm text-soft">
          {game.reasons.map((reason) => (
            <li key={reason}>• {reason}</li>
          ))}
        </ul>

        {/* 🔧 UPGRADE */}
        <p className="text-xs text-amber-300">
          {game.upgradeSuggestion}
        </p>

      </div>
    </article>
  );
}