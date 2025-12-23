'use client';

import { useState } from 'react';

export default function TagSelector({ label, options = [], selectedTags = [], onTagSelect, color = "emerald" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500',
      hover: 'hover:bg-emerald-600',
      ring: 'focus:ring-emerald-300',
      tag: 'bg-emerald-100 text-emerald-800',
    },
    blue: {
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      ring: 'focus:ring-blue-300',
      tag: 'bg-blue-100 text-blue-800',
    },
    rose: {
      bg: 'bg-rose-500',
      hover: 'hover:bg-rose-600',
      ring: 'focus:ring-rose-300',
      tag: 'bg-rose-100 text-rose-800',
    },
  };

  const colors = colorClasses[color] || colorClasses.emerald;

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedTags.includes(option)
  );

  const handleTagClick = (tag) => {
    if (onTagSelect) {
      onTagSelect(tag);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${colors.bg} ${colors.hover} text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md ${colors.ring} focus:ring-2 focus:outline-none min-w-[180px] justify-between`}
      >
        <span>{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Rechercher un ${label.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          
          {/* Options list */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleTagClick(option)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-400 text-sm">Aucun résultat</li>
            )}
          </ul>
        </div>
      )}

      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className={`${colors.tag} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}
            >
              {tag}
              <button
                onClick={() => handleTagClick(tag)}
                className="hover:opacity-70 transition-opacity"
                aria-label={`Supprimer ${tag}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

