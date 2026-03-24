'use client';

import { useState } from 'react';
import { answerUpgradeQuestion } from '@/lib/mock-chat';
import { ChatMessage, DeviceProfile } from '@/lib/types';

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Ask about upgrades, compatibility, or what kind of games fit your saved device.'
    }
  ]);
  const [input, setInput] = useState('What should I upgrade first?');

  const currentDevice = typeof window !== 'undefined'
    ? (JSON.parse(localStorage.getItem('gamewise-devices') || '[]') as DeviceProfile[])[0]
    : undefined;

  const send = () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input };
    const answer: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: answerUpgradeQuestion(input, currentDevice)
    };
    setMessages((prev) => [...prev, userMessage, answer]);
    setInput('');
  };

  return (
    <section className="rounded-3xl border border-line bg-panel/90 p-6 shadow-glow">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">Upgrade Assistant</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Chat with the system about upgrades and compatibility</h2>
      </div>

      <div className="space-y-3 rounded-3xl border border-line bg-bg/70 p-4">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'border border-line bg-white/5 text-soft' : 'ml-auto bg-gradient-to-r from-accent to-cyan text-slate-950'}`}>
            {message.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about upgrades or game compatibility" className="flex-1 rounded-2xl border border-line bg-bg px-4 py-3 text-white outline-none placeholder:text-slate-500" />
        <button onClick={send} className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950">
          Send
        </button>
      </div>
    </section>
  );
}
