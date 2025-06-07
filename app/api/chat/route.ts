// app/api/chat/route.ts
import OpenAI from 'openai'; // ✅ Note: no curly braces
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in .env.local
});

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(encoder.encode(content));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (err) {
    console.error("OpenAI Error:", err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
