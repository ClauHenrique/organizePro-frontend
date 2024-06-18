import axios from "axios";
// import 'dotenv/config'


console.log('process.env.API_URL');



export const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });