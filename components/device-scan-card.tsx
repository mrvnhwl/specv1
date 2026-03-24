'use client';

import { useEffect, useState } from 'react';
import { buildDetectedDevice } from '@/lib/device';
import { DeviceProfile } from '@/lib/types';
import { Cpu, HardDrive, MemoryStick, Monitor } from 'lucide-react';

const initialEditable = {
  cpuName: '',
  gpuName: '',
  ramGb: 8,
  storageGb: 256
};

export function DeviceScanCard() {
  const [device, setDevice] = useState<Partial<DeviceProfile> | null>(null);
  const [editable, setEditable] = useState(initialEditable);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDevice(buildDetectedDevice());
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

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">Device Profile</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Scan current device and complete missing specs</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-soft">
            Browser-based detection can only read limited device information. Use the fields below to confirm your CPU, GPU, RAM, and storage before saving.
          </p>
        </div>
        {saved && <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">Saved locally</span>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-white"><Monitor className="h-4 w-4 text-cyan" /> Detected info</div>
          <div className="space-y-2 text-sm text-soft">
            <p><span className="text-white">Label:</span> {device?.label}</p>
            <p><span className="text-white">OS:</span> {device?.osName}</p>
            <p><span className="text-white">Browser:</span> {device?.browser}</p>
            <p><span className="text-white">Logical cores:</span> {device?.logicalCores ?? 'N/A'}</p>
            <p><span className="text-white">Approx memory:</span> {device?.detectedDeviceMemory ? `${device.detectedDeviceMemory} GB` : 'N/A'}</p>
            <p><span className="text-white">Resolution:</span> {device?.resolution ?? 'N/A'}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-white"><Cpu className="h-4 w-4 text-cyan" /> Confirm hardware</div>
          <div className="grid gap-3 text-sm">
            <input value={editable.cpuName} onChange={(e) => setEditable((v) => ({ ...v, cpuName: e.target.value }))} placeholder="CPU (example: Ryzen 5 5600)" className="rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none placeholder:text-slate-500" />
            <input value={editable.gpuName} onChange={(e) => setEditable((v) => ({ ...v, gpuName: e.target.value }))} placeholder="GPU (example: GTX 1660 Super)" className="rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none placeholder:text-slate-500" />
            <div className="grid grid-cols-2 gap-3">
              <label className="rounded-2xl border border-line bg-bg px-4 py-3 text-soft">
                <div className="mb-2 flex items-center gap-2 text-white"><MemoryStick className="h-4 w-4 text-cyan" /> RAM (GB)</div>
                <input type="number" min={4} value={editable.ramGb} onChange={(e) => setEditable((v) => ({ ...v, ramGb: Number(e.target.value) }))} className="w-full bg-transparent outline-none" />
              </label>
              <label className="rounded-2xl border border-line bg-bg px-4 py-3 text-soft">
                <div className="mb-2 flex items-center gap-2 text-white"><HardDrive className="h-4 w-4 text-cyan" /> Storage (GB)</div>
                <input type="number" min={64} value={editable.storageGb} onChange={(e) => setEditable((v) => ({ ...v, storageGb: Number(e.target.value) }))} className="w-full bg-transparent outline-none" />
              </label>
            </div>
            <button onClick={saveLocally} className="mt-2 rounded-2xl bg-gradient-to-r from-accent to-cyan px-4 py-3 font-semibold text-slate-950">
              Save device profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
