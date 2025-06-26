import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getBookmarks } from '../storage/bookmarkStorage';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

export default function BookmarkScreen() {
    const [bookmarks, setBookmarks] = useState([]);
    const navigation = useNavigation();
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    // ✅ Load bookmarks every time this screen is focused
    useFocusEffect(
        useCallback(() => {
            const loadBookmarks = async () => {
                const data = await getBookmarks();
                setBookmarks(data);
                console.log('📌 BookmarkScreen: loaded', data.length, 'bookmarks');
            };
            loadBookmarks();
        }, [])
    );

    // ✅ Parse bookmark key into chapter/verse ID
    const parseKey = (key) => {
        const parts = key.split('_');
        return {
            chapterId: parts[1],
            verseId: parts[2],
        };
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
                        <TouchableOpacity
                            style={[styles.item, { backgroundColor: color.card }]}
                            onPress={() =>
                                navigation.navigate('ViewVerse', {
                                    chapterId,
                                    verseId,
                                })
                            }
                        >
                            <Text style={{ color: color.text }}>
                                Chapter {chapterId} • Verse {verseId}
                            </Text>
                        </TouchableOpacity>
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
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
});
