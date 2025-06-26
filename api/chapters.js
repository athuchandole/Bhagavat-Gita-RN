import { getApiClient } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import verseAPI from './verses';

const getChapters = async () => {
    console.log('[FETCH] getChapters called');
    const client = getApiClient();
    const response = await client.get('/chapters/');
    console.log('[RESPONSE] getChapters status:', response.ok);

    const chapters = response.ok ? response.data : [];

    // 💥 Fetch and store verses for each chapter
    if (chapters.length) {
        console.log('[PRELOAD] Fetching verses for each chapter...');
        for (const chapter of chapters) {
            const chapterId = chapter.id;
            try {
                const verses = await verseAPI.getVersesByChapter(chapterId);
                if (verses && verses.length) {
                    await AsyncStorage.setItem(`verses_${chapterId}`, JSON.stringify(verses));
                    console.log(`[STORAGE] Cached verses_${chapterId}`);
                } else {
                    console.log(`[API] No verses returned for chapter ${chapterId}`);
                }
            } catch (err) {
                console.error(`[ERROR] Failed to preload verses for chapter ${chapterId}`, err);
            }
        }
        console.log('[PRELOAD] All verses preloaded into AsyncStorage.');
    }

    return chapters;
};

export default { getChapters };
