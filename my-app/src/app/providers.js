'use client';

import { TagSearchProvider } from './contexts/searchContext';

export default function Providers({ children }) {
    return (
        <TagSearchProvider>
            {children}
        </TagSearchProvider>
    );
}
