import api from './api';

const getVersesByChapter = async (chapterId) => {
    console.log(`[FETCH] getVersesByChapter called with chapterId=${chapterId}`);
    const response = await api.get(`/chapters/${chapterId}/verses/`);
    console.log('RESPONSE getVersesByChapter:');
    return response.ok ? response.data : [];
};

const getVerse = async (chapterId, verseId) => {
    console.log(`[FETCH] getVerse called with chapterId=${chapterId}, verseId=${verseId}`);
    const response = await api.get(`/chapters/${chapterId}/verses/`);
    console.log('[RESPONSE] getVerse:');
    const verses = response.ok ? response.data : [];
    const result = verses.find((v) => String(v.verse_number) === String(verseId)) || null;
    console.log('MATCHED VERSE Data');
    return result;
};

export default { getVersesByChapter, getVerse };
