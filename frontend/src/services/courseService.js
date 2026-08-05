import api from '../api/axiosInstance';

export const courseService = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getFeaturedCourses: () => api.get('/courses/featured'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  getCategories: () => api.get('/courses/categories'),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  enrollInCourse: (id) => api.post(`/courses/${id}/enroll`),
  getLessons: (courseId) => api.get(`/courses/${courseId}/lessons`),
  getStudentEnrollments: () => api.get('/student/enrollments'),
};

export default courseService;
