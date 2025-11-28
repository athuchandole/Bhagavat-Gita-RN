import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getBookmarks } from '../storage/bookmarkStorage';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import BookmarkCard from '../components/BookmarkCard';
import Screen from '../components/Screens';

export default function BookmarkScreen() {
    const [bookmarks, setBookmarks] = useState([]);
    const navigation = useNavigation();
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    // Load bookmarks every time screen focuses
    useFocusEffect(
        useCallback(() => {
            let mounted = true;
            const loadBookmarks = async () => {
                const data = await getBookmarks();
                if (mounted) setBookmarks(data);
            };
            loadBookmarks();
            return () => { mounted = false; };
        }, [])
    );

    // Parse key like "verse_1_5"
    const parseKey = (key) => {
        const [_, chapterId, verseId] = key.split('_');
        return { chapterId: Number(chapterId), verseId: Number(verseId) };
    };

    return (
        <Screen style={{ backgroundColor: color.background }} contentContainerStyle={{ padding: 20 }}>
            <Text style={[styles.title, { color: color.text }]}>🔖 Bookmarked Verses</Text>
            <FlatList
                data={bookmarks}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const { chapterId, verseId } = parseKey(item);
                    return (
                        <BookmarkCard
                            chapterId={chapterId}
                            verseId={verseId}
                            onPress={() =>
                                navigation.navigate('VerseScreen', { chapterId, verseId })

                            }
                        />
                    );
                }}
                ListEmptyComponent={
                    <Text style={{ color: color.text, textAlign: 'center', marginTop: 20 }}>
                        No bookmarks yet.
                    </Text>
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});
