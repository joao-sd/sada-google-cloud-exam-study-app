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

  const hasQuestion = filteredQuestions.length > 0 && currentQuestionIndex < filteredQuestions.length;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Quiz Summary</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Score</h5>
              <p className="card-text display-4">
                {score} / {filteredQuestions.length}
              </p>
              <span className={`h6 ${((score / filteredQuestions.length) * 100) >= 75 ? 'text-success' : 'text-danger'}`}>
                ({((score / filteredQuestions.length) * 100).toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          {hasQuestion ? (
            <Question
              question={filteredQuestions[currentQuestionIndex]}
              onAnswerSelect={handleAnswerClick}
            />
          ) : (
            <div className="alert alert-success" role="alert">
              Finished!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
