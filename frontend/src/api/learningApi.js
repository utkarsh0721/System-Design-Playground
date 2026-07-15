import apiClient from './client';
export const learningApi = {
  list: () => apiClient.get('/learning').then((res) => res.data.data.topics),
  get: (slug) => apiClient.get(`/learning/${slug}`).then((res) => res.data.data.topic),
};
