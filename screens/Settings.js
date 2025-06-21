import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import SettingCard from '../components/SettingCard';
import Colors from '../Theme/colors';
import { useTheme } from '../Theme/ThemeContext';

const Settings = () => {
    const { themeMode, toggleTheme } = useTheme();
    const theme = Colors[themeMode];

    const [language, setLanguage] = useState('en'); // default to English

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.text }]}>Settings</Text>

            <SettingCard
                icon="moon"
                name="Dark Mode"
                description="Enable dark theme for the app"
                value={themeMode === 'dark'}
                onChange={toggleTheme}
                type="toggle"
            />

            <SettingCard
                icon="language"
                name="Default Language"
                description="Select app language"
                value={language}
                onChange={setLanguage}
                type="select"
                options={[
                    { label: 'English', value: 'en' },
                    { label: 'Hindi', value: 'hi' },
                    { label: 'Sanskrit', value: 'sa' },
                ]}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        marginLeft: 16,
    },
});

export default Settings;
