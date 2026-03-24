import { mockGames } from '@/data/mock-games';
import { estimatePerformanceTier } from '@/lib/device';
import { DeviceProfile, PreferenceAnswers, RecommendationResult } from '@/lib/types';

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function scoreGames(device: Partial<DeviceProfile>, preferences: PreferenceAnswers): RecommendationResult[] {
  const perf = estimatePerformanceTier(device);

  return mockGames.map((game) => {
    const minimumFit =
      perf.cpuTier >= game.minimum.cpuTier &&
      perf.gpuTier >= game.minimum.gpuTier &&
      (device.ramGb ?? device.detectedDeviceMemory ?? 4) >= game.minimum.ramGb;

    const recommendedFit =
      perf.cpuTier >= game.recommended.cpuTier &&
      perf.gpuTier >= game.recommended.gpuTier &&
      (device.ramGb ?? device.detectedDeviceMemory ?? 4) >= game.recommended.ramGb;

    const genreHits = game.genres.filter((genre) => preferences.genres.includes(genre)).length;
    const customHit = preferences.customGenre && game.genres.join(' ').toLowerCase().includes(preferences.customGenre.toLowerCase()) ? 1 : 0;
    const modeHits = game.tags.filter((tag) => preferences.modes.some((mode) => tag.toLowerCase().includes(mode.toLowerCase()))).length;

    let preferenceScore = genreHits * 20 + customHit * 15 + modeHits * 8;
    if (preferences.freeToPlayOnly && game.isFree) preferenceScore += 12;
    if (preferences.lowStorageOnly && game.minimum.storageGb <= 60) preferenceScore += 10;
    if (preferences.storyFocused && game.tags.includes('Story Rich')) preferenceScore += 10;
    if (preferences.indieOnly && game.tags.includes('AAA')) preferenceScore -= 20;
    preferenceScore += game.rating * 0.2;

    let compatibilityScore = 0;
    if (recommendedFit) compatibilityScore = 95;
    else if (minimumFit) compatibilityScore = 75;
    else compatibilityScore = clamp(45 + perf.cpuTier * 8 + perf.gpuTier * 8 - game.minimum.cpuTier * 6 - game.minimum.gpuTier * 6);

    let compatibilityLabel: RecommendationResult['compatibilityLabel'] = 'Needs Upgrade';
    if (recommendedFit) compatibilityLabel = 'Best Match';
    else if (minimumFit) compatibilityLabel = 'Playable';
    else if (compatibilityScore >= 55) compatibilityLabel = 'Might Struggle';

    const reasons = [
      genreHits > 0 ? `Matches ${genreHits} of your chosen genres.` : 'Broader discovery pick based on your profile.',
      minimumFit ? 'Your current device reaches the minimum requirement.' : 'This title may need a stronger device or upgrades.',
      preferences.freeToPlayOnly && game.isFree ? 'Fits your free-to-play preference.' : 'Included for gameplay fit and popularity.'
    ];

    const finalScore = clamp(compatibilityScore * 0.55 + preferenceScore * 0.45);

    return {
      ...game,
      compatibilityLabel,
      compatibilityScore,
      preferenceScore: clamp(preferenceScore),
      finalScore,
      reasons
    };
  }).sort((a, b) => b.finalScore - a.finalScore);
}
