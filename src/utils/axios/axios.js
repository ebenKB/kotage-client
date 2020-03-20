import axios from 'axios';

// const getToken = () => {
//   const ktToken = localStorage.getItem('kotage-auth');
//   if (ktToken != null) {
//     const { token } = JSON.parse(ktToken);
//     return token;
//   }
//   return undefined;
// };

/**
 * this is a global axios instance for the application
 * all configurations for axio should be done in this file
 */
// const Axios = axios.create({
//   baseURL: 'https://kotage-ruby-api.herokuapp.com/api/v1',
//   timeout: 3000,
//   headers: {
//     'content-type': 'application/json',
//     mode: 'no-cors',
//     Authorization: `Bearer ${getToken()}`,
//   },
// });

// initialize axios
const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_apiHost}/${process.env.REACT_APP_apiNamespace}`,
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
    // Authorization: `Bearer ${getToken()}`,
  },
});

export default Axios;
