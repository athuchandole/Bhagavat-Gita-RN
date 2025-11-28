import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getBookmarks } from '../storage/bookmarkStorage';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import BookmarkCard from '../components/BookmarkCard';

export default function BookmarkScreen() {
    const [bookmarks, setBookmarks] = useState([]);
    const navigation = useNavigation();
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    useFocusEffect(
        useCallback(() => {
            let mounted = true;
            const loadBookmarks = async () => {
                const data = await getBookmarks();
                if (mounted) {
                    setBookmarks(data);
                    console.log('✅ BookmarkScreen: bookmarks loaded');
                }
            };
            loadBookmarks();
            return () => { mounted = false; };
        }, [])
    );

    const parseKey = (key) => {
        const [_, chapterId, verseId] = key.split('_');
        return { chapterId, verseId };
    };

    return (
        <View style={[styles.container, { backgroundColor: color.background }]}>
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
                                navigation.navigate('Verse', {
                                    chapterId,
                                    verseId,
                                })
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});
