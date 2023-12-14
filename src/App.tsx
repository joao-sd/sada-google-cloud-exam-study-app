import shuffle from 'lodash/shuffle';
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import questionsData from './data/questions-database.json';
import { QuestionsData } from './types';

// Custom hook for generating unique values array
const useUniqueValues = (data: QuestionsData, key: 'exam' | 'topic', filterKey?: string, filterValue?: string) => {
  return React.useMemo(() => {
    const uniqueValues = Array.from(new Set(
      data.filter(item => !filterValue || item[filterKey as keyof typeof item] === filterValue)
          .map(item => item[key])
    ));
    return ['All', ...uniqueValues];
  }, [data, key, filterKey, filterValue]);
};

const App: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const exams = useUniqueValues(questionsData, 'exam');
  const topics = useUniqueValues(questionsData, 'topic', 'exam', selectedExam === 'All' ? undefined : selectedExam);

  const onGetQuestionsData = (): QuestionsData => {
    return shuffle(questionsData.filter(q => 
      (selectedExam === 'All' || q.exam === selectedExam) &&
      (selectedTopic === 'All' || q.topic === selectedTopic)
    ));
  };

  const shouldShowTopicDropdown = selectedExam.startsWith('Associate') || selectedExam.startsWith('Professional');

  return (
    <div className="container">
      <h1 className="mt-4">Google Cloud Quiz App</h1>
      <div className="alert alert-info mt-4" role="alert">
        <ul>
          <li>
            <strong>Individual topics: </strong> Use them to practice for a specific topic.
          </li>
          <li>
            <strong>All topics: </strong> AI generated questions (Individual topics shuffled with Exam simulation ones)
          </li>
          <li>
            <strong>Exam Simulation (important): </strong> These are the ones that most match the real exam. REQUIRED if you want to pass!
          </li>
        </ul>
      </div>
      <label htmlFor="exam-select" className="mt-4">Select Exam:</label>
      <select id="exam-select" className="form-control" onChange={(e) => {
        setSelectedExam(e.target.value);
        setSelectedTopic('All');
      }}>
        {exams.map((exam, index) => <option key={index} value={exam}>{exam}</option>)}
      </select>

      {shouldShowTopicDropdown && (
        <>
          <label htmlFor="topic-select" className="mt-4">Select Topic:</label>
          <select id="topic-select" className="form-control" onChange={(e) => setSelectedTopic(e.target.value)}>
            {topics.map((topic, index) => <option key={index} value={topic}>{topic}</option>)}
          </select>
        </>
      )}

      <Quiz questionsData={onGetQuestionsData()} selectedTopic={selectedTopic} />
    </div>
  );
}

export default App;