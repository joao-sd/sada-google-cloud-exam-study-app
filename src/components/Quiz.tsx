import React, { useEffect, useState } from 'react';
import { Question as QuestionType } from '../types';
import Question from './Question';

interface QuizProps {
  questionsData: QuestionType[];
  selectedTopic: string;
}

const Quiz: React.FC<QuizProps> = ({ questionsData, selectedTopic }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Filter questions based on the selected topic
  const filteredQuestions = selectedTopic === 'All' ? questionsData : questionsData.filter(q => q.topic === selectedTopic);

  const handleAnswerClick = (selected: string, isCorrect: boolean) => {
    console.log(selected, isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => {
    // Reset the score and current question index when the selected topic changes
    setScore(0);
    setCurrentQuestionIndex(0);
  }, [selectedTopic]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Quiz Summary</h2>
      <p className="text-center">
        Score: {score} / {filteredQuestions.length}
      </p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Question
            question={filteredQuestions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
