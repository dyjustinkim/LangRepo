import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000"
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