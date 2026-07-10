'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Vi sätter 'light' som default under server-iseringen (SSR)
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Sätt rätt tema direkt när komponenten laddas i webbläsaren
        setTheme(mediaQuery.matches ? 'dark' : 'light');

        // Lyssna på ändringar (om användaren slår om i OS-inställningarna)
        const handler = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const value = {
        theme,
        isDark: theme === 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Enkel custom hook för att använda contextet utan att behöva importera useContext överallt
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme måste användas inom en ThemeProvider');
    }
    return context;
}