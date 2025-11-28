import React from 'react';
import { View, FlatList, Text } from 'react-native';
import VerseCard from '../components/VerseCard';
import useLocalFetch from '../hooks/useLocalFetch';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import Screen from '../components/Screens';

export default function VerseList({ route, navigation }) {
    const { chapterId } = route.params;
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];

    const { data: verses, loading } = useLocalFetch(`verses_${chapterId}`);

    return (
        <Screen
            style={{ backgroundColor: theme.surface }}
            contentContainerStyle={{ padding: 10 }}
        >
            {loading ? (
                <Text style={{ color: theme.text }}>Loading verses...</Text>
            ) : (
                <FlatList
                    data={verses}
                    keyExtractor={(item) => item.id.toString()}
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
                />
            )}
        </Screen>
    );
}
