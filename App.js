import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './Theme/ThemeContext';
import { LanguageProvider } from './Theme/LanguageContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
    </ThemeProvider>
  );
}
