/* eslint-disable camelcase */
import { serializeSupplierBid } from '../../serializers/supplier-serializers';
import { deserializeProposal } from '../../serializers/supplier-rfp-serializer';
import Axios from '../../utils/axios/axios';
import {
  GET_SUPPLIER_RFP,
  CREATE_BID_RESPONSE,
  SET_CURRENT_SUPPLIER_RFP,
  GET_SUPPLIER_RFP_BY_ID,
  FIND_SUPPLIER_EVENT_BY_ID,
  CLEAR_CURRENT_RFP,
  CONFIRM_RSVP,
  REVOKE_RSVP,
  ACCEPT_RFP_TERMS,
  CHECK_SUPPLIER_CLAIMS,
  SET_SUPPLIER_LOADING,
  SET_SUPPLIER_DONE_LOADING,
} from '../types/supplierRfpTypes';

export const setLoading = () => async (dispatch) => dispatch({
  type: SET_SUPPLIER_LOADING,
});

export const setDoneLoading = () => async (dispatch) => dispatch({
  type: SET_SUPPLIER_DONE_LOADING,
});


// eslint-disable-next-line import/prefer-default-export
export const getSupplierRfp = (page = 1) => async (dispatch, getState) => new
Promise((resolve, reject) => {
  dispatch(setLoading());
  const { user } = getState();
  const promise = Axios.get(`/v1/${user.currentUser.tenant_id}/events/rfp?page=${page}`);

  promise.then((data) => {
    // deserialize the requests
    const { data: { proposal_requests, meta } } = data;
    const deserializedProposals = proposal_requests
      .map((proposal) => deserializeProposal(proposal));
    const { pagination } = meta;
    dispatch({
      type: GET_SUPPLIER_RFP,
      payload: {
        proposals: deserializedProposals,
        meta: pagination,
      },
    });
    resolve(proposal_requests);
  }).catch((error) => {
    reject(error);
  });
});

export const createBidResponse = (bid, owner_id) => async (dispatch, getState) => {
  const { tenant: { currentTenant } } = getState();

  console.log('This is the bid that we want to create', serializeSupplierBid(bid));
  const newBid = await Axios
    .post(`/v1/${currentTenant.id}/bids/rfp?proposal_request_id?=${bid.rfpID}&event_owner_id=${owner_id}`, serializeSupplierBid(bid));
  console.log('This is the request we got back', newBid);
  dispatch({
    type: CREATE_BID_RESPONSE,
    payload: newBid,
  });
};

export const setCurrentSupplierRfp = (rfp) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_SUPPLIER_RFP,
    payload: rfp,
  });
};


/**
 * find an existing proposal from the list of proposals in the cache
 * without making a newtwork request
 * @param {*} id the id of the proposal to find
 * @param return the found proposal or null if not found
 */
export const findSupplierEventByID = (id) => async (dispatch, getState) => (
  new Promise((resolve, reject) => {
    try {
      // clear the current proposal to remove the cache
      dispatch({
        type: CLEAR_CURRENT_RFP,
      });
      const { supplierRfp: { proposals } } = getState();
      const foundProposal = proposals.find((p) => p.id === parseInt(id, 10));
      if (foundProposal) {
        dispatch({
          type: FIND_SUPPLIER_EVENT_BY_ID,
          payload: foundProposal,
        });
        resolve(foundProposal);
      } else resolve(null);
    } catch (error) {
      reject(error);
    }
  })
);

export const getSupplierRfpByID = (id) => async (dispatch, getState) => (
  new Promise((resolve, reject) => {
    try {
      const { user, tenant: { currentTenant } } = getState();
      const promise = Axios
        .get(`/v1/${user.currentUser.tenant_id}/events/rfp?proposal_request_id=${id}&tenant_id=${currentTenant.id}`);
      promise.then((data) => {
        const { data: { proposal_request } } = data;
        dispatch({
          type: GET_SUPPLIER_RFP_BY_ID,
          payload: deserializeProposal(proposal_request),
        });
        resolve(proposal_request);
      });
    } catch (error) {
      // do something here
      reject(error);
    }
  })
);

/**
 * allow suppliers to confirm their RSVP on proposals that they have been invited to.
 */
export const confirmRSVP = (status) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { tenant: { currentTenant: { id } }, supplierRfp: { currentProposal } } = getState();
    const { tenant } = currentProposal;
    await Axios
      .post(`/v1/${id}/claims/rfp?proposal_request_id=${currentProposal.id}&event_owner_id=${tenant.id}`);
    if (status) {
      dispatch({
        type: CONFIRM_RSVP,
      });
    } else {
      dispatch({
        type: REVOKE_RSVP,
      });
    }
    dispatch(setDoneLoading());
  } catch (error) {
    console.log('An error ocurred while sending the rsvp', error);
  }
};

export const acceptRfpTerms = (status) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { tenant: { currentTenant: { id } }, supplierRfp: { currentProposal } } = getState();
    const { tenant } = currentProposal;
    await Axios
      .post(`/v1/${id}/claims/rfp?proposal_request_id=${currentProposal.id}&event_owner_id=${tenant.id}`,
        { agreed_to_participate: status });
    dispatch({
      type: ACCEPT_RFP_TERMS,
    });
    dispatch(setDoneLoading());
  } catch (error) {
    console.log('An error ocurred while sending the rsvp', error);
  }
};

// check whether the supply has send an RSVP or has agreed to the terms and conditions of the bid
export const checkSupplierRfpClaims = () => async (dispatch, getState) => {
  try {
    const { tenant: { currentTenant: { id } }, supplierRfp: { currentProposal } } = getState();
    const { tenant } = currentProposal;
    const { data } = await Axios
      .get(`/v1/${id}/claims/rfp?proposal_request_id=${currentProposal.id}&event_owner_id=${tenant.id}`);
    dispatch({
      type: CHECK_SUPPLIER_CLAIMS,
      payload: data.rfp_claim,
    });
  } catch (error) {
    console.log('An error ocurred while sending the rsvp', error);
  }
};
