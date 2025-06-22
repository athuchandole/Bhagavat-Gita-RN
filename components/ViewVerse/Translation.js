import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../Theme/LanguageContext';
import translations from '../../Translations/localization';

export default function Translation({ translation, color, selectedLang, setSelectedLang }) {
    const { language } = useLanguage();
    const t = translations[language];

    const tabs = ['Sanskrit', 'Hindi', 'English'];

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: color.h1 }]}>
                🔍 {t.translation}
            </Text>

            <View style={styles.pillsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedLang(tab)}
                        style={[
                            styles.pill,
                            {
                                backgroundColor:
                                    selectedLang === tab ? color.primary : color.surface,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                {
                                    color:
                                        selectedLang === tab ? color.onPrimary : color.primary,
                                },
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]}>
                <Text style={[styles.content, { color: color.text }]}>
                    {translation || t.noTranslation}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 24,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'left',
        textTransform: 'capitalize',
        letterSpacing: 0.5,
        alignSelf: 'flex-start',
    },
    pillsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
        flexWrap: 'wrap',
        gap: 8,
    },
    pill: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginHorizontal: 4,
    },
    pillText: {
        fontSize: 14,
        fontWeight: '600',
    },
    card: {
        padding: 16,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%',
    },
    content: {
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center',
        letterSpacing: 0.3,
        fontWeight: '500',
    },
});
