'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, DeviceProfile, PreferenceAnswers } from '@/lib/types';

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

  // 🔥 LOAD DEVICE ONCE
  useEffect(() => {
    const savedDevices = JSON.parse(localStorage.getItem('gamewise-devices') || '[]') as DeviceProfile[];
    const savedPreferences = JSON.parse(localStorage.getItem('gamewise-preferences') || 'null');

    setDevice(savedDevices[0]);
    setPreferences(savedPreferences);
  }, []);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // =========================
  // SEND MESSAGE
  // =========================
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
      const res = await fetch('/dashboard/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: userMessage.content,
            device: device ?? {},
            preferences: preferences ?? {}
          })
        })
      });

      if (!res.ok) throw new Error('API failed');

      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply || 'No response from AI.'
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '⚠️ Something went wrong. Please try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ENTER KEY SUPPORT
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow flex flex-col h-[70vh]">

      {/* HEADER */}
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">AI Assistant</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Chat about upgrades and game compatibility
        </h2>
      </div>

      {/* CHAT */}
      <div className="flex-1 space-y-3 overflow-y-auto rounded-3xl border border-line bg-bg/70 p-4">

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              message.role === 'assistant'
                ? 'border border-line bg-white/5 text-soft'
                : 'ml-auto bg-gradient-to-r from-accent to-cyan text-slate-950'
            }`}
          >
            {message.content}
          </div>
        ))}

        {loading && (
          <p className="text-soft text-sm">Thinking...</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about upgrades or game compatibility"
          className="flex-1 rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />

        <button
          onClick={send}
          disabled={loading}
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>

    </section>
  );
}