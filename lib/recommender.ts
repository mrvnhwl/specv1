import { mockGames } from '@/data/mock-games';
import { estimatePerformanceTier } from '@/lib/device';
import { DeviceProfile, PreferenceAnswers, RecommendationResult } from '@/lib/types';

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

// =========================
// 🔥 HEAVY GAME DETECTION
// =========================
function isHeavyGame(game: any) {
  return (
    game.minimum.cpuTier >= 3 ||
    game.minimum.gpuTier >= 3 ||
    game.minimum.ramGb >= 12
  );
}

// =========================
// REALISTIC SCORING
// =========================
function getSpecScore(device: Partial<DeviceProfile>, game: any, perf: any) {
  let score = 0;

  const ram = device.ramGb ?? device.detectedDeviceMemory ?? 4;
  const storage = device.storageGb ?? 128;

  // CPU (strict)
  if (perf.cpuTier >= game.recommended.cpuTier) score += 30;
  else if (perf.cpuTier >= game.minimum.cpuTier) score += 15;

  // GPU (very strict)
  if (perf.gpuTier >= game.recommended.gpuTier) score += 35;
  else if (perf.gpuTier >= game.minimum.gpuTier) score += 15;

  // RAM
  if (ram >= game.recommended.ramGb) score += 20;
  else if (ram >= game.minimum.ramGb) score += 10;

  // Storage
  if (storage >= game.minimum.storageGb) score += 15;

  // 🔥 HEAVY GAME PENALTY
  if (isHeavyGame(game)) {
    score -= 10;
  }

  return clamp(score);
}

// =========================
// LABEL (STRICT)
// =========================
function getLabel(score: number): RecommendationResult['compatibilityLabel'] {
  if (score >= 85) return 'Best Match';
  if (score >= 70) return 'Playable';
  if (score >= 50) return 'Might Struggle';
  return 'Needs Upgrade';
}

// =========================
// PERFORMANCE
// =========================
function getPerformance(score: number) {
  if (score >= 85) return 'Ultra';
  if (score >= 70) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
}

function getFPS(score: number) {
  if (score >= 85) return '60+ FPS';
  if (score >= 70) return '40–60 FPS';
  if (score >= 50) return '25–40 FPS';
  return '<25 FPS';
}

function getSettings(score: number) {
  if (score >= 85) return 'Ultra';
  if (score >= 70) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
}

// =========================
// CONFIDENCE
// =========================
function getConfidence(score: number, pref: number): 'Low' | 'Medium' | 'High' {
  const total = score * 0.6 + pref * 0.4;
  if (total >= 80) return 'High';
  if (total >= 60) return 'Medium';
  return 'Low';
}

// =========================
// GAMEPLAY COMMENT
// =========================
function getGameplayComment(game: any) {
  if (game.tags.includes('Shooter')) return 'Fast-paced shooting gameplay focused on reflex and aim.';
  if (game.tags.includes('Story Rich')) return 'Narrative-driven experience with strong storytelling.';
  if (game.tags.includes('Open World')) return 'Large world with exploration and freedom.';
  if (game.tags.includes('Competitive')) return 'Skill-based competitive gameplay.';
  return 'Balanced gameplay suitable for most players.';
}

// =========================
// UPGRADE SUGGESTION
// =========================
function getUpgrade(device: any, game: any, perf: any) {
  if (perf.gpuTier < game.minimum.gpuTier) return 'Your GPU is the main limitation — upgrading it will greatly improve performance.';
  if (perf.cpuTier < game.minimum.cpuTier) return 'Your CPU may bottleneck performance in this game.';
  if ((device.ramGb ?? 4) < game.minimum.ramGb) return `Upgrade RAM to at least ${game.minimum.ramGb}GB.`;
  return 'Your system is capable, but optimization may still be needed.';
}

// =========================
// MAIN FUNCTION
// =========================
export function scoreGames(
  device: Partial<DeviceProfile>,
  preferences: PreferenceAnswers
): RecommendationResult[] {

  const perf = estimatePerformanceTier(device);

  return mockGames.map((game) => {

    const compatibilityScore = getSpecScore(device, game, perf);
    const compatibilityLabel = getLabel(compatibilityScore);

    const matchedGenres = game.genres.filter((g) =>
      preferences.genres.some((p) => p.toLowerCase() === g.toLowerCase())
    );

    const genreHits = matchedGenres.length;

    const modeHits = game.tags.filter((tag) =>
      preferences.modes.some((mode) =>
        tag.toLowerCase().includes(mode.toLowerCase())
      )
    ).length;

    let preferenceScore = genreHits * 20 + modeHits * 8 + game.rating * 0.2;

    // =========================
    // 🔥 EXACTLY 3 SMART REASONS
    // =========================
    const reasons: string[] = [];

    // 1️⃣ GENRE
    reasons.push(
      genreHits > 0
        ? `Matches your preferred genre(s): ${matchedGenres.join(', ')}.`
        : 'Suggested based on popularity among similar players.'
    );

    // 2️⃣ GAMEPLAY
    reasons.push(getGameplayComment(game));

    // 3️⃣ REALISTIC PERFORMANCE (SKEPTICAL)
    if (compatibilityScore >= 80) {
      reasons.push('Should run very smoothly on your system.');
    } else if (compatibilityScore >= 65) {
      reasons.push('Playable, but may require some settings adjustments.');
    } else if (compatibilityScore >= 50) {
      reasons.push('⚠️ May struggle — lowering settings is recommended.');
    } else {
      reasons.push('⚠️ Likely to perform poorly on your current hardware.');
    }

    const finalScore = clamp(
      compatibilityScore * 0.6 + preferenceScore * 0.4
    );

    return {
      ...game,
      compatibilityScore,
      compatibilityLabel,
      preferenceScore: clamp(preferenceScore),
      finalScore,
      reasons,

      performanceLevel: getPerformance(compatibilityScore),
      fpsEstimate: getFPS(compatibilityScore),
      recommendedSettings: getSettings(compatibilityScore),
      confidence: getConfidence(compatibilityScore, preferenceScore),
      upgradeSuggestion: getUpgrade(device, game, perf),

      aiSummary:
        compatibilityScore >= 70
          ? `You will likely enjoy ${game.title} as it matches your interests and should run acceptably on your device.`
          : `You may like ${game.title}, but your current hardware could limit your experience.`
    };
  }).sort((a, b) => b.finalScore - a.finalScore);
}