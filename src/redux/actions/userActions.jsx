/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
import Axios from '../../utils/axios/axios';
import {
  SET_USER_LOADING, DONE_LOADING, LOGIN, GET_INVIATION, GET_USERS,
  GET_TENANT_ID, CREATE_USER, MAKE_ADMIN,
} from '../types/userTypes';

/**
 * This function is used to send a new invitation to a user
 * @param {*} invitation the invitation to send to the user
 */
export const inviteUser = (invitation) => async (dispatch, getState) => {
  try {
    const { user } = getState();
    Axios.post(`/${user.currentUser.tenant_id}/invitations`, invitation);
  } catch (error) {
    console.log('an error occurred while inviting the user...', error);
  }
};

/**
 * This function creates a new user for a tenant
 * The user gets created after clicking on an invitation link
 * @param {*} newUser the user to create
 * @param {*} token the token that was sent with the invitation
 * @param {*} tenant_id the tenant who sent the invitation to the user
 */
export const createUser = (newUser, token, tenant_id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await Axios.post(`/${tenant_id}/users`, newUser);
    dispatch(doneLoading());
    return dispatch({
      type: CREATE_USER,
      payload: data.user,
    });
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
    if (user.currentUser.tenant_id) {
      const { data } = await Axios.post(`/${user.currentUser.tenant_id}/users/login`, { email, password });
      dispatch(doneLoading());
      const { access_token } = data;
      if (access_token && access_token.length > 0) {
        dispatch(setAuthUser(access_token[0]));

        // save the user to local storage
        localStorage.setItem('kotage-auth',
          JSON.stringify({
            token: access_token[0].token,
            user: access_token[0].user_id,
          }));
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

export const getUsers = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    if (user.currentUser.tenant_id) {
      const { data } = await Axios.get(`/${user.currentUser.tenant_id}/users`);
      return dispatch({
        type: GET_USERS,
        payload: data.users,
      });
    }
  } catch (error) {
    console.log('an error occurred');
  }
};

/**
 * This function retrieves an existing invitation from the api
 * @param {*} token the token that comes with the invitation
 * @param {*} tenant_id the tenant who requested the invitation
 */
export const getInvitation = (token, tenant_id) => async (dispatch) => {
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

/**
 * This function retrieves the tenant that a user belongs to using the user email
 * @param {*} email the email of the user
 */
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

/**
 * This function sets a user as an admin
 * @param {*} user the user to set as admin
 */
export const setAdminStatus = (newUser) => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const { data } = await Axios.put(`/${user.currentUser.tenant_id}/users/${newUser.id}`, newUser);
    if (data) {
      return dispatch({
        type: MAKE_ADMIN,
        payload: data.user,
      });
    }
  } catch (error) {
    console.log('an error occured while updating a user', error);
  }
};

export const sendPasswordResetToken = (email) => async (dispatch, getState) => {
  const { user } = getState();
  const { data } = await Axios.post(`/${user.currentUser.tenant_id}/users/password_reset`, { email });
  console.log('We are done posting the data', data);
};

/**
 * Reset password
 * @param {*} password the new password
 * @param {*} password_confirmation the new password confirmation
 * @param {*} token the token to be used to reset the password
 * @param {*} tenant_id the tenant that the user belongs to
 */
export const resetUserPassword = (password, password_confirmation, token, tenant_id) => async () => new Promise(async (resolve, reject) => {
  try {
    const data = await Axios.put(`/${tenant_id}/users/password_update`, { password, password_confirmation, token });
    resolve(data);
  } catch (error) {
    reject(error);
  }
});

export const refreshAuthToken = (token) => {
  // check if token is not expired, log the user in
  // if token is expired, redirect to the login
  // const { token } = localStorage.getItem('kotage-auth');
  console.log(token);
};
