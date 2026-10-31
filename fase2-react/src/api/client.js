import axios from "axios";

export const CLAVE_TOKEN = "token";

export function agregarToken(config) {
    const token = localStorage.getItem(CLAVE_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}

const clienteApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "",
});

clienteApi.interceptors.request.use(agregarToken);

export default clienteApi;
