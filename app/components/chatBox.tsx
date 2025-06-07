'use client';
import { useState } from 'react';
import { ChatMessage } from '@/types/message'; // Make sure the path is correct

export default function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const body: ChatMessage = { message: input };

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let response = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        response += decoder.decode(value);
        setMessages((prev) => [...prev.slice(0, -1), response]);
      }
    }

    setInput('');
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className="p-4">
      <div className="space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded">
            {msg}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full rounded mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
