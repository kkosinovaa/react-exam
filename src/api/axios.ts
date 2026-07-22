import * as axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';

const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;


export const axiosInstance = axios.create({
    'baseURL': BASE_URL,
    'headers': {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json; charset=utf-8',
    },
});