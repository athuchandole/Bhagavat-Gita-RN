import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import ChaptersCard from '../components/ChaptersCard';
import Header from '../components/Header';
import Colors from '../Theme/colors';
import { useTheme } from '../Theme/ThemeContext';
import useLocalFetch from '../hooks/useLocalFetch';

export default function ChapterList({ navigation }) {
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];

    const { data: chapters, loading } = useLocalFetch('chapters');

    return (
        <View style={{ flex: 1, backgroundColor: theme.surface }}>
            <Header title="Chapters" />
            {loading ? (
                <Text style={{ color: theme.text, margin: 20 }}>Loading...</Text>
            ) : (
                <FlatList
                    data={chapters}
                    keyExtractor={(item) => item.chapter_number.toString()}
                    renderItem={({ item }) => (
                        <ChaptersCard
                            item={item}
                            onPress={() =>
                                navigation.navigate('VerseList', { chapterId: item.chapter_number })
                            }
                        />
                    )}
                />
            )}
        </View>
    );
}
