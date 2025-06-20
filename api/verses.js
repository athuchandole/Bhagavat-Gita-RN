import api from './api';

const getVersesByChapter = async (chapterId) => {
    const response = await api.get(`/chapters/${chapterId}/verses/`);
    return response.ok ? response.data : [];
};

const getVerse = async (chapterId, verseId) => {
    const response = await api.get(`/chapters/${chapterId}/verses/`);
    const verses = response.ok ? response.data : [];
    return verses.find((v) => String(v.verse_number) === String(verseId)) || null;
};

export default { getVersesByChapter, getVerse };
