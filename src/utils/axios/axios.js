/* eslint-disable no-param-reassign */
import axios from 'axios';
import { LOGOUT } from '../../redux/types/userTypes';
import { getToken } from '../app/index';
import { store } from '../../redux/store';

// initialize axios
const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_apiHost}/${process.env.REACT_APP_apiNamespace}`,
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
  },
});

Axios.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: getToken() };
  return config;
}, (error) => Promise.reject(error));

Axios.interceptors.response.use((response) => response, (err) => {
  const { response } = err;
  if (response) {
    const { status } = response;
    // force users to login when their token is not valid or expired or not present
    if (status === 401) {
      return store.dispatch({
        type: LOGOUT,
      });
    }
  }

  return Promise.reject(err);
});

export default Axios;
