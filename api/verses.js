import { getApiClient } from './api';

const getVersesByChapter = async (chapterId) => {
    console.log(`[FETCH] getVersesByChapter called with chapterId=${chapterId}`);
    const response = await getApiClient().get(`/chapters/${chapterId}/verses/`);
    console.log(`[RESPONSE] getVersesByChapter: ${response.ok}`);
    return response.ok ? response.data : [];
};

const getVerse = async (chapterId, verseId) => {
    console.log(`[FETCH] getVerse called with chapterId=${chapterId}, verseId=${verseId}`);
    const response = await getApiClient().get(`/chapters/${chapterId}/verses/`);
    console.log(`[RESPONSE] getVerse: ${response.ok}`);
    const verses = response.ok ? response.data : [];
    const result = verses.find((v) => String(v.verse_number) === String(verseId)) || null;
    console.log(`[MATCHED] Verse data: ${result ? 'Found' : 'Not found'}`);
    return result;
};

export default { getVersesByChapter, getVerse };
