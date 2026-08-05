import api from '../api/axiosInstance';
export const paymentService = {
  createPayment: (data) => api.post('/payment/create', data),
  getHistory: () => api.get('/payment/history'),
};
