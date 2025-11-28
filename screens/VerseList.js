import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VerseCard from '../components/VerseCard';
import useLocalFetch from '../hooks/useLocalFetch';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import Screen from '../components/Screens';

export default function VerseList({ route, navigation }) {
    const { chapterId } = route.params;
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];

    const { data: verses, loading: loadingVerses } = useLocalFetch(`verses_${chapterId}`);
    const { data: chapters, loading: loadingChapters } = useLocalFetch('chapters');

    const [translationLang, setTranslationLang] = useState('en');

    const chapter = chapters?.find((ch) => ch.chapter_number === chapterId);

    if (loadingVerses || loadingChapters) {
        return (
            <Screen style={{ backgroundColor: theme.surface }} contentContainerStyle={{ padding: 10 }}>
                <Text style={{ color: theme.text }}>Loading...</Text>
            </Screen>
        );
    }

    const renderHeader = () => {
        if (!chapter) return null;

        return (
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
                {/* Chapter Title */}
                <Text style={[styles.chapterTitle, { color: theme.text }]}>
                    {chapter.name} ({chapter.transliteration})
                </Text>

                {/* Chapter Meaning */}
                <Text style={[styles.chapterMeaning, { color: theme.text }]}>
                    {chapter.meaning[translationLang]}
                </Text>

                {/* Chapter Translation Name */}
                <Text style={[styles.chapterTranslation, { color: theme.text }]}>
                    Translation: {chapter.translation}
                </Text>

                {/* Verses Count */}
                <Text style={[styles.chapterVerses, { color: theme.text }]}>
                    Verses: {chapter.verses_count}
                </Text>

                {/* Chapter Summary */}
                <Text style={[styles.chapterDescription, { color: theme.text }]}>
                    {chapter.summary[translationLang]}
                </Text>

                {/* Minimal Translation Button */}
                <TouchableOpacity onPress={() => setTranslationLang(translationLang === 'en' ? 'hi' : 'en')}>
                    <Text style={styles.translationBtnText}>
                        {translationLang === 'en' ? 'See Hindi Translation' : 'See English Translation'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Screen
            style={{ backgroundColor: theme.surface }}
            contentContainerStyle={{ padding: 10 }}
        >
            <FlatList
                data={verses}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <VerseCard
                        verseNumber={item.verse_number}
                        onPress={() =>
                            navigation.navigate('VerseScreen', {
                                chapterId,
                                verseId: item.verse_number,
                            })
                        }
                    />
                )}
                ListEmptyComponent={
                    <Text style={{ color: theme.text }}>No verses found.</Text>
                }
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    chapterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    chapterMeaning: {
        fontSize: 15,
        marginBottom: 2,
    },
    chapterTranslation: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 2,
    },
    chapterVerses: {
        fontSize: 14,
        marginBottom: 2,
    },
    chapterDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4, // minimal margin
    },
    translationBtnText: {
        fontSize: 14,
        color: '#1E90FF', // blue text
        fontWeight: '500',
    },
});
