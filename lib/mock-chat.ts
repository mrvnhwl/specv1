import { DeviceProfile } from '@/lib/types';

export function answerUpgradeQuestion(question: string, device: Partial<DeviceProfile>) {
  const q = question.toLowerCase();
  const ram = device.ramGb ?? device.detectedDeviceMemory ?? 8;
  const hasDedicatedGpu = !!device.gpuName;

  if (q.includes('upgrade') || q.includes('first')) {
    if (!hasDedicatedGpu) return 'For this device, the best first upgrade route is usually adding a dedicated GPU if the PC supports it. After that, move to 16GB RAM and an SSD if you still use a hard drive.';
    if (ram < 16) return 'A practical first upgrade is moving to 16GB RAM. That improves multitasking and helps many modern games load more smoothly.';
    return 'Your next upgrade depends on your target games. For heavier AAA titles, a stronger GPU is the most impactful route. For faster load times, add or upgrade to an SSD.';
  }

  if (q.includes('can i run')) {
    return 'Based on your saved device profile, I can compare a game against your current specs and tell you whether it is a best match, playable, or likely to struggle. In the production version, this should read live requirement data from Steam or a backup metadata source.';
  }

  if (q.includes('ram')) {
    return ram >= 16 ? 'Your current RAM is already in a good range for modern gaming.' : 'You would benefit from increasing RAM to 16GB, especially for newer games and smoother multitasking.';
  }

  return 'I can help with upgrade routes, game compatibility, and practical budget-focused advice. Ask things like: “What should I upgrade first?” or “Can I run open-world RPGs on this PC?”';
}
