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
  const ua = navigator.userAgent;

  const logicalCores = navigator.hardwareConcurrency;
  const memory = (navigator as any).deviceMemory || 4;

  return {
    label: 'Detected Device',
    osName: detectOS(ua),
    browser: detectBrowserName(ua),
    logicalCores,
    detectedDeviceMemory: memory,
    ramGb: memory,
    storageGb: 128 + logicalCores * 16,
    resolution: `${screen.width}x${screen.height}`,
    isCurrent: true
  };
}

export function estimatePerformanceTier(device: Partial<DeviceProfile>) {
  const cores = device.logicalCores ?? 4;
  const ram = device.ramGb ?? device.detectedDeviceMemory ?? 4;

  let cpuTier = 1;
  if (cores >= 16) cpuTier = 4;
  else if (cores >= 8) cpuTier = 3;
  else if (cores >= 4) cpuTier = 2;

  let gpuTier = device.gpuName
    ? /rtx 40|rx 7/i.test(device.gpuName)
      ? 4
      : /rtx 30|rx 6/i.test(device.gpuName)
        ? 3
        : /gtx|vega|iris/i.test(device.gpuName)
          ? 2
          : 1
    : cpuTier - 1;

  return {
    cpuTier,
    gpuTier,
    ramTier: ram >= 16 ? 4 : ram >= 8 ? 2 : 1
  };
}