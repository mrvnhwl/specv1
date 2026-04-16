// =========================
// DEVICE PROFILE
// =========================
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

  // 🔥 Computed performance tiers
  cpuTier?: number;
  gpuTier?: number;
  ramTier?: number;

  createdAt: string;
  lastUsedAt: string;

  isCurrent?: boolean;
};


// =========================
// USER PREFERENCES
// =========================
export type PreferenceAnswers = {
  genres: string[];
  customGenre?: string;

  modes: string[];

  freeToPlayOnly: boolean;
  lowStorageOnly: boolean;
  indieOnly: boolean;
  storyFocused: boolean;
};


// =========================
// GAME REQUIREMENTS
// =========================
export type GameRequirementTier = {
  cpuTier: number;
  gpuTier: number;
  ramGb: number;
  storageGb: number;
};


// =========================
// GAME ENTRY
// =========================
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


// =========================
// RECOMMENDATION RESULT
// =========================
export type RecommendationResult = GameEntry & {
  compatibilityLabel: 'Best Match' | 'Playable' | 'Might Struggle' | 'Needs Upgrade';
  compatibilityScore: number;

  preferenceScore: number;
  finalScore: number;

  // 🎯 Explanation system
  reasons: string[];

  // ⚙️ Performance insights (NOW REQUIRED)
  performanceLevel: 'Low' | 'Medium' | 'High' | 'Ultra';
  fpsEstimate: string;
  recommendedSettings: string;
  confidence: 'Low' | 'Medium' | 'High';

  // 🧠 AI explanation
  aiSummary: string;

  // 🔧 System advice
  upgradeSuggestion: string;
};


// =========================
// CHAT MESSAGE
// =========================
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};