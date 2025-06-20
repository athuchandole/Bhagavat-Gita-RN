import api from './api';

const getChapters = async () => {
    const response = await api.get('/chapters/');
    return response.ok ? response.data : [];
};

export default { getChapters };
