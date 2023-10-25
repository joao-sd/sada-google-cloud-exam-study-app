import { slice } from 'lodash';
import shuffle from 'lodash/shuffle';
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import { TOTAL_EXAM_QUESTIONS } from './constants/ExamConstants';
import questionsData from './data/questions-database.json';
import { QuestionsData } from './types';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const topics = Array.from(new Set((questionsData as QuestionsData).map(q => q.topic)));
  topics.unshift('All');


  const onGetQuestionsData = (): QuestionsData => {
    if (selectedTopic === 'All') {
      return slice(shuffle(questionsData), 0, TOTAL_EXAM_QUESTIONS) as unknown as QuestionsData;
    }

    return shuffle(questionsData) as unknown as QuestionsData;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-4">Quiz App</h1>
          <label className="mt-4">Select Topic:</label>
          <select className="form-control" onChange={(e) => setSelectedTopic(e.target.value)}>
            {topics.map((topic, index) => (
              <option key={index} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Quiz questionsData={onGetQuestionsData()} selectedTopic={selectedTopic} />
        </div>
      </div>
    </div>
  );
}

export default App;
