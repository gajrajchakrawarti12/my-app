import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSelector.css'; // optional CSS styling

const quizzes = [
  { id: 'smartphone-addiction', name: '📱 Smartphone Addiction' },
  { id: 'masturbation-check', name: '🧠 Habit Reflection' },
  { id: 'cyber-awareness', name: '🔐 Cybersecurity Knowledge' }
];

const QuizSelector = () => {
  const navigate = useNavigate();

  const handleQuizSelect = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="quiz-selector-wrapper">
      <h1 className="title">🧩 Select a Quiz</h1>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            className="quiz-btn"
            onClick={() => handleQuizSelect(quiz.id)}
          >
            {quiz.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizSelector;
