/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from '../app/index';

// initialize axios
const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_apiHost}/${process.env.REACT_APP_apiNamespace}`,
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
  },
});

Axios.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: getToken() };
  return config;
}, (error) => Promise.reject(error));

export default Axios;
