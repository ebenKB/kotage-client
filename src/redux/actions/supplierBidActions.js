/* eslint-disable camelcase */
import Axios from '../../utils/axios/axios';
import {
  VIEW_BIDS,
  CREATE_BID_RESPONSE,
  FIND_BID_ID,
  CLEAR_CURRENT_BID,
  REVISE_EXISTING_BID,
  DELETE_BID,
  SET_LOADING,
  DONE_LOADING,
} from '../types/supplierTypes';

import { setBidLoading, bidDoneLoading } from './ui';
import {
  serializeSupplierBid,
  deserializeSupplierBid,
} from '../../serializers/supplier-serializers';

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

export const doneLoading = () => async (dispatch) => {
  dispatch({
    type: DONE_LOADING,
  });
};

/**
 * get all suppliers from the api
 */
export const getAllSupplierBids = () => async (dispatch, getState) => {
  try {
    dispatch(setBidLoading());
    const { tenant: { currentTenant: { id } } } = getState();
    const { data } = await Axios.get(`/v1/${id}/bids/rfp`);
    if (data) {
      const { rfp_bids } = data;
      const deserialzedBids = rfp_bids.map((bid) => deserializeSupplierBid(bid));
      dispatch({
        type: VIEW_BIDS,
        payload: deserialzedBids,
      });
      dispatch(bidDoneLoading());
    }
  } catch (error) {
    dispatch(bidDoneLoading());
  }
};

/**
 * create a new bid
 * @param {*} bid the new bid to create
 * @param {*} owner_id the one who owns the bid
 */
export const createBid = (bid, owner_id) => async (dispatch, getState) => {
  const { tenant: { currentTenant } } = getState();
  const { data: { rfp_bid } } = await Axios
    .post(`/v1/${currentTenant.id}/bids/rfp?proposal_request_id=${bid.rfpID}&event_owner_id=${owner_id}`, serializeSupplierBid(bid));
  dispatch({
    type: CREATE_BID_RESPONSE,
    payload: deserializeSupplierBid(rfp_bid),
  });
};

/**
 * make changes to an existing bid
 * @param {*} bid the bid to update
 * @param {*} owner_id the owner of the bid
 */
export const reviseExistingBid = (bid, owner_id) => async (dispatch, getState) => {
  console.log('this is the bid', bid);
  const { tenant: { currentTenant } } = getState();
  const { data: { rfp_bid } } = await Axios
    .put(`/v1/${currentTenant.id}/bids/${bid.id}?proposal_request_id=${bid.rfpID}&event_owner_id=${owner_id}`, serializeSupplierBid(bid));
  dispatch({
    type: REVISE_EXISTING_BID,
    payload: deserializeSupplierBid(rfp_bid),
  });
};

export const deleteBid = (bidID, rfpID, owner_id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading);
    const { tenant: { currentTenant: { id } } } = getState();
    await Axios
      .delete(`/v1/${id}/bids/${bidID}?proposal_request_id=${rfpID}&event_owner_id=${owner_id}&type=forever`);
    dispatch({
      type: DELETE_BID,
      payload: bidID,
    });
  } catch (error) {
    dispatch(doneLoading());
  }
};

export const clearCurrentBid = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_BID,
  });
};

/**
 * Find a bid by ID from the cache
 * @param {*} id the id of the bid to find
 */
export const findBidByID = (id) => async (dispatch, getState) => {
  dispatch(clearCurrentBid());
  const { supplierBids: { bids } } = getState();
  const foundBid = bids.find((bid) => bid.id === parseInt(id, 10));
  if (foundBid) {
    dispatch({
      type: FIND_BID_ID,
      payload: foundBid,
    });
  }
};

/**
 * Find a bid by ID from the api
 * @param {*} id the id of the bid to find
 */
// export const getBidByID = (id) => async (dispatch) => {
//   console.log('This is the ID', id);
// };
