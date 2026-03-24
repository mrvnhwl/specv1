'use client';

import { useEffect, useState } from 'react';
import { DeviceScanCard } from '@/components/device-scan-card';
import { DeviceProfile } from '@/lib/types';

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceProfile[]>([]);

  useEffect(() => {
    setDevices(JSON.parse(localStorage.getItem('gamewise-devices') || '[]'));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <DeviceScanCard />

      <section className="mt-8 rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan">Saved Devices</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Multiple PCs per user</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {devices.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white/5 p-6 text-soft">No saved devices yet. Scan and save one above.</div>
          ) : devices.map((device) => (
            <article key={device.id} className="rounded-3xl border border-line bg-white/5 p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{device.label}</h3>
                {device.isCurrent && <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-cyan">Current</span>}
              </div>
              <div className="mt-4 space-y-2 text-sm text-soft">
                <p><span className="text-white">OS:</span> {device.osName}</p>
                <p><span className="text-white">CPU:</span> {device.cpuName || 'Not set'}</p>
                <p><span className="text-white">GPU:</span> {device.gpuName || 'Not set'}</p>
                <p><span className="text-white">RAM:</span> {device.ramGb ? `${device.ramGb} GB` : 'Not set'}</p>
                <p><span className="text-white">Saved:</span> {new Date(device.createdAt).toLocaleDateString()}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
