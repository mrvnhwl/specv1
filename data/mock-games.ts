import { GameEntry } from '@/lib/types';

export const mockGames: GameEntry[] = [
  {
    id: '1',
    steamAppId: 730,
    title: 'Counter-Strike 2',
    genres: ['FPS', 'Competitive', 'Multiplayer'],
    tags: ['Tactical', 'Shooter', 'Online'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
    shortDescription: 'Fast competitive shooter with a huge active player base.',
    isFree: true,
    rating: 88,
    minimum: { cpuTier: 2, gpuTier: 2, ramGb: 8, storageGb: 35 },
    recommended: { cpuTier: 3, gpuTier: 3, ramGb: 16, storageGb: 45 }
  },
  {
    id: '2',
    steamAppId: 1091500,
    title: 'Cyberpunk 2077',
    genres: ['RPG', 'Open World', 'Action'],
    tags: ['Story Rich', 'Sci-Fi', 'Singleplayer'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
    shortDescription: 'Narrative-heavy open-world RPG set in Night City.',
    isFree: false,
    rating: 86,
    minimum: { cpuTier: 3, gpuTier: 3, ramGb: 12, storageGb: 70 },
    recommended: { cpuTier: 4, gpuTier: 4, ramGb: 16, storageGb: 90 }
  },
  {
    id: '3',
    steamAppId: 292030,
    title: 'The Witcher 3: Wild Hunt',
    genres: ['RPG', 'Open World', 'Adventure'],
    tags: ['Story Rich', 'Fantasy', 'Singleplayer'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg',
    shortDescription: 'Large-scale fantasy RPG with deep quests and exploration.',
    isFree: false,
    rating: 95,
    minimum: { cpuTier: 2, gpuTier: 2, ramGb: 8, storageGb: 50 },
    recommended: { cpuTier: 3, gpuTier: 3, ramGb: 16, storageGb: 60 }
  },
  {
    id: '4',
    steamAppId: 1938090,
    title: 'Call of Duty®',
    genres: ['FPS', 'Action', 'Multiplayer'],
    tags: ['Shooter', 'Online', 'AAA'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/header.jpg',
    shortDescription: 'High-intensity shooter with large-scale online matches.',
    isFree: true,
    rating: 74,
    minimum: { cpuTier: 3, gpuTier: 3, ramGb: 12, storageGb: 125 },
    recommended: { cpuTier: 4, gpuTier: 4, ramGb: 16, storageGb: 150 }
  },
  {
    id: '5',
    steamAppId: 1174180,
    title: 'Red Dead Redemption 2',
    genres: ['Adventure', 'Open World', 'Action'],
    tags: ['Story Rich', 'Western', 'Singleplayer'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg',
    shortDescription: 'Open-world cinematic western with immersive storytelling.',
    isFree: false,
    rating: 94,
    minimum: { cpuTier: 3, gpuTier: 3, ramGb: 12, storageGb: 150 },
    recommended: { cpuTier: 4, gpuTier: 4, ramGb: 16, storageGb: 150 }
  },
  {
    id: '6',
    steamAppId: 1085660,
    title: 'Destiny 2',
    genres: ['FPS', 'Action', 'RPG'],
    tags: ['Co-op', 'Loot', 'Online'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/header.jpg',
    shortDescription: 'Co-op looter-shooter with raids and live seasonal content.',
    isFree: true,
    rating: 81,
    minimum: { cpuTier: 2, gpuTier: 2, ramGb: 8, storageGb: 105 },
    recommended: { cpuTier: 3, gpuTier: 3, ramGb: 16, storageGb: 120 }
  },
  {
    id: '7',
    steamAppId: 1245620,
    title: 'ELDEN RING',
    genres: ['RPG', 'Action', 'Adventure'],
    tags: ['Souls-like', 'Open World', 'Fantasy'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    shortDescription: 'Challenging action RPG focused on exploration and boss fights.',
    isFree: false,
    rating: 94,
    minimum: { cpuTier: 3, gpuTier: 3, ramGb: 12, storageGb: 60 },
    recommended: { cpuTier: 4, gpuTier: 4, ramGb: 16, storageGb: 60 }
  },
  {
    id: '8',
    steamAppId: 570,
    title: 'Dota 2',
    genres: ['MOBA', 'Strategy', 'Multiplayer'],
    tags: ['Competitive', 'Online', 'Team-Based'],
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg',
    shortDescription: 'Team-based strategy game with deep mechanics and esports appeal.',
    isFree: true,
    rating: 85,
    minimum: { cpuTier: 2, gpuTier: 1, ramGb: 4, storageGb: 20 },
    recommended: { cpuTier: 3, gpuTier: 2, ramGb: 8, storageGb: 30 }
  }
];
