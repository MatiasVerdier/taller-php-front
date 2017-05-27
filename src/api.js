import axios from 'axios';

const API_ROOT = process.env.API_ROOT;

axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};

// Add Authorization header to all requests
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // eslint-disable-line
  return config;
}, error => Promise.reject(error));

// Authentication
const login = data => axios.post('/login', data);
const register = data => axios.post('/register', data);
const logout = () => axios.post('/logout');
const getUser = () => axios.get('/me');

// Resources
const addResource = data => axios.post('/resources', data);
const getMyResources = userid => axios.get(`/user/${userid}/resources`);
const getResource = resourceid => axios.get(`/resources/${resourceid}`);

export default {
  login,
  register,
  logout,
  getUser,
  addResource,
  getMyResources,
  getResource,
};
