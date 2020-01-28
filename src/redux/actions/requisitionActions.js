import { GET_REQUISITIONS, SET_LOADING } from '../types/requisitionTypes';
import Axios from '../../utils/axios/axios';

/**
 * get requisitions from the api
*/
export const getRequisitions = () => async(dispatch) => {
  try {
    setLoading(dispatch);
    // make a get request for the requisitions from the api
    const res = await fetch('/requisitions');
    const data = await res.json();

    // dispatch the data to the reducer
    dispatch({
      type: GET_REQUISITIONS,
      payload: data
    });
  } catch (error) {
    console.log('an error occured...');
  }
}

/**
 * 
 * @param {*} requisition the requisition that we want to create
*/
export const createRequisition = (requisition) => async(dispatch) => {
  try {
    console.log('IN THE ACTIONS. TRYING TO CREATE REQUISITIONS...', requisition);
    Axios.post('/1', requisition)
    .then(data => {
      console.log('We reached the server', data);
    })
  } catch (error) {
    console.log('an error occured while creating a new requisition...');
  }
}

export const setLoading = (dispatch) => {
  return dispatch ({
    type : SET_LOADING
  })
}

export const setFiles = (requisition, files) => {
  console.log('setting the files to the requisition', requisition, files);
}