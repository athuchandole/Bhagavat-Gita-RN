import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../Theme/LanguageContext';
import translations from '../../Translations/localization';

export default function Meaning({ meaning, color }) {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <>
            <Text style={[styles.label, { color: color.h1 }]}>
                📖 {t.wordMeanings}
            </Text>
            <Text style={[styles.content, {
                color: color.text,
                backgroundColor: color.surface,
                shadowColor: color.text,
            }]}>
                {meaning || t.notAvailable}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 6,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        padding: 12,
        borderRadius: 8,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
});
