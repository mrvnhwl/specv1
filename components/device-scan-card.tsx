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
    return { preset: 'Low', resolution: '720p', fps: '30 FPS', notes: 'Best for lightweight games only' };
  }

  if (tier === 2) {
    return { preset: 'Medium', resolution: '1080p', fps: '30–60 FPS', notes: 'Balanced performance' };
  }

  return { preset: 'High', resolution: '1080p / 1440p', fps: '60+ FPS', notes: 'Good for modern games' };
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
      } catch {
        gpuName = 'Unknown GPU';
      }

      let cpuName = 'Unknown CPU';
      const cores = navigator.hardwareConcurrency;

      if (cores) {
        cpuName = `${cores}-core CPU`;
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
        </div>

        {saved && (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            Saved locally
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {/* 🔥 IMPROVED DETECTED INFO */}
        <div className="rounded-2xl border border-line bg-white/5 p-4 space-y-3">

          <div className="flex items-center gap-2 text-white font-semibold">
            <Monitor className="h-4 w-4 text-cyan" /> Detected Info
          </div>

          <div className="space-y-2 text-sm text-soft">

            <div className="flex justify-between">
              <span>OS</span>
              <span className="text-white">{device?.osName}</span>
            </div>

            <div className="flex justify-between">
              <span>Browser</span>
              <span className="text-white">{device?.browser}</span>
            </div>

            <div className="flex justify-between">
              <span>CPU</span>
              <span className="text-white">{editable.cpuName}</span>
            </div>

            <div className="flex justify-between">
              <span>GPU</span>
              <span className="text-white">{editable.gpuName}</span>
            </div>

            <div className="flex justify-between">
              <span>RAM</span>
              <span className="text-white">{editable.ramGb} GB</span>
            </div>

            <div className="flex justify-between">
              <span>GPU Tier</span>
              <span className="text-cyan">{tierLabel}</span>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-line bg-bg p-4">
            <p className="text-white font-semibold mb-3 text-sm">
              Recommended Settings
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">

              {/* PRESET */}
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-soft mb-1">Preset</p>
                <p className="text-sm font-semibold text-cyan">
                  {recommended.preset}
                </p>
              </div>

              {/* RESOLUTION */}
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-soft mb-1">Resolution</p>
                <p className="text-sm font-semibold text-white">
                  {recommended.resolution}
                </p>
              </div>

              {/* FPS */}
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-soft mb-1">FPS</p>
                <p className="text-sm font-semibold text-emerald-400">
                  {recommended.fps}
                </p>
              </div>

            </div>

            {/* OPTIONAL NOTE */}
            {recommended.notes && (
              <p className="mt-3 text-xs text-soft text-center">
                {recommended.notes}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-2xl border border-line bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-white">
            <Cpu className="h-4 w-4 text-cyan" /> Hardware
          </div>

          <div className="grid gap-3 text-sm">

            {/* CPU */}
            <div className="rounded-2xl border border-line bg-bg px-4 py-3">
              <p className="text-white mb-1">CPU</p>
              <p className="text-soft">{editable.cpuName}</p>
              <p className="text-xs opacity-60">Auto-detected</p>
            </div>

            {/* GPU */}
            <div className="rounded-2xl border border-line bg-bg px-4 py-3">
              <p className="text-white mb-1">GPU</p>
              <p className="text-soft">{editable.gpuName}</p>
              <p className="text-xs opacity-60">Auto-detected</p>
            </div>

            {/* 🔒 RAM (NOW READ ONLY) */}
            <div className="rounded-2xl border border-line bg-bg px-4 py-3">
              <p className="text-white mb-1">RAM</p>
              <p className="text-soft">{editable.ramGb} GB</p>
              <p className="text-xs opacity-60">Auto-detected</p>
            </div>

            {/* STORAGE (still editable) */}
            <label className="rounded-2xl border border-line bg-bg px-4 py-3">
              <div className="mb-2 text-white">Storage (GB)</div>
              <input
                type="number"
                value={editable.storageGb}
                onChange={(e) => setEditable((v) => ({ ...v, storageGb: Number(e.target.value) }))}
                className="w-full bg-transparent outline-none"
              />
            </label>

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