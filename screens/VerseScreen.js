import React from 'react';
import { View, Text } from 'react-native';
import useLocalFetch from '../hooks/useLocalFetch';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

export default function VerseScreen({ route }) {
    const { chapterId, verseId } = route.params;
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];

    const { data: verses } = useLocalFetch(`verses_${chapterId}`);
    const verse = verses?.find((v) => v.verse_number === verseId);

    if (!verse) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.text }}>Verse not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.surface, padding: 20 }}>
            <Text style={{ color: theme.text, fontSize: 18, marginBottom: 10 }}>
                {verse.text}
            </Text>
            {verse.translations?.map((t, idx) => (
                <Text key={idx} style={{ color: theme.mutedText, marginBottom: 10 }}>
                    {t.description}
                </Text>
            ))}
        </View>
    );
}
