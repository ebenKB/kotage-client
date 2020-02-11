import axios from 'axios';

/**
 * this is a global axios instance for the application
 * all configurations for axio should be done in this file
 */

const Axios = axios.create({
  baseURL: 'https://kotage-ruby-api.herokuapp.com/api/v1',
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
    mode: 'no-cors',
    Authorization: `Bearer ${sessionStorage.getItem('kotage-auth')}`,
  },
});


export default Axios;
