import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vintra_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for handling common errors
api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      localStorage.removeItem('vintra_token');
      localStorage.removeItem('vintra_user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Patient API endpoints
export const patientsApi = {
  getAll: () => api.get('/pacientes'),
  getById: (id) => api.get(`/pacientes/${id}`),
  create: (data) => api.post('/pacientes', data),
  update: (id, data) => api.put(`/pacientes/${id}`, data),
  delete: (id) => api.delete(`/pacientes/${id}`),
};

// Session API endpoints
export const sessionsApi = {
  getByPatientId: (patientId) => api.get(`/sessoes/${patientId}`),
  getById: (id) => api.get(`/sessoes/${id}`),
  create: (data) => api.post('/sessoes', data),
  analyze: (sessaoId, data) => api.post(`/vintra/analisar/${sessaoId}`, data),
  getAnalysis: (sessaoId) => api.get(`/vintra/analise/${sessaoId}`),
  generateDocument: (sessaoId, type) => api.post(`/documentos/gerar/${sessaoId}/${type}`),
};