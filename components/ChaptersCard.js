import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const ChaptersCard = ({ item, onPress }) => {
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.icon }]} onPress={onPress}>
            <Text style={[styles.title, { color: theme.text }]}>
                Chapter {item.chapter_number}
            </Text>
            <Text style={[styles.title, { color: theme.text }]}>
                {item.name} ({item.name_meaning})
            </Text>
            <Text style={[styles.subText, { color: theme.mutedText }]}>
                📄 Total Verses ({item.verses_count})
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    subText: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default ChaptersCard;
