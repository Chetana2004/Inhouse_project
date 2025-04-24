import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // if you’re using cookies for auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
