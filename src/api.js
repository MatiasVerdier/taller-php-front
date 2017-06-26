import axios from 'axios';

const API_ROOT = process.env.API_ROOT;
const METADATA_API = process.env.METADATA_API;

const axiosMeta = axios.create({
  baseURL: METADATA_API,
});

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
const getResources = () => axios.get('/resources');
const addResource = data => axios.post('/resources', data);
const getMyResources = userid => axios.get(`/user/${userid}/resources`);
const getResource = resourceid => axios.get(`/resources/${resourceid}`);
const updateResource = data => axios.put(`/resources/${data.id}`, data);

// Get link metadata
const getLinkMetadata = linkUrl => axiosMeta.post('/', {
  url: linkUrl,
});

// Get user profile
const getUserProfile = () => axios.get('/profile');

// Get defferent user info
const getPublicUserInfo = userId => axios.get(`/users/${userId}/info`);

const updateResourceMetadata = (id, data) => axios.put(`/resources/metadata/${id}`, data);

export default {
  login,
  register,
  logout,
  getUser,
  addResource,
  getResources,
  getMyResources,
  getResource,
  updateResource,
  getLinkMetadata,
  updateResourceMetadata,
  getUserProfile,
  getPublicUserInfo,
};
