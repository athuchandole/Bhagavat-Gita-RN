import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import { useLanguage } from '../Theme/LanguageContext';
import Colors from '../Theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import translations from '../Translations/localization';

const ChaptersCard = ({ item, onPress }) => {
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.icon }]}
            onPress={onPress}
        >
            <View style={styles.row}>
                <Image source={require('../assets/sk1.jpg')} style={styles.chapterImage} />
                <View style={styles.textColumn}>
                    <Text style={[styles.title, { color: theme.h1 }]} numberOfLines={1} ellipsizeMode="tail">
                        {`${t.chapter} ${item.chapter_number}`}
                    </Text>

                    <Text style={[styles.title, { color: theme.text }]} numberOfLines={2} ellipsizeMode="tail">
                        {item.name} ({item.meaning?.en || item.name_meaning || ''})
                    </Text>
                </View>
            </View>

            <View style={styles.row}>
                <Icon name="document-text-outline" size={16} color={theme.mutedText} />
                <Text style={[styles.subText, { color: theme.mutedText, marginLeft: 4 }]}>
                    {`${t.totalVerses} (${item.verses_count})`}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { padding: 12, borderRadius: 10, marginBottom: 12, elevation: 3, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    row: { flexDirection: 'row', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: '700', margin: 5, flexShrink: 1 },
    subText: { fontSize: 14, marginTop: 4 },
    chapterImage: { width: 80, height: 80, borderRadius: 12, marginRight: 10 },
    textColumn: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
});

export default ChaptersCard;
