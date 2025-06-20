import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChapterList from '../screens/ChapterList';
import VerseList from '../screens/VerseList';
import ViewVerse from '../screens/ViewVerse';
import Header from '../components/Header';
import Settings from '../screens/Settings';
import { ThemeProvider } from '../Theme/ThemeContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <ThemeProvider>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    header: () => <Header title="Bhagavat Gita" />
                }}
            >
                <Stack.Screen name="Home" component={ChapterList} />
                <Stack.Screen name="Chapter" component={VerseList} />
                <Stack.Screen name="Verse" component={ViewVerse} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    </ThemeProvider>
);

export default AppNavigator;
