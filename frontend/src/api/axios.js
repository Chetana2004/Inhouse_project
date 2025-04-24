import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://inhouse-project-3.onrender.com',
  withCredentials: true, // if you’re using cookies for auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
