import api from '../api/axiosInstance';

export const aiService = {
  chat: (data) => api.post('/ai/chat', data),
  summarize: (data) => api.post('/ai/summarize', data),
  explain: (data) => api.post('/ai/explain', data),
  translate: (data) => api.post('/ai/translate', data),
  generateFlashcards: (data) => api.post('/ai/flashcards', data),
  generateQuiz: (data) => api.post('/ai/quiz', data),
  getRecommendations: () => api.get('/ai/recommend'),
  generateStudyPlan: (data) => api.post('/ai/study-plan', data),
  reviewCode: (data) => api.post('/ai/code-review', data),
  debugCode: (data) => api.post('/ai/debug', data),
  explainCode: (data) => api.post('/ai/explain-code', data),
  generateNotes: (data) => api.post('/ai/notes', data),
  search: (data) => api.post('/ai/search', data),
  getHistory: () => api.get('/ai/history'),
};

export default aiService;
