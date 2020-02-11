/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
import Axios from '../../utils/axios/axios';
import {
  SET_USER_LOADING, DONE_LOADING, LOGIN, GET_INVIATION,
} from '../types/userTypes';

export const inviteUser = (invitation) => async () => {
  try {
    Axios.post('/1/invitations', invitation);
  } catch (error) {
    console.log('an error occurred while inviting the user...');
  }
};

export const createUser = (user, token) => async (dispatch) => {
  try {
    console.log('We want to create a new user', user);
    dispatch(setLoading());
    const data = await Axios.post(`/1/users?token=${token}`, user);
    console.log('We are done posting', data);
    dispatch(doneLoading());
  } catch (error) {
    dispatch(doneLoading());
  }
};

export const login = (email, password) => async (dispatch) => new Promise(async (resolve, reject) => {
  try {
    dispatch(setLoading());
    const data = await Axios.post('/1/users/login', { email, password });
    dispatch(doneLoading());
    const { access_token } = data.data;
    dispatch(setAuthUser(access_token[0]));

    // save the user to session storage
    sessionStorage.setItem('kotage-auth', access_token[0].token);
    resolve(data);
    // return data;
  } catch (error) {
    console.log('an error occured while trying to login', error);
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

export const getInvitation = (token) => async (dispatch) => {
  try {
    console.log('getting the invitation', token);
    const data = await Axios.get(`/1/invitations?token=${token}`);
    const { invitation } = data.data;
    console.log('We are done getting the invation', invitation);
    return dispatch({
      type: GET_INVIATION,
      payload: invitation,
    });
  } catch (err) {
    console.log('an error occured while trying to fetch the user');
  }
};
