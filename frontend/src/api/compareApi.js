import apiClient from './client';
export const compareApi = { generate: (payload) => apiClient.post('/compare', payload).then((res) => res.data.data) };
