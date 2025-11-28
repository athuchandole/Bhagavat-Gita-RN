import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import { useLanguage } from '../Theme/LanguageContext';
import Colors from '../Theme/colors';
import Feather from '@expo/vector-icons/Feather';
import translations from '../Translations/localization';

const VerseCard = ({ verseNumber, onPress }) => {
    const { themeMode } = useTheme();
    const { language } = useLanguage();
    const color = Colors[themeMode];
    const t = translations[language];

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]}
            onPress={onPress}
        >
            <View style={styles.left}>
                <Feather name="feather" size={18} color={color.icon} style={styles.leftIcon} />
                <View style={styles.titleWrapper}>
                    <Text style={[styles.titleText, { color: color.text }]}>{t.VerseTitle} {verseNumber}</Text>
                </View>
            </View>

            <View style={styles.right}>
                <Feather name="bookmark" size={20} color={color.icon} />
                <Feather name="check-circle" size={20} color={themeMode === 'dark' ? '#34D399' : '#10B981'} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    leftIcon: { marginRight: 15 },
    titleWrapper: { flexShrink: 1, flexGrow: 1 },
    titleText: { fontSize: 18, fontWeight: '600', flexWrap: 'wrap' },
    right: { flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 'auto' },
});

export default VerseCard;
