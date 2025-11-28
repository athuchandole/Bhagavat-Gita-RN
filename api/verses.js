import data from '../json/alldata.json';

const getVersesByChapter = async (chapterId) => {
    console.log(`[LOCAL] getVersesByChapter chapterId=${chapterId}`);

    const all = data.VERSES;

    if (!Array.isArray(all)) {
        console.log('[LOCAL] VERSES is not an array');
        return [];
    }

    const chapterIndex = Number(chapterId) - 1;

    if (!all[chapterIndex]) {
        console.log('[LOCAL] chapterIndex missing for', chapterId);
        return [];
    }

    return all[chapterIndex];
};

const getVerse = async (chapterId, verseNumber) => {
    const verses = await getVersesByChapter(chapterId);

    return verses.find(
        (v) => Number(v.verse_number) === Number(verseNumber)
    );
};

export default {
    getVersesByChapter,
    getVerse,
};
