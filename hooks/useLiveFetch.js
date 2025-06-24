import { useEffect, useState } from 'react';

export default function useLiveFetch(fetchFn, ...params) {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log('[HOOK] useLiveFetch triggered with params:', params);
        (async () => {
            const result = await fetchFn(...params);
            console.log('HOOK RESULT Here');
            setData(result);
        })();
    }, [fetchFn, ...params]);

    return data;
}