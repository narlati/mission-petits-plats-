'use client';

import { useTagSearch } from "@/app/contexts/searchContext";

export default function SearchBar({ placeholder = "Rechercher une recette, un ingrédient..." }) {
  const { searchQuery, setSearchValue } = useTagSearch();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-4 px-6 pr-14 rounded-xl text-lg bg-white text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition-colors"
          aria-label="Rechercher"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
