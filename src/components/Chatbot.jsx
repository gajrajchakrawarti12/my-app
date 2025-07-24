import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./ChatWindow.css"; // Make sure this matches your actual CSS file

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const apiKey = "AIzaSyBFHeenbDoWcOsZ5J-rVriNwi--kSSFWOY";
    if (!apiKey) {
      setAnswer("🚫 API key missing! Please set REACT_APP_API_GENERATIVE_LANGUAGE_CLIENT in your .env file.");
      return;
    }

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: currentQuestion }] }]
        }
      );
      const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 No response from model.";
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.error("Request failed:", error);
      const errorMessage = error.response?.data?.error?.message || "Something went wrong!";
      setAnswer(`❌ ${errorMessage}`);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
        {/* Header */}
        <header className="chatbot-header">
          <h1 className="chatbot-title">Cyber Rakshak Chatbot</h1>
        </header>

        {/* Chat history */}
        <div ref={chatContainerRef} className="chat-container hide-scrollbar">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-blue-50 rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome to Cyber Rakshak Chatbot 👋</h2>
                <p className="text-gray-600 mb-4">Ask anything about safety, tech, or Cyber Rakshak's tools!</p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'question' ? 'text-right' : 'text-left'}`}>
                  <div className={`chat-bubble ${chat.type}`}>
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {generatingAnswer && (
                <div className="text-left">
                  <div className="chat-bubble answer animate-pulse">Thinking...</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <form onSubmit={generateAnswer} className="chat-form">
          <div className="flex gap-2">
            <textarea
              required
              className="chat-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className="chat-button"
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;