
import React from 'react';
import { Question } from '../types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  if (questions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No questions to display for this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionCard key={`${question.Text}-${index}`} question={question} index={index} />
      ))}
    </div>
  );
};

export default QuestionList;
