import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import verseAPI from '../api/verses';
import useFetchData from '../hooks/useFetchData';
import Loading from '../components/Loading';
import STORAGE_KEYS from '../storage/database';

export default function VerseScreen({ route }) {
    const { chapterId, verseId } = route.params;
    const verse = useFetchData(
        STORAGE_KEYS.VERSE(chapterId, verseId),
        verseAPI.getVerse,
        chapterId,
        verseId
    );

    if (!verse) return <Loading />;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>
                Chapter {chapterId} • Verse {verseId}
            </Text>

            <Text style={styles.label}>🕉️ Sanskrit Text</Text>
            <Text style={styles.content}>{verse.text}</Text>

            <Text style={styles.label}>🔍 Translation</Text>
            <Text style={styles.content}>
                {verse.translations?.[0]?.description || 'No translation available.'}
            </Text>

            <Text style={styles.label}>📖 Word Meanings</Text>
            <Text style={styles.content}>{verse.word_meanings || 'N/A'}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#F9FAFB',
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        color: '#1F2937',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 6,
        color: '#4B5563',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#374151',
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
});
