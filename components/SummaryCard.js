import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import { useLanguage } from '../Theme/LanguageContext'; // 🆕
import translations from '../Translations/localization'; // 🆕

import Colors from '../Theme/colors';

const SummaryCard = ({ summary, onToggleLanguage, isTranslated }) => {
    const { themeMode } = useTheme();
    const { language } = useLanguage(); // 🆕
    const color = Colors[themeMode];
    const t = translations[language]; // 🆕

    return (
        <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]}>
            <Text style={[styles.title, { color: color.text }]}>📝 {t.summaryTitle}</Text>
            <Text style={[styles.text, { color: color.mutedText }]}>{summary}</Text>
            <TouchableOpacity onPress={onToggleLanguage} style={styles.translateContainer}>
                <Text style={[styles.translateText, { color: color.primary }]}>
                    {isTranslated ? t.showOriginal : t.translate}
                </Text>
            </TouchableOpacity>
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
    translateContainer: {
        marginTop: 12,
        alignSelf: 'flex-start',
    },
    translateText: {
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'none',
    },
});

export default SummaryCard;
