import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '../components/TabNavigator';
import VerseList from '../screens/VerseList';
import VerseScreen from '../screens/VerseScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen name="VerseList" component={VerseList} />
                <Stack.Screen name="VerseScreen" component={VerseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
