import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import verseAPI from '../api/verses';
import Loading from '../components/Loading';

export default function ChapterScreen({ route, navigation }) {
    const { chapterId } = route.params;
    const [verses, setVerses] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await verseAPI.getVersesByChapter(chapterId);
            setVerses(data);
        };
        load();
    }, [chapterId]);

    if (verses.length === 0) return <Loading />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Verses</Text>
            <FlatList
                data={verses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.verseCard}
                        onPress={() => navigation.navigate('Verse', {
                            chapterId,
                            verseId: item.verse_number
                        })}
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
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
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
});
