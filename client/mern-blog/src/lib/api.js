import axios from "axios";

// Create base Axios instance
const api = axios.create({
  baseURL:"http://localhost:3000/api",
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

//
// ===== Auth Routes =====
//

// Login
export const login = (data) => api.post("/auth/login", data);

// Signup
export const signup = (data) => api.post("/auth/signup", data);

// Get current user profile
export const getProfile = () => api.get("/auth/me");

//
// ===== Bug Routes =====
//

// Create bug
export const createBug = (data) => api.post("/bugs", data);

// Get all bugs
export const getAllBugs = () => api.get("/bugs");

// Get single bug by ID
export const getBugById = (id) => api.get(`/bugs/${id}`);

// Update bug
export const updateBug = (id, data) => api.put(`/bugs/${id}`, data);

// Delete bug
export const deleteBug = (id) => api.delete(`/bugs/${id}`);

//
// ===== Comment Routes =====
//

// Get comments for a bug
export const getComments = (bugId) => api.get(`/comments/${bugId}`);

// Add comment
export const addComment = (bugId, text) => api.post(`/comments/${bugId}`, { text });

// Delete comment
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);

//
// ===== Activity Logs =====
//

// Get activity logs for a bug
export const getBugActivities = (bugId) => api.get(`/activities/${bugId}`);

export default api;
