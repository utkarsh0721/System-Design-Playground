import apiClient from './client';
export const designApi = {
  generate: (payload) => apiClient.post('/designs/generate', payload).then((res) => res.data.data),
  list: (params) => apiClient.get('/designs', { params }).then((res) => ({ items: res.data.data, meta: res.data.meta })),
  get: (id) => apiClient.get(`/designs/${id}`).then((res) => res.data.data.design),
  getShared: (shareId) => apiClient.get(`/designs/shared/${shareId}`).then((res) => res.data.data.design),
  update: (id, payload) => apiClient.patch(`/designs/${id}`, payload).then((res) => res.data.data.design),
  remove: (id) => apiClient.delete(`/designs/${id}`),
  duplicate: (id) => apiClient.post(`/designs/${id}/duplicate`).then((res) => res.data.data.design),
  favourite: (id, isFavourite) => apiClient.patch(`/designs/${id}/favourite`, { isFavourite }).then((res) => res.data.data.design),
  share: (id, enabled = true) => apiClient.post(`/designs/${id}/share`, { enabled }).then((res) => res.data.data),
};
