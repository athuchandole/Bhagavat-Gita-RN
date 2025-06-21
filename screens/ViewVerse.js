import React from 'react';
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

    const verse = useFetchData(
        STORAGE_KEYS.VERSE(chapterId, verseId),
        verseAPI.getVerse,
        chapterId,
        verseId
    );

    if (!verse) return <Loading />;

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.background }]}>
            <Text style={[styles.heading, { color: color.text }]}>
                Chapter {chapterId} • Verse {verseId}
            </Text>

            <MainText text={verse.text} color={color} />
            <Translation translation={verse.translations?.[0]?.description} color={color} />
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
