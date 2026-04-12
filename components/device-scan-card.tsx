'use client';

import { useEffect, useState } from 'react';
import { buildDetectedDevice } from '@/lib/device';
import { DeviceProfile } from '@/lib/types';
import { Cpu, HardDrive, MemoryStick, Monitor } from 'lucide-react';
import { getGPUTier } from '@pmndrs/detect-gpu';

const initialEditable = {
  cpuName: '',
  gpuName: '',
  ramGb: 8,
  storageGb: 256
};

// ✅ Helpers
function getGpuTierLabel(tier?: number | null) {
  if (tier === null || tier === undefined) return 'Unknown';
  if (tier <= 1) return 'Low';
  if (tier === 2) return 'Medium';
  return 'High';
}

function getRecommendedSettings(tier?: number | null) {
  if (tier === null || tier === undefined) {
    return { preset: 'Unknown', resolution: '-', fps: '-', notes: '' };
  }

  if (tier <= 1) {
    return {
      preset: 'Low',
      resolution: '720p',
      fps: '30 FPS',
      notes: 'Best for lightweight games only'
    };
  }

  if (tier === 2) {
    return {
      preset: 'Medium',
      resolution: '1080p',
      fps: '30–60 FPS',
      notes: 'Balanced performance'
    };
  }

  return {
    preset: 'High',
    resolution: '1080p / 1440p',
    fps: '60+ FPS',
    notes: 'Good for modern games'
  };
}

export function DeviceScanCard() {
  const [device, setDevice] = useState<Partial<DeviceProfile> | null>(null);
  const [editable, setEditable] = useState(initialEditable);
  const [saved, setSaved] = useState(false);
  const [gpuTier, setGpuTier] = useState<number | null>(null);

  useEffect(() => {
    const detectHardware = async () => {
      const baseDevice = buildDetectedDevice();

      let gpuName = '';
      let tier: number | null = null;

      try {
        const gpu = await getGPUTier();

        tier = gpu.tier;
        gpuName = gpu.gpu
          ? `${gpu.gpu} (${getGpuTierLabel(gpu.tier)})`
          : `Tier ${gpu.tier} GPU`;
      } catch (e) {
        gpuName = 'Unknown GPU';
      }

      // CPU detection
      let cpuName = 'Unknown CPU';
      const cores = navigator.hardwareConcurrency;

      if (cores) {
        cpuName = `${cores}-core CPU`;
      }

      // @ts-ignore
      if (navigator.userAgentData?.brands) {
        cpuName += ' (browser detected)';
      }

      setDevice(baseDevice);
      setGpuTier(tier);

      setEditable((prev) => ({
        ...prev,
        cpuName,
        gpuName,
        ramGb: baseDevice.detectedDeviceMemory || prev.ramGb
      }));
    };

    detectHardware();
  }, []);

  const merged = { ...device, ...editable };

  const saveLocally = () => {
    const payload: DeviceProfile = {
      id: crypto.randomUUID(),
      label: merged.label || 'My PC',
      osName: merged.osName || 'Unknown OS',
      browser: merged.browser || 'Unknown Browser',
      cpuName: merged.cpuName,
      gpuName: merged.gpuName,
      ramGb: merged.ramGb,
      storageGb: merged.storageGb,
      resolution: merged.resolution,
      logicalCores: merged.logicalCores,
      detectedDeviceMemory: merged.detectedDeviceMemory,
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
      isCurrent: true
    };

    const prev = JSON.parse(localStorage.getItem('gamewise-devices') || '[]');
    localStorage.setItem('gamewise-devices', JSON.stringify([payload, ...prev]));
    setSaved(true);
  };

  const tierLabel = getGpuTierLabel(gpuTier);
  const recommended = getRecommendedSettings(gpuTier);

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">Device Profile</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Scan current device and complete missing specs
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-soft">
            Browser-based detection can only read limited device information.
          </p>
        </div>

        {saved && (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            Saved locally
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* LEFT CARD */}
        <div className="rounded-2xl border border-line bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-white">
            <Monitor className="h-4 w-4 text-cyan" /> Detected info
          </div>

          <div className="space-y-2 text-sm text-soft">
            <p><span className="text-white">Label:</span> {device?.label}</p>
            <p><span className="text-white">OS:</span> {device?.osName}</p>
            <p><span className="text-white">Browser:</span> {device?.browser}</p>
            <p><span className="text-white">Logical cores:</span> {device?.logicalCores ?? 'N/A'}</p>
            <p><span className="text-white">Approx memory:</span> {device?.detectedDeviceMemory ? `${device.detectedDeviceMemory} GB` : 'N/A'}</p>
            <p><span className="text-white">Resolution:</span> {device?.resolution ?? 'N/A'}</p>

            {/* ✅ GPU Tier */}
            <div className="mt-3">
              <span className="text-white">GPU Tier: </span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  tierLabel === 'Low'
                    ? 'bg-red-500/20 text-red-300'
                    : tierLabel === 'Medium'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {tierLabel}
              </span>
            </div>

            {/* ✅ Recommended Settings */}
            <div className="mt-3 rounded-xl border border-line bg-bg p-3 text-xs">
              <p className="text-white font-semibold mb-1">Recommended Settings</p>
              <p>Preset: {recommended.preset}</p>
              <p>Resolution: {recommended.resolution}</p>
              <p>FPS: {recommended.fps}</p>
              <p className="opacity-70">{recommended.notes}</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-2xl border border-line bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-white">
            <Cpu className="h-4 w-4 text-cyan" /> Confirm hardware
          </div>

          <div className="grid gap-3 text-sm">
            <input
              value={editable.cpuName}
              onChange={(e) => setEditable((v) => ({ ...v, cpuName: e.target.value }))}
              placeholder="CPU (example: Ryzen 5 5600)"
              className="rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none"
            />

            <input
              value={editable.gpuName}
              onChange={(e) => setEditable((v) => ({ ...v, gpuName: e.target.value }))}
              placeholder="GPU (example: GTX 1660 Super)"
              className="rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <label className="rounded-2xl border border-line bg-bg px-4 py-3">
                <div className="mb-2 text-white">RAM (GB)</div>
                <input
                  type="number"
                  value={editable.ramGb}
                  onChange={(e) => setEditable((v) => ({ ...v, ramGb: Number(e.target.value) }))}
                  className="w-full bg-transparent outline-none"
                />
              </label>

              <label className="rounded-2xl border border-line bg-bg px-4 py-3">
                <div className="mb-2 text-white">Storage (GB)</div>
                <input
                  type="number"
                  value={editable.storageGb}
                  onChange={(e) => setEditable((v) => ({ ...v, storageGb: Number(e.target.value) }))}
                  className="w-full bg-transparent outline-none"
                />
              </label>
            </div>

            <button
              onClick={saveLocally}
              className="mt-2 rounded-2xl bg-gradient-to-r from-accent to-cyan px-4 py-3 font-semibold text-slate-950"
            >
              Save device profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}