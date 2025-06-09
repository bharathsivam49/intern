// File Path: your-nextjs-app/app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Define the Message interface, matching the one in ChatBox.tsx
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Handles POST requests to the /api/chat route.
 * This function processes user messages, interacts with the Gemini API,
 * and streams the AI's response back to the client.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the messages array
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array provided' }, { status: 400 });
    }

    // IMPORTANT: Load the API key from environment variables.
    // In Next.js, environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser.
    // However, for server-side API routes, you typically use variables *without* this prefix
    // for sensitive keys, which are only available on the server.
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('GEMINI_API_KEY environment variable is not set.');
        return NextResponse.json({ error: 'Server configuration error: Gemini API key is missing.' }, { status: 500 });
    }

    // Prepare the chat history for the Gemini API.
    // The Gemini API expects 'user' and 'model' roles.
    // We filter out any empty messages and map roles accordingly.
    const chatHistory = messages
      .filter((msg: Message) => msg.content.trim() !== '') // Filter out empty messages
      .map((msg: Message) => ({
        role: msg.role === 'user' ? 'user' : 'model', // Map 'assistant' to 'model' for Gemini
        parts: [{ text: msg.content }],
      }));

    // Construct the payload for the Gemini API call
    const payload = {
      contents: chatHistory,
      // You can add generationConfig for response schema, safety settings etc. here if needed
      // generationConfig: {
      //   responseMimeType: "application/json", // Example for structured response
      //   responseSchema: { ... }
      // }
    };

    // Define the Gemini API URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Make the fetch call to the Gemini API
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check for errors from the Gemini API
    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: `Gemini API returned an error: ${geminiResponse.statusText}`, details: errorData },
        { status: geminiResponse.status }
      );
    }

    // Read the response from Gemini and extract the text
    const result = await geminiResponse.json();

    let textStream: ReadableStream<Uint8Array>;
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const text = result.candidates[0].content.parts[0].text;
      // Convert the text response into a stream for the client
      textStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(text));
          controller.close();
        },
      });
    } else {
      console.warn('Gemini response structure unexpected or content missing:', result);
      textStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('Could not generate a response. Please try again.'));
          controller.close();
        },
      });
    }

    // Return the stream as the response to the client
    return new NextResponse(textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8', // Or 'text/event-stream' if using server-sent events
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
