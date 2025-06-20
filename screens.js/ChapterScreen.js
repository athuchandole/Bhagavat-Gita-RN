import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import verseAPI from '../api/verses';
import chapterAPI from '../api/chapters'
import useFetchData from '../hooks/useFetchData';
import Loading from '../components/Loading';
import STORAGE_KEYS from '../storage/database';
import Screen from '../components/Screens';

export default function ChapterScreen({ route, navigation }) {
    const { chapterId } = route.params;
    const verses = useFetchData(
        STORAGE_KEYS.VERSES(chapterId),
        verseAPI.getVersesByChapter,
        chapterId
    );

    const chapters = useFetchData(STORAGE_KEYS.CHAPTERS, chapterAPI.getChapters);
    const currentChapter = chapters?.find((c) => c.id === chapterId);

    if (!verses) return <Loading />;

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.header}>Chapter {chapterId} Verses List</Text>

                <FlatList
                    data={verses}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        currentChapter ? (
                            <View style={styles.summaryBox}>
                                <Text style={styles.summaryTitle}>📝 Summary:</Text>
                                <Text style={styles.summaryText}>
                                    {currentChapter.chapter_summary}
                                </Text>
                            </View>
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.verseCard}
                            onPress={() =>
                                navigation.navigate('Verse', {
                                    chapterId,
                                    verseId: item.verse_number,
                                })
                            }
                        >
                            <Text style={styles.verseTitle}>Verse {item.verse_number}</Text>
                            {item.text && (
                                <Text style={styles.verseSnippet} numberOfLines={2}>
                                    {item.text}
                                </Text>
                            )}
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    verseCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    verseTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    verseSnippet: {
        fontSize: 14,
        color: '#6B7280',
    },


    summaryBox: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#374151',
    },
    summaryText: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },

});
