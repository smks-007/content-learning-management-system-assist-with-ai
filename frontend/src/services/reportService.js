import api from '../api/axiosInstance';
export const reportService = {
  getStudentReport: () => api.get('/reports/student'),
  getCourseReport: (courseId) => api.get(`/reports/course/${courseId}`),
  getQuizReport: (quizId) => api.get(`/reports/quiz/${quizId}`),
  downloadPdf: (type, id) => api.post('/reports/pdf', { type, id }, { responseType: 'blob' }),
};
