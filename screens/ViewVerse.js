import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import verseAPI from '../api/verses';
import useFetchData from '../hooks/useFetchData';
import Loading from '../components/Loading';
import STORAGE_KEYS from '../storage/database';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

import MainText from '../components/ViewVerse/MainText';
import Translation from '../components/ViewVerse/Translation';
import Meaning from '../components/ViewVerse/Meaning';

export default function ViewVerse({ route }) {
    const { chapterId, verseId } = route.params;
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    // 🆕 Language tab state
    const [selectedLang, setSelectedLang] = useState('Hindi'); // Default tab

    // 📦 Fetch verse data
    const verse = useFetchData(
        STORAGE_KEYS.VERSE(chapterId, verseId),
        verseAPI.getVerse,
        chapterId,
        verseId
    );

    // ⏳ Loading state
    if (!verse) return <Loading />;

    // 🧠 Match tab to translation index
    const langMap = {
        Sanskrit: 0,
        Hindi: 1,
        English: 2,
    };

    const translation = verse.translations?.[langMap[selectedLang]]?.description;

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.background }]}>
            <Text style={[styles.heading, { color: color.text }]}>
                Chapter {chapterId} • Verse {verseId}
            </Text>

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
