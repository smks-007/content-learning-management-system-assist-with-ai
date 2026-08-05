import api from '../api/axiosInstance';
export const studentService = {
  getProfile: () => api.get('/student/profile'),
  updateProfile: (data) => api.put('/student/profile', data),
  getDashboard: () => api.get('/student/dashboard'),
  getEnrollments: () => api.get('/student/enrollments'),
  getCertificates: () => api.get('/student/certificates'),
  getProgress: (courseId) => api.get(`/student/progress/${courseId}`),
  uploadAvatar: (formData) => api.post('/student/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
