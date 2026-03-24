import { RecommendationResult } from '@/lib/types';
import { Star } from 'lucide-react';

const badgeStyle = {
  'Best Match': 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'Playable': 'border-cyan/30 bg-cyan/10 text-cyan',
  'Might Struggle': 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  'Needs Upgrade': 'border-rose-400/30 bg-rose-400/10 text-rose-300'
} as const;

export function GameCard({ game }: { game: RecommendationResult }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-panel shadow-glow">
      <img src={game.image} alt={game.title} className="h-44 w-full object-cover" />
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{game.title}</h3>
            <p className="mt-1 text-sm text-soft">{game.shortDescription}</p>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle[game.compatibilityLabel]}`}>
            {game.compatibilityLabel}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {game.genres.slice(0, 3).map((genre) => (
            <span key={genre} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-soft">{genre}</span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-line bg-white/5 p-3">
            <p className="text-soft">Compatibility</p>
            <p className="mt-1 text-lg font-semibold text-white">{Math.round(game.compatibilityScore)}%</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/5 p-3">
            <p className="text-soft">Preference</p>
            <p className="mt-1 text-lg font-semibold text-white">{Math.round(game.preferenceScore)}%</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/5 p-3">
            <p className="text-soft">Rating</p>
            <p className="mt-1 flex items-center gap-1 text-lg font-semibold text-white"><Star className="h-4 w-4 text-cyan" /> {game.rating}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-soft">
          {game.reasons.map((reason) => <li key={reason}>• {reason}</li>)}
        </ul>
      </div>
    </article>
  );
}
