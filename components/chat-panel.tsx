'use client';

import { useState, useEffect, useRef } from 'react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type DeviceProfile = Record<string, any>;
type PreferenceAnswers = Record<string, any>;

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Ask about upgrades, compatibility, or what games your PC can run.'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [device, setDevice] = useState<DeviceProfile | undefined>();
  const [preferences, setPreferences] = useState<PreferenceAnswers | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // LOAD DEVICE + PREFS
  useEffect(() => {
    const savedDevices = JSON.parse(localStorage.getItem('gamewise-devices') || '[]');
    const savedPreferences = JSON.parse(localStorage.getItem('gamewise-preferences') || 'null');

    setDevice(savedDevices[0]);
    setPreferences(savedPreferences);
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          device: device ?? {},
          preferences: preferences ?? {}
        })
      });

      if (!res.ok) throw new Error('API failed');

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply || 'No response from AI.'
        }
      ]);

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '⚠️ Error connecting to AI.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  // ✅ FORMATTER FUNCTION (MAIN UPGRADE)
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();

      // Empty line spacing
      if (!trimmed) {
        return <div key={i} className="h-2" />;
      }

      // Numbered section (1. 2. 3.)
      if (/^\d+\./.test(trimmed)) {
        return (
          <p key={i} className="mt-3 font-semibold text-white">
            {trimmed}
          </p>
        );
      }

      // Bullet points
      if (trimmed.startsWith('-')) {
        return (
          <li key={i} className="ml-5 list-disc text-soft">
            {trimmed.replace('-', '').trim()}
          </li>
        );
      }

      // First line (intro)
      if (i === 0) {
        return (
          <p key={i} className="mb-2 font-medium text-white">
            {trimmed}
          </p>
        );
      }

      // Normal text
      return (
        <p key={i} className="text-soft leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow flex flex-col h-[70vh]">

      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">AI Assistant</p>
        <h2 className="text-2xl font-semibold text-white">
          Chat about upgrades and game compatibility
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 rounded-3xl border border-line bg-bg/70 p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              m.role === 'assistant'
                ? 'border border-line bg-white/5 text-soft'
                : 'ml-auto bg-gradient-to-r from-accent to-cyan text-slate-950'
            }`}
          >
            {m.role === 'assistant'
              ? formatMessage(m.content)
              : m.content}
          </div>
        ))}

        {loading && <p className="text-soft text-sm">Thinking...</p>}

        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about upgrades or game compatibility"
          className="flex-1 rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none"
        />

        <button
          onClick={send}
          disabled={loading}
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </section>
  );
}