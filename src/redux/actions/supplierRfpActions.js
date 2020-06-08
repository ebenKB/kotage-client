import Axios from '../../utils/axios/axios';
import { GET_SUPPLIER_RFP, CREATE_BID_RESPONSE, SET_CURRENT_SUPPLIER_RFP } from '../types/supplierRfpTypes';

// eslint-disable-next-line import/prefer-default-export
export const getSupplierRfp = (page) => async (dispatch, getState) => {
  console.log('we are fetching records for ', page);
  try {
    const { user } = getState();
    console.log('This is the user making the request', user);
    const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/events/rfp`);
    dispatch({
      type: GET_SUPPLIER_RFP,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createBidResponse = () => async (dispatch) => {
  console.log('We want to create bid response');
  dispatch({
    type: CREATE_BID_RESPONSE,
    payload: null,
  });
};

export const setCurrentSupplierRfp = (rfp) => async (dispatch) => {
  console.log('This is the rfp that we want to set', rfp);
  dispatch({
    type: SET_CURRENT_SUPPLIER_RFP,
    payload: null,
  });
};
