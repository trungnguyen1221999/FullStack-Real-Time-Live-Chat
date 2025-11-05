import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//gan access token vao header 
api.interceptors.request.use((config => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}));

export default api;

