import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000",
});

// Tasks API endpoints
export const retrieveTasks = (headers) => api.get('/tasks', { headers });
export const retrieveSpecificTask = (id, headers) => api.get(`/tasks/${id}`, { headers });
export const createTask = (taskData, headers) => api.post('/tasks', taskData, { headers });
export const updateTask = (id, updatedTask, headers) => api.put(`/tasks/${id}`, updatedTask, { headers });
export const deleteTask = (id, headers) => api.delete(`/tasks/${id}`, { headers });

// Auth API endpoints
export const login = (userData) => api.post('/auth/login', userData);
export const register = (userData) => api.post('/auth/register', userData);

export default api;
