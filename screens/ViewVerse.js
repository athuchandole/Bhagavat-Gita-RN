import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import verseAPI from '../api/verses';
import useLiveFetch from '../hooks/useLiveFetch';
import Loading from '../components/Loading';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import MainText from '../components/ViewVerse/MainText';
import Translation from '../components/ViewVerse/Translation';
import Meaning from '../components/ViewVerse/Meaning';
import { useLanguage } from '../Theme/LanguageContext';
import translations from '../Translations/localization';

export default function ViewVerse({ route }) {
    const { chapterId, verseId } = route.params;
    const verse = useLiveFetch(verseAPI.getVerse, chapterId, verseId);

    const [selectedLang, setSelectedLang] = useState('Hindi');
    const { themeMode } = useTheme();
    const color = Colors[themeMode];
    const { language } = useLanguage();
    const t = translations[language];

    if (!verse) return <Loading />;

    const langMap = {
        Sanskrit: 0,
        Hindi: 1,
        English: 2,
    };
    const translation = verse.translations?.[langMap[selectedLang]]?.description;

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.background }]}>
            <Text style={[styles.heading, { color: color.text }]}> {t.chapter} {chapterId} • {t.VerseTitle} {verseId} </Text>
            <MainText text={verse.text} color={color} />
            <Translation
                translation={translation}
                color={color}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
            />
            <Meaning meaning={verse.word_meanings} color={color} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
});
