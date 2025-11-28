import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useLanguage } from '../../Theme/LanguageContext';
import translations from '../../Translations/localization';

export default function MainText({ text, color }) {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: color.h1 }]}>🕉️ {t.sanskritText}</Text>
            <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]}>
                <Text style={[styles.content, { color: color.text }]}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', marginBottom: 5 },
    label: { fontSize: 18, fontWeight: '700', marginBottom: 10, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
    card: { paddingVertical: 16, paddingHorizontal: 5, borderRadius: 10, elevation: 3, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, maxWidth: '100%', width: '100%' },
    content: { fontSize: 22, lineHeight: 28, fontWeight: '900', textAlign: 'center', letterSpacing: 0.5 },
});
