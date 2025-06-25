import { getApiClient } from './api';

const getChapters = async () => {
    console.log('[FETCH] getChapters called');
    const response = await getApiClient().get('/chapters/');
    console.log('[RESPONSE] getChapters status:', response.ok);
    return response.ok ? response.data : [];
};

export default { getChapters };
