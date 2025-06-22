import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import verseAPI from '../api/verses';
import chapterAPI from '../api/chapters';
import useFetchData from '../hooks/useFetchData';
import Loading from '../components/Loading';
import STORAGE_KEYS from '../storage/database';
import Screen from '../components/Screens';
import SummaryCard from '../components/SummaryCard';
import VerseCard from '../components/VerseCard';
import { useTheme } from '../Theme/ThemeContext';
import { useLanguage } from '../Theme/LanguageContext';
import translations from '../Translations/localization';

import Colors from '../Theme/colors';

export default function VerseList({ route, navigation }) {
    const { chapterId } = route.params;
    const { themeMode } = useTheme();
    const { language } = useLanguage();
    const color = Colors[themeMode];
    const t = translations[language];

    const [isTranslated, setIsTranslated] = useState(false);

    const verses = useFetchData(
        STORAGE_KEYS.VERSES(chapterId),
        verseAPI.getVersesByChapter,
        chapterId
    );

    const chapters = useFetchData(STORAGE_KEYS.CHAPTERS, chapterAPI.getChapters);
    const currentChapter = chapters?.find((c) => c.id === chapterId);

    if (!verses) return <Loading />;

    const handleToggleTranslation = () => {
        setIsTranslated((prev) => !prev);
    };

    return (
        <Screen>
            <View style={[styles.container, { backgroundColor: color.background }]}>
                <Text style={[styles.header, { color: color.text }]}>
                    {t.chapter} {chapterId} {t.versesList}
                </Text>

                <FlatList
                    data={verses}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        currentChapter ? (
                            <SummaryCard
                                summary={
                                    isTranslated
                                        ? currentChapter.chapter_summary_hindi
                                        : currentChapter.chapter_summary
                                }
                                isTranslated={isTranslated}
                                onToggleLanguage={handleToggleTranslation}
                            />
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <VerseCard
                            verseNumber={item.verse_number}
                            onPress={() =>
                                navigation.navigate('Verse', {
                                    chapterId,
                                    verseId: item.verse_number,
                                })
                            }
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
