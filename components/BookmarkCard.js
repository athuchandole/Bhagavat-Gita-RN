import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const BookmarkCard = ({ chapterId, verseId, onPress }) => {
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]} onPress={onPress}>
            <Text style={[styles.cardText, { color: color.text }]}>Chapter {chapterId} • Verse {verseId}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    cardText: { fontSize: 16, fontWeight: '500' },
});

export default BookmarkCard;
