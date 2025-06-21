import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const SummaryCard = ({ summary }) => {
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    return (
        <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]}>
            <Text style={[styles.title, { color: color.text }]}>📝 Summary:</Text>
            <Text style={[styles.text, { color: color.mutedText }]}>{summary}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
    },
});

export default SummaryCard;
