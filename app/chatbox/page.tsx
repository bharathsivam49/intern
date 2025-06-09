'use client';

import ChatBox from '@/components/ChatBox';

export default function ChatPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">💬 AI Chat</h1>
        <ChatBox />
      </div>
    </main>
  );
}
