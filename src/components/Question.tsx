import React, { useState } from 'react';
import { Question } from '../types';
import './question.css';

interface QuestionProps {
  question: Question;
  onAnswerSelect: (selected: string, isCorrect: boolean) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question: data, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const isIncorrect = data?.correct !== selectedAnswer;

  const handleAnswerClick = (choice: string) => {
    setSelectedAnswer(choice);
    setAnswered(true);

    if (choice === data?.correct) {
      // move next
      onAnswerSelect(choice, true);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleNextClick = () => {
    if (selectedAnswer !== null) {
      console.log(selectedAnswer, data.correct);
      onAnswerSelect(selectedAnswer, selectedAnswer === data.correct);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  return (
    <div className="container mt-4">
      <h5>{data.question}</h5>
      <div className="row">
        <div className="col">
          {Object.entries(data.choices).map(([choice, text]) => (
            <div key={choice} className="form-check mt-3">
              <input
                type="radio"
                className="form-check-input"
                name="answer"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={() => setSelectedAnswer(choice)}
                disabled={answered}
              />
              <label className="form-check-label">{choice}: {text}</label>
            </div>
          ))}
          {answered && isIncorrect && (
            <div className={`alert alert-danger mt-4`}>
              {data.quick_explanation ?? `Correct: ${data.correct}`}
            </div>
          )}
          {answered ? (
            <button className="btn btn-primary mt-3" onClick={handleNextClick}>
              Next
            </button>
          ) : (
            <button
              className="btn btn-primary mt-3"
              onClick={() => handleAnswerClick(selectedAnswer as string)}
              disabled={selectedAnswer === null}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
