import apiClient from './client';
export const activityApi = {
  list: (params) => apiClient.get('/activity', { params }).then((res) => res.data.data.activities),
  create: (payload) => apiClient.post('/activity', payload),
  clear: () => apiClient.delete('/activity'),
};
