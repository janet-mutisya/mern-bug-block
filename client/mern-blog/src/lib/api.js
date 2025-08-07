import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ===== Request Interceptor (adds token to headers) =====
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Fixed syntax
  }
  return config;
});

// ===== Response Interceptor (handles 401 errors globally) =====
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

// ===== Auth Routes =====
export const signup = async (formData) => {
  const response = await axios.post("/api/auth/signup", formData);
  return response.data; 
};

export const login = async (formData) => {
  const response = await axios.post("/api/auth/login", formData);
  return response.data;
};

export const getMe = () => api.get("/auth/me");

// ===== Bug Routes =====
export const createBug = (data) => api.post("/bugs", data);
export const getAllBugs = () => api.get("/bugs");
export const getBugById = (id) => api.get(`/bugs/${id}`);              
export const updateBug = (id, data) => api.put(`/bugs/${id}`, data); 
export const deleteBug = (id) => api.delete(`/bugs/${id}`);            

// ===== Comment Routes =====
export const getComments = (bugId) => api.get(`/comments/${bugId}`);           
export const addComment = (bugId, text) => api.post(`/comments/${bugId}`, { text }); 
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);    

// ===== Activity Logs =====
export const getBugActivities = (bugId) => api.get(`/activities/${bugId}`);    

export default api;
