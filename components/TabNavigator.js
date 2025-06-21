import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChapterList from '../screens/ChapterList';
import BookmarkScreen from '../screens/BookmarkScreen'; // Placeholder
import Settings from '../screens/Settings';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { themeMode } = useTheme();
    const themeColors = Colors[themeMode];

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Bookmark') iconName = 'bookmark';
                    else if (route.name === 'Settings') iconName = 'settings';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: themeColors.primary,
                tabBarInactiveTintColor: themeColors.icon,
                tabBarStyle: { backgroundColor: themeColors.surface },
            })}
        >
            <Tab.Screen name="Home" component={ChapterList} />
            <Tab.Screen name="Bookmark" component={BookmarkScreen} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
