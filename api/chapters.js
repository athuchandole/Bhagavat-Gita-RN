import data from '../json/alldata.json';

const getChapters = async () => {
    console.log('[LOCAL] getChapters from json/alldata.json');

    const chapters = data.CHAPTERS || [];

    return chapters.map((ch) => ({
        ...ch,
        id: ch.chapter_number,
    }));
};

export default { getChapters };
