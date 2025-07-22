// ChatWindow.jsx
import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() === '') return;
    const newMessage = { user: true, text: input };
    setMessages([...messages, newMessage]);

    // You can hook this into an NLP model, backend API, or AI integration
    const response = { user: false, text: `I received: ${input}` };
    setMessages((msgs) => [...msgs, response]);
    setInput('');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Cyber ChatBot</span>
        <button onClick={closeChat}>✖</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.user ? 'user-msg' : 'bot-msg'}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
