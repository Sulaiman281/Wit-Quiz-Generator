

import React from 'react';

// FIX: Replaced non-existent 'Category' type with 'string' as it is not exported from types.ts and removed the unused import.
interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | 'all';
  setActiveCategory: (category: string | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, setActiveCategory }) => {
  const allCategories: (string | 'all')[] = ['all', ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {allCategories.map(category => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            activeCategory === category
              ? 'bg-blue-600 text-white shadow'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;