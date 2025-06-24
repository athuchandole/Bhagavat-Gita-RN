import api from './api';

const getChapters = async () => {
    console.log('[FETCH] getChapters called');
    const response = await api.get('/chapters/');
    console.log('[RESPONSE] getChapters:', response.ok);
    return response.ok ? response.data : [];
};

export default { getChapters };
