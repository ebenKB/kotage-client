import axios from 'axios';

/**
 * this is a global axios instance for the application
 * all configurations for axio should be done in this file
 */
const Axios = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {
    'content-type' : 'application/json',
  }
});

export default Axios;
