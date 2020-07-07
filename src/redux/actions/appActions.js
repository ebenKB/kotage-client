/* eslint-disable camelcase */
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
import { setSendUserFeedackLoading, setSendUserFeedbackDoneLoading } from './ui';

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

export const cacheFileBlob = (file) => async (dispatch, getState) => {
  // check if the file is not already cached
  const { app: { files } } = getState();
  const existing = files.find((f) => f.remoteUrl.split('?')[0] === file.remoteUrl.split('?')[0]);
  if (!existing) {
    dispatch({
      type: CACHE_FILE_BLOB,
      payload: file,
    });
  }
};

export const downloadFile = (url) => async (dispatch, getState) => new
Promise((resolve, reject) => {
  // check if the file is available in the cache
  const { app: { files } } = getState();
  const file = files.find((f) => f.remoteUrl.split('?')[0] === url.split('?')[0]);
  if (file) {
    resolve(file);
  } else {
    // continue to download the file
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
        dispatch(cacheFileBlob(fileData));
      })
      .catch((err) => {
        reject(err);
      });
  }
});

export const sendUserFeedback = (content) => async (dispatch, getState) => {
  console.log('We are about to send user feedback here');
  try {
    dispatch(setSendUserFeedackLoading());
    const { user: { currentUser: { tenant_id } } } = getState();
    const { data } = await Axios.post(`/v1/${tenant_id}/feedbacks`, { content });
    console.log('We sent a feedbck', data);
    dispatch(setSendUserFeedbackDoneLoading());
  } catch (error) {
    console.log('an error occured while sending the feedback', error);
  }
};
