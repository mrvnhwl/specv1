'use client';

import Image from 'next/image';
import { mockGames } from '@/data/mock-games';

export function GameCarousel() {

  // optional: limit to 10 games for performance
  const games = mockGames.slice(0, 50);

  return (
    <div className="overflow-hidden relative mt-12">

      <div className="flex gap-6 animate-scroll">

        {[...games, ...games].map((game, i) => (
          <div
            key={game.id + '-' + i}
            className="min-w-[260px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
          >
            <Image
              src={game.image}
              alt={game.title}
              width={300}
              height={150}
              className="w-full h-[140px] object-cover"
            />

            <div className="p-3">
              <p className="text-sm font-semibold text-white">
                {game.title}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}