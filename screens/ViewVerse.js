import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import verseAPI from '../api/verses';
import Loading from '../components/Loading';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import MainText from '../components/ViewVerse/MainText';
import Translation from '../components/ViewVerse/Translation';
import Meaning from '../components/ViewVerse/Meaning';
import { useLanguage } from '../Theme/LanguageContext';
import translations from '../Translations/localization';
import {
    addBookmark,
    removeBookmark,
    isBookmarked,
} from '../storage/bookmarkStorage';

export default function ViewVerse({ route }) {
    const { chapterId, verseId } = route.params;
    const verseKey = `verse_${chapterId}_${verseId}`;
    const [verse, setVerse] = useState(null);
    const [selectedLang, setSelectedLang] = useState('Hindi');
    const [bookmarked, setBookmarked] = useState(false);

    const { themeMode } = useTheme();
    const color = Colors[themeMode];
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        let mounted = true;
        (async () => {
            const v = await verseAPI.getVerse(chapterId, verseId);
            if (mounted) setVerse(v);
            const bk = await isBookmarked(verseKey);
            if (mounted) setBookmarked(bk);
        })();
        return () => { mounted = false; };
    }, [chapterId, verseId, verseKey]);

    const toggleBookmark = async () => {
        if (bookmarked) {
            await removeBookmark(verseKey);
        } else {
            await addBookmark(verseKey);
        }
        setBookmarked(!bookmarked);
    };

    if (!verse) return <Loading />;

    const langMap = { Sanskrit: 0, Hindi: 1, English: 2 };
    const translation = verse.translations?.[langMap[selectedLang]]?.description
        || verse.translations?.find(t => t.language && t.language.toLowerCase().includes(selectedLang.toLowerCase()))?.description
        || verse.translations?.[0]?.description;

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.background }]}>
            <Text style={[styles.heading, { color: color.text }]}>
                {t.chapter} {chapterId} • {t.VerseTitle} {verseId}
            </Text>

            <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkBtn}>
                <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={color.primary} />
            </TouchableOpacity>

            <MainText text={verse.text} color={color} />
            <Translation translation={translation} color={color} selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
            <Meaning meaning={verse.word_meanings} color={color} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, position: 'relative' },
    heading: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
    bookmarkBtn: { position: 'absolute', top: 20, right: 20 },
});
