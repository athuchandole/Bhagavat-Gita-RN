import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChapterList from '../screens.js/ChapterList';
import VerseList from '../screens.js/VerseList';
import ViewVerse from '../screens.js/ViewVerse';
import Header from '../components/Header'; // Custom header component

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                header: () => <Header title="Bhagavat Gita" />
            }}
        >
            <Stack.Screen name="Home" component={ChapterList} />
            <Stack.Screen name="Chapter" component={VerseList} />
            <Stack.Screen name="Verse" component={ViewVerse} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
