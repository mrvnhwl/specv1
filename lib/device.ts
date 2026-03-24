import { DeviceProfile } from '@/lib/types';

export function detectBrowserName(userAgent: string) {
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/chrome|chromium/i.test(userAgent)) return 'Chrome';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return 'Safari';
  return 'Unknown Browser';
}

export function detectOS(userAgent: string) {
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/mac os x/i.test(userAgent)) return 'macOS';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ios/i.test(userAgent)) return 'iOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  return 'Unknown OS';
}

export function buildDetectedDevice(): Omit<DeviceProfile, 'id' | 'createdAt' | 'lastUsedAt'> {
  const ua = typeof window !== 'undefined' ? window.navigator.userAgent : '';
  const osName = detectOS(ua);
  const browser = detectBrowserName(ua);
  const logicalCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined;
  const detectedDeviceMemory = typeof navigator !== 'undefined' ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory : undefined;
  const resolution = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : undefined;

  return {
    label: `${osName} ${browser} Device`,
    osName,
    browser,
    resolution,
    logicalCores,
    detectedDeviceMemory,
    isCurrent: true
  };
}

export function estimatePerformanceTier(device: Partial<DeviceProfile>) {
  const cpuTier = device.logicalCores && device.logicalCores >= 12 ? 4 : device.logicalCores && device.logicalCores >= 8 ? 3 : device.logicalCores && device.logicalCores >= 4 ? 2 : 1;
  const ramTier = device.ramGb && device.ramGb >= 16 ? 4 : device.ramGb && device.ramGb >= 12 ? 3 : device.ramGb && device.ramGb >= 8 ? 2 : 1;
  const gpuTier = device.gpuName
    ? /rtx 40|rx 7|rtx 30/i.test(device.gpuName)
      ? 4
      : /gtx 16|rtx 20|rx 6/i.test(device.gpuName)
        ? 3
        : /gtx 10|rx 5|vega/i.test(device.gpuName)
          ? 2
          : 1
    : Math.max(1, Math.min(4, cpuTier));

  return {
    cpuTier,
    ramTier,
    gpuTier
  };
}
