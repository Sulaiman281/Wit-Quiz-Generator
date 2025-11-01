import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
}

const getCategoryColorClasses = (category: string): string => {
  switch (category.toLowerCase().replace(/\s+/g, '')) {
    case 'science':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700';
    case 'technology':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-700';
    case 'history':
    case 'islamichistory':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-200 dark:border-amber-700';
    case 'sports':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
  }
};

const CheckmarkIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
)

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const allOptions = [...question.Options, question.CorrectAnswer].sort(() => Math.random() - 0.5); // Randomize for display
  const categoryColor = getCategoryColorClasses(question.Category);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">Question {index + 1}</p>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${categoryColor}`}>
            {question.Category}
          </span>
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">{question.Text}</h3>
        
        <div className="space-y-3">
          {allOptions.map((option, i) => {
            const isCorrect = option === question.CorrectAnswer;
            return (
                <div
                key={i}
                className={`flex items-center p-3 rounded-md text-sm transition-colors ${
                    isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-900/30'
                    : 'bg-slate-100 dark:bg-slate-700/50'
                }`}
                >
                {isCorrect && <CheckmarkIcon className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />}
                <span className={`font-medium ${
                    isCorrect
                    ? 'text-emerald-800 dark:text-emerald-200'
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                    {option}
                </span>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;