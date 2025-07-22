import React from 'react';

const ResultAnalysis = ({ score }) => {
  const getFeedback = () => {
    if (score >= 7) return "Your usage may be affecting your mental health. Consider professional guidance.";
    if (score >= 4) return "You're showing signs of dependency. Try scheduled detox and monitoring.";
    return "You're within a healthy range. Great balance!";
  };

  return (
    <div className="result">
      <h2>Analysis</h2>
      <p>{getFeedback()}</p>
    </div>
  );
};

export default ResultAnalysis;
