import axios from "axios";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // or "token"
    if (token) {
        // swap Bearer/Token depending on your auth style
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
