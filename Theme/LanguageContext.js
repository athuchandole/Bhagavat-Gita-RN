// src/Theme/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

const LANGUAGE_KEY = 'APP_LANGUAGE';

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    // Load saved language on app start
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
                if (storedLang) {
                    setLanguage(storedLang);
                }
            } catch (e) {
                console.error('Failed to load language from storage', e);
            }
        };

        loadLanguage();
    }, []);

    // Save language on change
    const changeLanguage = async (newLang) => {
        setLanguage(newLang);
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, newLang);
        } catch (e) {
            console.error('Failed to save language to storage', e);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
