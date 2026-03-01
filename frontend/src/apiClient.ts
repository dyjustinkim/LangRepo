import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

export const authApi = {
  get: async (endpoint: string, getToken: () => Promise<string>) => {
    const token = await getToken();
    return api.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
  },
  post: async (endpoint: string, data: any, getToken: () => Promise<string>) => {
    const token = await getToken();
    return api.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
  },
};


export default authApi;