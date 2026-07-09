import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({

    baseURL: VITE_BASE_URL,

});
 
api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

export default api;