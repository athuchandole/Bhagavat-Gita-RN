import { useEffect, useState } from 'react';
import { loadData, saveData } from '../storage/database';

const useFetchData = (key, fetchFunc, ...fetchArgs) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const cached = await loadData(key);
            if (cached) {
                setData(cached);
            }

            const fetched = await fetchFunc(...fetchArgs);
            if (fetched) {
                setData(fetched);
                saveData(key, fetched);
            }
        };

        load();
    }, [key]);

    return data;
};

export default useFetchData;
