/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import { CLEAR_NOTIFICATION, SET_APP_NOTIFICATION, DOWNLOAD_FILE } from '../types/appTypes';

// clear notification from the app state
export const clearNotification = () => async (dispatch) => new Promise((resolve) => {
  dispatch({
    type: CLEAR_NOTIFICATION,
  });
  resolve(true);
});

// // set notification to the app state
// export const setNotification = (notification) => async (dispatch) => dispatch({
//   type: SET_APP_NOTIFICATION,
//   payload: notification,
// });

// set notification to the app state
export const setNotification = (notification, type) => async (dispatch) => dispatch({
  type: SET_APP_NOTIFICATION,
  payload: {
    type: `${type}`,
    notification,
  },
});

export const downloadFile = (url) => (dispatch) => new Promise((resolve) => {
  Axios({
    url,
    method: 'GET',
    responseType: 'blob',
  })
    .then((response) => {
      resolve(response);
      dispatch({ type: DOWNLOAD_FILE });
    })
    .catch((err) => console.log('an error occured while', err));
});
