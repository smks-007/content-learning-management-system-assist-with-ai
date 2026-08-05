import api from '../api/axiosInstance';

export const lessonService = {
  getLessonById: (id) => api.get(`/lessons/${id}`),
  createLesson: (data) => api.post('/lessons', data),
  updateLesson: (id, data) => api.put(`/lessons/${id}`, data),
  deleteLesson: (id) => api.delete(`/lessons/${id}`),
  updateProgress: (id, watchedDuration) => api.post(`/lessons/${id}/progress`, { watchedDuration }),
  uploadVideo: (id, formData) => api.post(`/lessons/${id}/upload-video`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadPdf: (id, formData) => api.post(`/lessons/${id}/upload-pdf`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default lessonService;
