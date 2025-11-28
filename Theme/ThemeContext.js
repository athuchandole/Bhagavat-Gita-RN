// src/context/ThemeContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('light');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const saved = await AsyncStorage.getItem('themeMode');
            if (saved) setThemeMode(saved);
        } catch (e) {
            console.log('[THEME] load error', e);
        }
    };

    const toggleTheme = async () => {
        const next = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(next);
        await AsyncStorage.setItem('themeMode', next);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// ✅ FIX: export useTheme hook
export const useTheme = () => useContext(ThemeContext);
