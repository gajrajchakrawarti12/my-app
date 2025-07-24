import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
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
      setChatHistory((prev) => [...prev, { type: "answer", content: "🚫 API key missing!" }]);
      return;
    }

    const currentQuestion = question;
    setQuestion("");
    setGeneratingAnswer(true);
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: currentQuestion }] }] }
      );
      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "🤖 No response from model.";
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || "Something went wrong!";
      setChatHistory((prev) => [...prev, { type: "answer", content: `❌ ${errorMessage}` }]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="chatbot-app">
        <aside className="sidebar">
          <div className="logo">Learn With AI</div>
          <button className="nav-button active">Chats</button>
          <div className="sidebar-bottom">
            <button className="nav-button">Settings</button>
            <button className="nav-button">Log Out</button>
            <div className="user-box">
              <div className="user-name">Ayush Gupta</div>
              <div className="user-email">ayushgpt@gmail.com</div>
            </div>
          </div>
        </aside>

        <main className="chatbot-main">
          <header className="chatbot-header">
            <h1>Hi, I’m Chat Bot</h1>
            <p>Tell me your goal, and get complete Learning Plans.</p>
          </header>

          <section className="feature-cards">
            <div className="card orange">Guided Learning</div>
            <div className="card yellow">Links To Course</div>
            <div className="card cyan">Save Courses</div>
            <div className="card pink">Chat Wit AI</div>
            <div className="card green">Learning Plans</div>
            <div className="card purple">Download PDFs</div>
          </section>

          <div ref={chatContainerRef} className="chat-container">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat-bubble ${chat.type === "question" ? "question" : "answer"}`}
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            ))}
            {generatingAnswer && <div className="chat-bubble answer">Thinking...</div>}
          </div>

          <form onSubmit={generateAnswer} className="chat-form">
            <input
              type="text"
              className="chat-input"
              placeholder="Enter your goal/prompts here.........."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="submit" className="chat-send" disabled={generatingAnswer}>
              ➤
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Chatbot;