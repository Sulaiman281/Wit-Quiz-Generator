import React, { useState } from 'react';
import { Question } from './types';
import { generateQuizQuestions } from './services/geminiService';
import Header from './components/Header';
import QuestionList from './components/QuestionList';
import LoadingIndicator from './components/LoadingIndicator';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic to generate questions.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCopied(false);

    try {
      const generatedQuestions = await generateQuizQuestions(topic, questionCount);
      setQuestions(generatedQuestions);
    } catch (e: unknown) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (questions.length === 0) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(questions, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${topic.replace(/\s+/g, '_').toLowerCase()}_quiz.json`;
    link.click();
  };
  
  const handleCopy = () => {
    if (questions.length === 0) return;
    navigator.clipboard.writeText(JSON.stringify(questions, null, 2))
      .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => console.error('Failed to copy: ', err));
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white dark:bg-slate-800/50 shadow-2xl rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Create Your Quiz in Seconds
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Provide any topic and let our AI craft a unique, high-quality quiz tailored to your educational needs.
            </p>
          </div>
          
          <form onSubmit={handleGenerate} className="max-w-2xl mx-auto mb-8">
            <div className="mb-4">
                <label htmlFor="topic-input" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Topic or Text</label>
                <textarea 
                    id="topic-input"
                    rows={4}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                    className="block p-3 w-full text-sm text-slate-900 bg-slate-100 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 disabled:opacity-50 transition-colors" 
                    placeholder="e.g., The Solar System, The life of Prophet Muhammad (PBUH), Basics of Photosynthesis..."
                    required
                />
            </div>
             <div className="mb-6">
                <label htmlFor="question-count" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Number of Questions (5-20)</label>
                <input
                    type="number"
                    id="question-count"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    min="5"
                    max="20"
                    disabled={isLoading}
                    className="bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 disabled:opacity-50 transition-colors"
                    required
                />
            </div>
             <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {isLoading ? 'Generating...' : 'Generate Quiz'}
            </button>
          </form>

          {isLoading && (
            <LoadingIndicator 
              message="The AI is crafting your questions..."
            />
          )}

          {error && (
            <div className="mt-6 p-4 text-center text-red-800 bg-red-100 dark:bg-red-900/50 dark:text-red-200 rounded-lg border border-red-300 dark:border-red-700">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}

          {questions.length > 0 && !isLoading && (
            <div className="mt-10 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                     <button
                        onClick={handleCopy}
                        className="w-full sm:w-auto px-6 py-2.5 font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg shadow-md hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all duration-300 ease-in-out"
                    >
                        {copied ? 'Copied!' : 'Copy JSON'}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="w-full sm:w-auto px-6 py-2.5 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 ease-in-out"
                    >
                        Download JSON
                    </button>
                </div>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Successfully generated {questions.length} questions.
                </p>
                <QuestionList questions={questions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}