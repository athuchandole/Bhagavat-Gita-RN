import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLocalFetch(key, fetchFn, ...params) {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const cached = await AsyncStorage.getItem(key);
                if (cached) {
                    setData(JSON.parse(cached));
                    console.log(`[CACHE] Loaded from AsyncStorage: ${key}`);
                } else {
                    const result = await fetchFn(...params);
                    setData(result);
                    await AsyncStorage.setItem(key, JSON.stringify(result));
                    console.log(`[FETCH] Saved to AsyncStorage: ${key}`);
                }
            } catch (e) {
                console.error('Error in useLocalFetch:', e);
            }
        })();
    }, [key, fetchFn, ...params]);

    return data;
}
