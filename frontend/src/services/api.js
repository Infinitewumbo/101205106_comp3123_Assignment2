import axios from 'axios';

const API_URL = 'https://one01205106-comp3123-assignment2.onrender.com/api/v1'; 

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = (user) => api.post('/user/login', user);
export const signup = (user) => api.post('/user/signup', user);
export const getEmployees = () => api.get('/emp/employees');
export const getEmployeeById = (id) => api.get(`/emp/employees/${id}`);
export const deleteEmployee = (id) => api.delete(`/emp/employees?eid=${id}`);
export const searchEmployees = (query) => api.get(`/emp/search?q=${query}`);

export const addEmployee = (formData) => api.post('/emp/employees', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateEmployee = (id, formData) => api.put(`/emp/employees/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;