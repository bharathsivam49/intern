import React, { useState, useEffect, useRef } from 'react';

// Define the Message interface for type safety
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBox: React.FC = () => {
  // State to hold all messages in the chat
  const [messages, setMessages] = useState<Message[]>([]);
  // State to hold the current user input
  const [input, setInput] = useState<string>('');
  // State to indicate if a response is currently being loaded
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Ref for the chat messages container to enable auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom of the chat when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Handles sending a message to the API route.
   * This function is asynchronous as it involves a fetch request and reading a stream.
   */
  const handleSendMessage = async () => {
    // Prevent sending empty messages or multiple messages while loading
    if (!input.trim() || isLoading) {
      return;
    }

    // Add the user's message to the chat history
    const newUserMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput(''); // Clear the input field

    setIsLoading(true); // Set loading state to true

    // Add a placeholder for the assistant's response to be streamed into
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'assistant', content: '' },
    ]);

    try {
      // Make a POST request to the /api/chat route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the current message and the full message history (for context)
        body: JSON.stringify({ messages: [...messages, newUserMessage] }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Ensure the response body is a readable stream
      if (!response.body) {
        throw new Error('Response body is null, cannot stream.');
      }

      // Get a reader for the response stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder(); // Decoder to convert Uint8Array to string
      let done = false;

      // Loop to read chunks from the stream until it's done
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        // Decode the chunk and append it to the last message (assistant's message)
        const chunk = decoder.decode(value, { stream: true });

        // Update the state by appending the new chunk to the assistant's message
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessageIndex = updatedMessages.length - 1;
          if (lastMessageIndex >= 0 && updatedMessages[lastMessageIndex].role === 'assistant') {
            updatedMessages[lastMessageIndex].content += chunk;
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      // Display an error message to the user if something goes wrong
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Oops! Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Helper function to handle 'Enter' key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Allow shift+enter for new line if needed
      e.preventDefault(); // Prevent default new line behavior
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">
        AI Chat Assistant
      </h1>
      <div className="chat-box">
        {/* Chat Messages Display Area */}
        <div className="messages-display-area custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${
                msg.role === 'user' ? 'user-message-row' : 'assistant-message-row'
              }`}
            >
              <div
                className={`message-bubble ${
                  msg.role === 'user'
                    ? 'user-message-bubble'
                    : 'assistant-message-bubble'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* Ref for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input and Send Area */}
        <div className="input-send-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? 'Generating response...' : 'Type your message...'}
            disabled={isLoading}
            className="chat-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="send-button"
          >
            {isLoading ? (
              <svg
                className="spinner"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="path"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="fill"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles for better appearance */}
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #f3f4f6; /* Equivalent to bg-gray-100 */
          font-family: 'Inter', sans-serif; /* Assumed font */
          -webkit-font-smoothing: antialiased; /* Equivalent to antialiased */
          padding: 16px; /* Equivalent to p-4 */
        }

        .chat-title {
          font-size: 30px; /* Equivalent to text-3xl */
          font-weight: 700; /* Equivalent to font-bold */
          text-align: center; /* Equivalent to text-center */
          color: #1f2937; /* Equivalent to text-gray-800 */
          margin-bottom: 24px; /* Equivalent to mb-6 */
          margin-top: 16px; /* Equivalent to mt-4 */
        }

        .chat-box {
          display: flex;
          flex-direction: column;
          flex-grow: 1; /* Equivalent to flex-grow */
          background-color: #ffffff; /* Equivalent to bg-white */
          border-radius: 12px; /* Equivalent to rounded-xl */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Equivalent to shadow-lg */
          padding: 24px; /* Equivalent to p-6 */
          overflow: hidden;
        }

        .messages-display-area {
          flex-grow: 1; /* Equivalent to flex-grow */
          overflow-y: auto; /* Equivalent to overflow-y-auto */
          padding-right: 16px; /* Equivalent to pr-4 */
        }

        .message-row {
          display: flex;
          margin-bottom: 16px; /* Equivalent to mb-4 */
        }

        .user-message-row {
          justify-content: flex-end; /* Equivalent to justify-end */
        }

        .assistant-message-row {
          justify-content: flex-start; /* Equivalent to justify-start */
        }

        .message-bubble {
          max-width: 70%; /* Equivalent to max-w-[70%] */
          padding: 12px; /* Equivalent to p-3 */
          border-radius: 8px; /* Equivalent to rounded-lg */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to shadow-md */
        }

        .user-message-bubble {
          background-color: #3b82f6; /* Equivalent to bg-blue-500 */
          color: #ffffff; /* Equivalent to text-white */
          border-bottom-right-radius: 0; /* Equivalent to rounded-br-none */
        }

        .assistant-message-bubble {
          background-color: #e5e7eb; /* Equivalent to bg-gray-200 */
          color: #1f2937; /* Equivalent to text-gray-800 */
          border-bottom-left-radius: 0; /* Equivalent to rounded-bl-none */
        }

        .input-send-area {
          display: flex;
          margin-top: 24px; /* Equivalent to mt-6 */
          gap: 12px; /* Equivalent to gap-3 */
        }

        .chat-input {
          flex-grow: 1; /* Equivalent to flex-grow */
          padding: 12px; /* Equivalent to p-3 */
          border: 1px solid #d1d5db; /* Equivalent to border border-gray-300 */
          border-radius: 8px; /* Equivalent to rounded-lg */
          outline: none; /* Equivalent to focus:outline-none */
          color: #1f2937; /* Equivalent to text-gray-800 */
          transition: all 0.2s ease-in-out; /* Equivalent to transition duration-200 */
        }
        .chat-input:focus {
          border-color: #3b82f6; /* Equivalent to focus:ring-blue-500 */
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Equivalent to focus:ring-2 focus:ring-blue-500 */
        }
        .chat-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .send-button {
          padding: 12px 24px; /* Equivalent to px-6 py-3 */
          background-color: #2563eb; /* Equivalent to bg-blue-600 */
          color: #ffffff; /* Equivalent to text-white */
          border-radius: 8px; /* Equivalent to rounded-lg */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Equivalent to shadow-md */
          transition: all 0.2s ease-in-out; /* Equivalent to transition duration-200 */
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .send-button:hover {
          background-color: #1d4ed8; /* Equivalent to hover:bg-blue-700 */
        }
        .send-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.5); /* Equivalent to focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 */
        }
        .send-button:disabled {
          opacity: 0.5; /* Equivalent to disabled:opacity-50 */
          cursor: not-allowed; /* Equivalent to disabled:cursor-not-allowed */
        }

        .spinner {
          animation: spin 1s linear infinite; /* Equivalent to animate-spin */
          height: 20px; /* Equivalent to h-5 */
          width: 20px; /* Equivalent to w-5 */
          color: #ffffff; /* Equivalent to text-white */
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Custom Scrollbar Styles (retained) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;
