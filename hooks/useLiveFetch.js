import { useEffect, useState } from 'react';

export default function useLiveFetch(fetchFn, ...params) {
    const [data, setData] = useState(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            console.log('[HOOK] useLiveFetch triggered', params);
            const result = await fetchFn(...params);
            if (mounted) setData(result);
        })();
        return () => (mounted = false);
    }, [fetchFn, ...params]);

    return data;
}
