'use client';

import { useState } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `🧑: ${input}`]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let aiReply = '🤖: ';

    if (reader) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        aiReply += decoder.decode(value);
        setMessages((prev) => [...prev.slice(0, -1), aiReply]);
      }
    }

    setMessages((prev) => [...prev, aiReply]);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>AI Chat</h2>
      <div style={{ minHeight: 200, border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: 8, marginTop: 10 }}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
}
