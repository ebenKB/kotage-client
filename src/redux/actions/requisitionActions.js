/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

import { GET_REQUISITIONS, SET_LOADING } from '../types/requisitionTypes';
import Axios from '../../utils/axios/axios';

/**
 * get requisitions from the api
*/
export const getRequisitions = () => async (dispatch) => {
  try {
    setLoading(dispatch);
    // make a get request for the requisitions from the api
    const res = await fetch('/v1/requisitions');
    const data = await res.json();

    // dispatch the data to the reducer
    dispatch({
      type: GET_REQUISITIONS,
      payload: data,
    });
  } catch (error) {
    // show errors here
  }
};

/**
 *
 * @param {*} requisition the requisition that we want to create
*/
export const createRequisition = (requisition) => async () => {
  try {
    Axios.post('/1', requisition)
      .then((data) => {
      });
  } catch (error) {
    // show the error here
  }
};

export const setLoading = (dispatch) => dispatch({
  type: SET_LOADING,
});

export const setFiles = (requisition, files) => {
};
