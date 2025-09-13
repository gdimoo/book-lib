import axios from 'axios';
export const api = axios.create({ baseURL: '/api' });

export function attachToken(token: string | null) {
  api.interceptors.request.clear();
  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
