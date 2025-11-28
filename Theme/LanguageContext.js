// src/context/LanguageContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const saved = await AsyncStorage.getItem('language');
            if (saved) setLanguage(saved);
        } catch (error) {
            console.log('[LANGUAGE] load error', error);
        }
    };

    const changeLanguage = async (lang) => {
        setLanguage(lang);
        await AsyncStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// ✅ REQUIRED HOOK
export const useLanguage = () => useContext(LanguageContext);
