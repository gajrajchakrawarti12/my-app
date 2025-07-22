import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // 🔐 Fallback if API key missing
    if (!apiKey) {
      const botReply = {
        type: 'bot',
        text: "🚫 API key not found. Please configure it in your .env.local file.",
      };
      setMessages((prev) => [...prev, botReply]);
      setInput('');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are Cyber Rakshak, a friendly and ethical cybersecurity assistant.' },
            { role: 'user', content: input }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const botText = response.data?.choices?.[0]?.message?.content || "⚠️ No response received.";
      const botReply = { type: 'bot', text: botText };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const botReply = {
        type: 'bot',
        text: "❌ Couldn't reach the AI engine. Please check your internet or OpenAI key.",
      };
      setMessages((prev) => [...prev, botReply]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-5">🛡️ Cyber Rakshak Chatbot</h2>

        <div className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4 border">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-3 rounded-xl max-w-[75%] whitespace-pre-wrap ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-yellow-100 text-black'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500 animate-pulse">Cyber Rakshak is typing...</div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 border border-blue-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me about scams, privacy, cybersecurity..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-r-md font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
