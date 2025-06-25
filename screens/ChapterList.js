import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import chapterAPI from '../api/chapters';
import useLocalFetch from '../hooks/useLocalFetch';
import Loading from '../components/Loading';
import Screen from '../components/Screens';
import ChaptersCard from '../components/ChaptersCard';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import { useLanguage } from '../Theme/LanguageContext';
import translations from '../Translations/localization';

export default function ChapterList({ navigation }) {
    const chapters = useLocalFetch('chapters', chapterAPI.getChapters);
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];
    const { language } = useLanguage();
    const t = translations[language];

    if (!chapters) return <Loading />;

    return (
        <Screen>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={[styles.header, { color: theme.text }]}>{t.chapter}</Text>
                <FlatList
                    data={chapters}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ChaptersCard
                            item={item}
                            onPress={() => navigation.navigate('Chapter', { chapterId: item.id })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
});
