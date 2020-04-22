/* eslint-disable import/prefer-default-export */
// import Axios from '../../utils/axios/axios';
import { CLEAR_NOTIFICATION, SET_APP_NOTIFICATION } from '../types/appTypes';
// import { getFullFilePath } from '../../utils/app/file';

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

// export const downloadFile = (url) => (dispatch) => new Promise((resolve) => {
//   Axios({
//     url,
//     method: 'GET',
//     responseType: 'blob',
//   })
//     .then((response) => {
//       resolve(response);
//       dispatch({ type: DOWNLOAD_FILE });
//     })
//     .catch((err) => console.log('an error occured while', err));
// });

// export const getFileSignedUrl = (url, objectOwnerId) => async (dispatch, getState) => new
// Promise(() => {
//   const { user } = getState();
//   Axios.post(`/v1/${user.currentUser.tenant_id}/rfp/${objectOwnerId}`, {
//     filename: getFullFilePath(url),
//   })
//     .then((data) => console.log('The is the signed url', data));
// });
