import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VerseList from '../screens/VerseList';
import ViewVerse from '../screens/ViewVerse';
import Header from '../components/Header';
import TabNavigator from '../components/TabNavigator';

import { ThemeProvider } from '../Theme/ThemeContext';
import { LanguageProvider } from '../Theme/LanguageContext';
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <ThemeProvider>
        <LanguageProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        header: () => <Header title="Bhagavat Gita" />
                    }}
                >
                    <Stack.Screen name="Tabs" component={TabNavigator} />
                    <Stack.Screen name="Chapter" component={VerseList} />
                    <Stack.Screen name="Verse" component={ViewVerse} />
                </Stack.Navigator>
            </NavigationContainer>
        </LanguageProvider>
    </ThemeProvider>
);

export default AppNavigator;
