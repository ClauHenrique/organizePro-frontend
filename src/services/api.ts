import axios from "axios";

// import.meta.env.VITE_API_URL

export const api = axios.create({
    baseURL: 'https://api-organize-pro.azurewebsites.net',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });