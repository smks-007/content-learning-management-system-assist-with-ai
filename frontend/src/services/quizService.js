import api from '../api/axiosInstance';
export const quizService = {
  getQuizzes: (courseId) => api.get('/quizzes', { params: { courseId } }),
  getQuizById: (id) => api.get(`/quizzes/${id}`),
  startQuiz: (quizId) => api.post(`/quizzes/${quizId}/start`),
  submitQuiz: (data) => api.post('/quizzes/submit', data),
  getResults: (attemptId) => api.get(`/quizzes/results/${attemptId}`),
  getLeaderboard: (quizId) => api.get(`/quizzes/leaderboard/${quizId}`),
  createQuiz: (data) => api.post('/quizzes', data),
};
