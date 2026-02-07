import axios, { AxiosError } from "axios";
import { store } from "../app/store";
import { authActions } from "../features/auth/slice";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.token || localStorage.getItem("token");
    if (token) config.headers.Authorization = `Token ${token}`; // DRF token auth
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err: AxiosError<any>) => {
        const status = err.response?.status;

        if (status === 401) {
            store.dispatch(authActions.logout());
        }

        // normalize DRF errors into { normalized: { message, fieldErrors } }
        const data = err.response?.data;
        const normalized = {
            message: typeof data === "string" ? data : "Request failed.",
            fieldErrors: typeof data === "object" && data ? data : undefined,
        };

        (err as any).normalized = normalized;
        return Promise.reject(err);
    }
);

const client = {
    request: (opts: { method: string; url: string; params?: any; data?: any }) =>
        api.request(opts),
};

export default client;