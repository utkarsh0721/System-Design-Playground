import apiClient from './client';
export const quizApi = {
  get: (difficulty, count = 4) => apiClient.get('/quizzes', { params: { difficulty, count } }).then((res) => res.data.data),
  submit: (payload) => apiClient.post('/quizzes/submit', payload).then((res) => res.data.data),
  leaderboard: () => apiClient.get('/quizzes/leaderboard').then((res) => res.data.data.leaderboard),
  attempts: () => apiClient.get('/quizzes/attempts').then((res) => res.data.data.attempts),
};
