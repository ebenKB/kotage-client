/* eslint-disable import/prefer-default-export */
import RawAxios from 'axios';
import Axios from '../../utils/axios/axios';

import {
  CLEAR_NOTIFICATION,
  SET_APP_NOTIFICATION,
  GET_CURRENCY_OPTIONS,
  SET_ACCOUNT_TYPE,
  CACHE_FILE_BLOB,
} from '../types/appTypes';

import { createStaticFileUrl, getFileNameAndExtension, getFileSize } from '../../utils/app/file';

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

export const getCurrencyOptions = () => async (dispatch, getState) => {
  const { user } = getState();
  const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/currencies`);

  // transform the currencies into a form that can be displayed by the app dropdown
  const formatedCurrencies = data.currencies.map((c) => ({
    key: c.id,
    text: `${c.name.toUpperCase()} (${c.symbol})`,
    value: c.id,
  }));
  return dispatch({
    type: GET_CURRENCY_OPTIONS,
    payload: formatedCurrencies,
  });
};

export const setAccountType = (type) => async (dispatch) => {
  dispatch({
    type: SET_ACCOUNT_TYPE,
    payload: type,
  });
};

export const cacheFileBlob = (file) => async (dispatch) => {
  dispatch({
    type: CACHE_FILE_BLOB,
    payload: file,
  });
};

export const downloadFile = (url) => async (dispatch) => new Promise((resolve, reject) => {
  console.log('downloading the file', url);
  RawAxios({
    url,
    method: 'GET',
    responseType: 'blob',
  })
    .then((response) => {
      const fileData = {
        staticUrl: createStaticFileUrl(response.data),
        remoteUrl: url,
        fileName: getFileNameAndExtension(url),
        fileSize: getFileSize(response.data.size),
        fileType: response.data.type,
        data: response.data,
      };
      resolve(fileData);
      dispatch({
        type: CACHE_FILE_BLOB,
        payload: fileData,
      });
    })
    .catch((err) => {
      reject(err);
    });
});

// export const getFileSignedUrl = (url, objectOwnerId) => async (dispatch, getState) => new
// Promise(() => {
//   const { user } = getState();
//   Axios.post(`/v1/${user.currentUser.tenant_id}/rfp/${objectOwnerId}`, {
//     filename: getFullFilePath(url),
//   })
//     .then((data) => console.log('The is the signed url', data));
// });
