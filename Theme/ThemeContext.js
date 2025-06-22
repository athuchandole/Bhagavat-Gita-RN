import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const THEME_KEY = 'APP_THEME';

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = Appearance.getColorScheme();
    const [themeMode, setThemeMode] = useState(systemColorScheme || 'light');

    // Load saved theme from storage
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_KEY);
                if (storedTheme) {
                    setThemeMode(storedTheme);
                }
            } catch (e) {
                console.error('Failed to load theme from storage', e);
            }
        };

        loadTheme();
    }, []);

    // Toggle and save theme
    const toggleTheme = async () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
        try {
            await AsyncStorage.setItem(THEME_KEY, newTheme);
        } catch (e) {
            console.error('Failed to save theme to storage', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
