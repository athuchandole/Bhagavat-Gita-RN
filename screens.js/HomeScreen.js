import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import chapterAPI from '../api/chapters';

import Screen from '../components/Screens';
import Loading from '../components/Loading';

export default function HomeScreen({ navigation }) {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await chapterAPI.getChapters();
            setChapters(data);
        };
        load();
    }, []);

    if (chapters.length === 0) return <Loading />;

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.header}>Chapters</Text>
                <FlatList
                    data={chapters}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.chapterCard}
                            onPress={() => navigation.navigate('Chapter', { chapterId: item.id })}
                        >
                            <Text style={styles.chapterTitle}>
                                Chapter {item.chapter_number}
                            </Text>
                            <Text style={styles.chapterTitle}>
                                {item.name} ({item.name_meaning})
                            </Text>
                            <Text style={styles.chapterMeaning}>
                                📄 Total Verses ({item.verses_count})
                            </Text>
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
        backgroundColor: '#F7F9FC',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    listContent: {
        paddingBottom: 20,
    },
    chapterCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    chapterTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A59',
    },
    chapterMeaning: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
});
