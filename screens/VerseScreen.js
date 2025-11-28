import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import useLocalFetch from '../hooks/useLocalFetch';
import { useTheme } from '../Theme/ThemeContext';
import { useLanguage } from '../Theme/LanguageContext';
import Colors from '../Theme/colors';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Screen from '../components/Screens';
import { addBookmark, removeBookmark, isBookmarked } from '../storage/bookmarkStorage';

export default function VerseScreen({ route }) {
    const { chapterId, verseId } = route.params;
    const { themeMode } = useTheme();
    const { language } = useLanguage();
    const theme = Colors[themeMode];
    const langKey = language === 'hi' ? 'hi' : 'en';

    const { data: chapters } = useLocalFetch('chapters');
    const { data: verses } = useLocalFetch(`verses_${chapterId}`);

    const chapter = chapters?.find(c => c.chapter_number === chapterId);
    const verse = verses?.find(v => v.verse_number === verseId);

    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const checkBookmark = async () => {
            const key = `verse_${chapterId}_${verseId}`;
            const bookmarked = await isBookmarked(key);
            setBookmarked(bookmarked);
        };
        checkBookmark();
    }, [chapterId, verseId]);

    const toggleBookmark = async () => {
        const key = `verse_${chapterId}_${verseId}`;
        if (bookmarked) {
            await removeBookmark(key);
            setBookmarked(false);
        } else {
            await addBookmark(key);
            setBookmarked(true);
        }
    };

    if (!chapter || !verse) {
        return (
            <Screen style={{ backgroundColor: theme.surface }}>
                <View style={styles.centered}>
                    <Text style={{ color: theme.text }}>Verse or Chapter not found</Text>
                </View>
            </Screen>
        );
    }

    return (
        <Screen style={{ backgroundColor: theme.surface }} contentContainerStyle={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Chapter Title */}
                <Text style={[styles.chapterTitle, { color: theme.primary }]}>
                    Chapter {chapter.chapter_number} - {chapter.name}
                </Text>
                <Text style={[styles.chapterTranslation, { color: theme.text, marginBottom: 8 }]}>
                    ({chapter.translation})
                </Text>
                <Text style={[styles.chapterMeaning, { color: theme.mutedText, marginBottom: 16 }]}>
                    {chapter.meaning[langKey]}
                </Text>

                <View style={styles.chapterMetaRow}>
                    <Feather name="book" size={14} color={theme.icon} />
                    <Text style={[styles.chapterMetaText, { color: theme.mutedText }]}>
                        {chapter.verses_count} verses
                    </Text>
                    <Feather name="edit-3" size={14} color={theme.icon} style={{ marginLeft: 16 }} />
                    <Text style={[styles.chapterMetaText, { color: theme.mutedText, flexShrink: 1 }]}>
                        {chapter.transliteration}
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* Verse */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[styles.verseLabel, { color: theme.primary }]}>Verse {verse.verse_number}</Text>
                    <TouchableOpacity onPress={toggleBookmark}>
                        <MaterialCommunityIcons
                            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={24}
                            color={bookmarked ? theme.primary : theme.mutedText}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.verseText, { color: theme.text }]}>{verse.text}</Text>

                <View style={styles.divider} />

                {/* Translations */}
                <Text style={[styles.sectionTitle, { color: theme.primary, marginBottom: 12 }]}>Translations</Text>
                {verse.translations?.map((t, idx) => (
                    <View key={idx} style={styles.translationContainer}>
                        <Text style={[styles.translationAuthor, { color: theme.primary }]}>
                            {t.author_name} ({t.language})
                        </Text>
                        <Text style={[styles.translationText, { color: theme.mutedText, marginBottom: 12 }]}>
                            {t.description}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chapterTitle: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
    chapterTranslation: { fontSize: 16, fontStyle: 'italic' },
    chapterMeaning: { fontSize: 16, fontStyle: 'italic' },
    chapterMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap' },
    chapterMetaText: { fontSize: 12, marginLeft: 6 },
    divider: { height: 1, backgroundColor: '#ccc', marginVertical: 20 },
    verseLabel: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
    verseText: { fontSize: 18, lineHeight: 26, fontWeight: '500' },
    sectionTitle: { fontSize: 20, fontWeight: '700' },
    translationContainer: { marginBottom: 16 },
    translationAuthor: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
    translationText: { fontSize: 14, lineHeight: 20 },
});
