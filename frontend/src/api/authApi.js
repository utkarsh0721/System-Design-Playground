import apiClient from './client';
export const authApi = {
  register: (payload) => apiClient.post('/auth/register', payload).then((res) => res.data.data),
  login: (payload) => apiClient.post('/auth/login', payload).then((res) => res.data.data),
  me: () => apiClient.get('/auth/me').then((res) => res.data.data),
  logout: () => apiClient.post('/auth/logout'),
  updateProfile: (payload) => apiClient.patch('/users/profile', payload).then((res) => res.data.data),
};
