/* eslint-disable camelcase */
import { deserializeProposal } from '../../serializers/supplier-rfp-serializer';
import Axios from '../../utils/axios/axios';
import {
  GET_SUPPLIER_RFP,
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
} from '../types/supplierTypes';

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
    return dispatch(setDoneLoading());
  }).catch((error) => {
    reject(error);
  });
});

export const setCurrentSupplierRfp = (rfp) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_SUPPLIER_RFP,
    payload: rfp,
  });
};

export const getSupplierRfpByID = (id) => async (dispatch, getState) => (
  new Promise((resolve, reject) => {
    try {
      dispatch(setLoading());
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
        return dispatch(setDoneLoading());
      });
    } catch (error) {
      // do something here
      reject(error);
    }
  })
);

/**
 * find an existing proposal from the list of proposals in the cache
 * if the proposal is not found in the cache, get the proposal from the api
 * without making a newtwork request
 * @param {*} id the id of the proposal to find
 * @param return the found proposal or null if not found
 */
export const findSupplierEventByID = (id) => async (dispatch, getState) => (
  new Promise((resolve, reject) => {
    try {
      dispatch(setLoading());
      dispatch({ type: CLEAR_CURRENT_RFP });
      const { supplierRfp: { proposals } } = getState();
      const foundProposal = proposals.find((p) => p.id === parseInt(id, 10));
      if (foundProposal) {
        dispatch({
          type: FIND_SUPPLIER_EVENT_BY_ID,
          payload: foundProposal,
        });
        resolve(foundProposal);
      } else {
        // if the rfp is not found in the cache, query from the api
        getSupplierRfpByID(id)
          .then((rfp) => resolve(rfp));
        dispatch(setDoneLoading());
      }
    } catch (error) {
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
    if (status) {
      await Axios
        .post(`/v1/${id}/claims/rfp?proposal_request_id=${currentProposal.id}&event_owner_id=${tenant.id}`);
      dispatch({
        type: CONFIRM_RSVP,
      });
    } else {
      await Axios
        .post(`/v1/${id}/claims/rfp?proposal_request_id=${currentProposal.id}&event_owner_id=${tenant.id}`,
          { agreed_to_participate: status });

      dispatch({
        type: REVOKE_RSVP,
      });
    }
    dispatch(setDoneLoading());
  } catch (error) {
    console.log('An error ocurred while sending the rsvp', error);
  }
};

export const acceptRfpTerms = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { tenant: { currentTenant: { id } }, supplierRfp: { currentProposal } } = getState();
    const { tenant } = currentProposal;
    await Axios
      .post(`/v1/${id}/claims/rfp?proposal_request_id=${currentProposal.id}&event_owner_id=${tenant.id}`,
        { agreed_to_participate: true });

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
