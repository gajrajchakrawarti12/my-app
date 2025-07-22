import React from 'react';

const QuestionCard = ({ data, onAnswer }) => {
  return (
    <div>
      <h2 className="question">{data.question}</h2>
      <div className="options">
        {data.options.map((opt, index) => (
          <button key={index} onClick={() => onAnswer(opt.value)}>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
