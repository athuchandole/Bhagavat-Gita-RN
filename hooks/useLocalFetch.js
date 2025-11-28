import { useState, useEffect } from 'react';
import allData from '../json/alldata.json';

export default function useLocalFetch(key) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocalData = async () => {
            try {
                if (key === 'chapters') {
                    console.log('[LOCAL] getChapters from json/alldata.json');
                    setData(allData.CHAPTERS);
                } else if (key.startsWith('verses_')) {
                    const chapterId = parseInt(key.split('_')[1]);
                    console.log(`[LOCAL] getVersesByChapter chapterId=${chapterId}`);
                    const verses = allData.VERSES.find((v) => v[0].chapter_number === chapterId);
                    setData(verses || []);
                }
            } catch (error) {
                console.error('[HOOK] useLocalFetch error', error);
            } finally {
                setLoading(false);
                console.log('[HOOK] Completed fetch ->', data?.length);
            }
        };
        fetchLocalData();
    }, [key]);

    return { data, loading };
}
