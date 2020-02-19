/* eslint-disable import/prefer-default-export */
import { CLEAR_NOTIFICATION, SET_APP_NOTIFICATION } from '../types/appTypes';

// clear notification from the app state
export const clearNotification = () => async (dispatch) => (
  dispatch({
    type: CLEAR_NOTIFICATION,
  })
);

// set notification to the app state
export const setNotification = (notification) => async (dispatch) => dispatch({
  type: SET_APP_NOTIFICATION,
  payload: notification,
});
