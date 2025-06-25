import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { clearAllData } from './utils/cacheUtils'; // Import cache utility

export default function App() {
  useEffect(() => {
    // 🚨 WARNING: Only for development! Comment this out in production.
    clearAllData();
  }, []);

  return <AppNavigator />;
}
