import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens.js/HomeScreen';
import ChapterScreen from '../screens.js/ChapterScreen';
import VerseScreen from '../screens.js/VerseScreen';
import Header from '../components/Header'; // Custom header component

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                header: () => <Header title="Bhagavat Gita" />
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chapter" component={ChapterScreen} />
            <Stack.Screen name="Verse" component={VerseScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
