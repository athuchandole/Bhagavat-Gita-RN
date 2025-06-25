import { create } from 'apisauce';

let apiClient = null;

export const getApiClient = () => {
    if (!apiClient) {
        console.log('[INIT] API client created');
        apiClient = create({
            baseURL: 'https://bhagavad-gita3.p.rapidapi.com/v2',
            headers: {
                'X-RapidAPI-Key': '92bcf7436bmsh35749d31a7c3038p193006jsn4c268bb7b783',
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
            },
        });
    }
    return apiClient;
};