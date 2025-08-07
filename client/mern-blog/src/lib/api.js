import axios from "axios";

// Set baseURL from env or fallback
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Create Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


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

export const signup = async (formData) => {
  const response = await api.post("/auth/signup", formData); 
  return response.data;
};

export const login = async (formData) => {
  const response = await api.post("/auth/login", formData); 
  return response.data;
};

export const getMe = () => api.get("/auth/me");

export const createBug = (data) => api.post("/bugs", data);
export const getAllBugs = () => api.get("/bugs");
export const getBugById = (id) => api.get(`/bugs/${id}`);
export const updateBug = (id, data) => api.put(`/bugs/${id}`, data);
export const deleteBug = (id) => api.delete(`/bugs/${id}`);

export const getBugActivities = (bugId) => api.get(`/activities/${bugId}`);

// Default export
export default api;
