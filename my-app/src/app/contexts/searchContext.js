'use client';

import { createContext, useState, useContext } from 'react';

const TagSearchContext = createContext();

export const TagSearchProvider = ({ children }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedAppareils, setSelectedAppareils] = useState([]);
    const [selectedUstensiles, setSelectedUstensiles] = useState([]);
    const [searchQuery, setSearchValue] = useState('');

    const value = {
        //states
        selectedIngredients,
        selectedAppareils,
        selectedUstensiles,
        searchQuery,

        //setters
        setSearchValue,
        setSelectedIngredients,
        setSelectedAppareils,
        setSelectedUstensiles,
    };

    return (
        <TagSearchContext.Provider value={value}>
            {children}
        </TagSearchContext.Provider>
    );
};

export const useTagSearch = () => {
    const context = useContext(TagSearchContext);
    if (!context) {
        throw new Error('useTagSearch doit être utilisé dans un TagSearchProvider');
    }
    return context;
};
