/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
import Axios from '../../utils/axios/axios';
import {
  SET_USER_LOADING, DONE_LOADING, LOGIN, GET_INVIATION, GET_TENANT_ID,
} from '../types/userTypes';

export const inviteUser = (invitation) => async (dispatch, getState) => {
  try {
    const { user } = getState();
    Axios.post(`/${user.tenant_id}/invitations`, invitation);
  } catch (error) {
    console.log('an error occurred while inviting the user...', error);
  }
};

export const createUser = (newUser, token) => async (dispatch, getState) => {
  try {
    const { user } = getState();
    dispatch(setLoading());
    const data = await Axios.post(`/${user.tenant_id}/users?token=${token}`, newUser);
    console.log('We are done posting', data);
    dispatch(doneLoading());
  } catch (error) {
    dispatch(doneLoading());
  }
};

/**
 * This functions checks if the user belongs to a tenat and then logs in the user
 * If successful, the user is saved in the state for later use
 * The token of the user is also saved in localstorage/session storage for later use
 * @param {*} email the email of the user
 * @param {*} password  the password of the user
 */
export const login = (email, password) => async (dispatch, getState) => new Promise(async (resolve, reject) => {
  try {
    dispatch(setLoading());
    // get the tenant that the user belongs to
    const { user } = getState();
    if (user.tenant_id) {
      const data = await Axios.post(`/${user.tenant_id}/users/login`, { email, password });
      dispatch(doneLoading());
      const { access_token } = data.data;
      if (access_token && access_token.length > 0) {
        dispatch(setAuthUser(access_token[0]));
        // save the user to session storage
        sessionStorage.setItem('kotage-auth', access_token[0].token);
      }
      resolve(data);
    } else {
      // There was no tenant found for the user so the user cannot login
      reject(new Error({ err: 'Tenant does exist for this user' }));
      dispatch(doneLoading());
    }
  } catch (error) {
    dispatch(doneLoading());
    reject(error);
  }
});

export const setToken = () => async () => {
  console.log('We are trying to set the token to the localhost');
};

export const setLoading = () => async (dispatch) => dispatch({
  type: SET_USER_LOADING,
});

const doneLoading = () => async (dispatch) => dispatch({
  type: DONE_LOADING,
});

const setAuthUser = (user) => async (dispatch) => dispatch({
  type: LOGIN,
  payload: user,
});

export const getUsers = () => async () => {
  try {
    console.log('We are getting all the users from the server');
    const data = await Axios.get('/1/users');
    console.log('We are done getting the RECORDS', data);
  } catch (error) {
    console.log('an error occurred');
  }
};

export const getInvitation = (token, tenant_id) => async (dispatch) => {
  console.log('We are getting invitation', token, tenant_id);
  try {
    const data = await Axios.get(`/${tenant_id}/invitations?token=${token}`);
    const { invitation } = data.data;
    return dispatch({
      type: GET_INVIATION,
      payload: invitation,
    });
  } catch (err) {
    console.log('an error occured while trying to fetch the user');
  }
};

export const getTenantID = (email) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/users/check_tenant?email=${email}`);
    return dispatch({
      type: GET_TENANT_ID,
      payload: data.tenant,
    });
  } catch (error) {
    console.log('an error occured');
  }
};
