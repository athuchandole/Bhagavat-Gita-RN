import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLocalFetch(key, fetchFunction) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            console.log(`[FETCH] useLocalFetch started for key: ${key}`);

            try {
                const localData = await AsyncStorage.getItem(key);
                if (localData) {
                    console.log(`[LOCAL] Found data in AsyncStorage for key: ${key}`);
                    setData(JSON.parse(localData));
                    return;
                } else {
                    console.log(`[LOCAL] No local data found for key: ${key}`);
                }

                const remoteData = await fetchFunction();
                if (remoteData && remoteData.length > 0) {
                    console.log(`[API] Fetched data from API for key: ${key}`);
                    await AsyncStorage.setItem(key, JSON.stringify(remoteData));
                    console.log(`[STORAGE] Saved API data to AsyncStorage for key: ${key}`);
                    setData(remoteData);
                } else {
                    console.log(`[API] No data returned from API for key: ${key}`);
                    setData([]);
                }

            } catch (error) {
                console.error(`[ERROR] useLocalFetch error for key: ${key}`, error);
                setData([]);
            }
        };

        loadData();
    }, [key, fetchFunction]);

    return data;
}
