import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('musify_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('musify_token');
      localStorage.removeItem('musify_user');
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// Songs
export const songsAPI = {
  getAll: (page = 1, limit = 20) => api.get(`/songs?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/songs/${id}`),
  search: (q) => api.get(`/songs/search?q=${encodeURIComponent(q)}`),
  getTrending: () => api.get('/songs/trending'),
  upload: (data) => api.post('/songs/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  like: (id) => api.post(`/songs/${id}/like`),
  recordPlay: (id) => api.post(`/songs/${id}/play`),
};

// Artists
export const artistsAPI = {
  getAll: () => api.get('/artists'),
  getById: (id) => api.get(`/artists/${id}`),
  search: (q) => api.get(`/artists/search?q=${encodeURIComponent(q)}`),
  create: (data) => api.post('/artists', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  follow: (id) => api.post(`/artists/${id}/follow`),
};

// Playlists
export const playlistsAPI = {
  getAll: () => api.get('/playlists'),
  getPublic: () => api.get('/playlists/public'),
  getById: (id) => api.get(`/playlists/${id}`),
  create: (data) => api.post('/playlists', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/playlists/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/playlists/${id}`),
  addSong: (id, songId) => api.post(`/playlists/${id}/add-song`, { songId }),
  removeSong: (id, songId) => api.delete(`/playlists/${id}/remove-song/${songId}`),
};

export default api;
