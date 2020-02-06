import Axios from '../../utils/axios/axios';
import { SET_USER_LOADING, DONE_LOADING, LOGIN } from '../types/userTypes';

export const inviteUser = (invitation) => async(dispatch) => {
  try {
    Axios.post('/1/invitations', invitation)
  } catch (error) {
    console.log('an error occurred while inviting the user...');
  }
}

export const login = (email,password) => async(dispatch) => {
  try {
    dispatch(setLoading());
    const data = await Axios.post('/1/users/login', {email, password});
    dispatch(doneLoading());
    const {access_token} = data.data;
    dispatch(setAuthUser(access_token[0]));

    // save the user to session storage
    console.log(access_token[0])
    sessionStorage.setItem('kotage-auth', access_token[0].token)
  } catch (error) {
    console.log('an error occured while trying to login', error);
  }
}

export const setToken =(token) => async(dispatch) => {
  console.log('We are trying to set the token to the localhost')
}

export const setLoading = () => async(dispatch) => {
  return dispatch({
    type: SET_USER_LOADING
  });
}

const doneLoading = () => async(dispatch) => {
  return dispatch({
    type: DONE_LOADING
  });
}

const setAuthUser = (user) => async(dispatch) => {
  return dispatch({
    type: LOGIN,
    payload: user
  })
}

export const getUsers = () => async(dispatch) => {
  try {
    console.log("We are getting all the users from the server");
    const data = await Axios.get('/1/users');
    console.log("We are done getting the RECORDS", data);
  } catch (error) {
    console.log('an error occurred');
  }
}
