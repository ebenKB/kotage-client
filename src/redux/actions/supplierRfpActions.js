/* eslint-disable camelcase */
import Axios from '../../utils/axios/axios';
import {
  GET_SUPPLIER_RFP, CREATE_BID_RESPONSE, SET_CURRENT_SUPPLIER_RFP, FIND_SUPPLIER_EVENT_BY_ID,
} from '../types/supplierRfpTypes';

import { deserializeProposal } from '../../serializers/supplier-rfp-serializer';

// eslint-disable-next-line import/prefer-default-export
export const getSupplierRfp = (page = 1) => async (dispatch, getState) => new
Promise((resolve, reject) => {
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

export const createBidResponse = () => async (dispatch) => {
  dispatch({
    type: CREATE_BID_RESPONSE,
    payload: null,
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
