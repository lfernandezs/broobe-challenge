import api from "./api";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const fetchMetrics = async (url: string, categories: string[], strategy: string) => {
    const response = await api.get('/', {
        params: {
            url,
            category: categories,
            strategy,
            key: API_KEY, // TODO: no pasarlo por query, sino por headers
        },
        paramsSerializer: {
            indexes: null
        }
    });
    return response.data;
};

export default fetchMetrics;