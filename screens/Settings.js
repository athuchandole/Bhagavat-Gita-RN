import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import SettingCard from '../components/SettingCard';
import Colors from '../Theme/colors';
import { useTheme } from '../Theme/ThemeContext';
import { useLanguage } from '../Theme/LanguageContext';
import translations from '../Translations/localization';

const Settings = () => {
    const { themeMode, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const theme = Colors[themeMode];
    const t = translations[language];

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.text }]}>{t.settings}</Text>

            <SettingCard
                icon="moon"
                name={t.darkMode}
                description={t.darkModeDesc}
                value={themeMode === 'dark'}
                onChange={toggleTheme}
                type="toggle"
            />

            <SettingCard
                icon="language"
                name={t.language}
                description={t.languageDesc}
                value={language}
                onChange={changeLanguage}
                type="select"
                options={[
                    { label: 'English', value: 'en' },
                    { label: 'Hindi', value: 'hi' },
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
