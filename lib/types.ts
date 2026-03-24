export type DeviceProfile = {
  id: string;
  label: string;
  osName: string;
  browser: string;
  cpuName?: string;
  gpuName?: string;
  ramGb?: number;
  storageGb?: number;
  resolution?: string;
  logicalCores?: number;
  detectedDeviceMemory?: number;
  createdAt: string;
  lastUsedAt: string;
  isCurrent?: boolean;
};

export type PreferenceAnswers = {
  genres: string[];
  customGenre?: string;
  modes: string[];
  freeToPlayOnly: boolean;
  lowStorageOnly: boolean;
  indieOnly: boolean;
  storyFocused: boolean;
};

export type GameRequirementTier = {
  cpuTier: number;
  gpuTier: number;
  ramGb: number;
  storageGb: number;
};

export type GameEntry = {
  id: string;
  steamAppId?: number;
  title: string;
  genres: string[];
  tags: string[];
  image: string;
  shortDescription: string;
  isFree: boolean;
  rating: number;
  minimum: GameRequirementTier;
  recommended: GameRequirementTier;
};

export type RecommendationResult = GameEntry & {
  compatibilityLabel: 'Best Match' | 'Playable' | 'Might Struggle' | 'Needs Upgrade';
  compatibilityScore: number;
  preferenceScore: number;
  finalScore: number;
  reasons: string[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
