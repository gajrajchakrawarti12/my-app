import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import ResultAnalysis from './ResultAnalysis';
import SuggestionModal from './SuggestionModal';


import { useParams } from 'react-router-dom';
import {  useEffect } from 'react';

import '../../styles/Quiz.css'; // Styling


const QuizContainer = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Dynamically load quiz based on ID
    import(`../../data/${quizId}.json`)
      .then((module) => setQuizData(module.default))
      .catch(() => console.error("Quiz not found"));
  }, [quizId]);

  const handleAnswer = (value) => {
    setScore(prev => prev + value);
    if (step === quizData.length - 1) {
      setShowResult(true);
    } else {
      setStep(prev => prev + 1);
    }
  };

  if (!quizData.length) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-wrapper">
      {!showResult ? (
        <QuestionCard data={quizData[step]} onAnswer={handleAnswer} />
      ) : (
        <>
          <ResultAnalysis score={score} />
          <SuggestionModal score={score} />
        </>
      )}
    </div>
  );
};

export default QuizContainer;