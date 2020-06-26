/* eslint-disable camelcase */
import Axios from '../../utils/axios/axios';
import { VIEW_BIDS, CREATE_BID_RESPONSE, FIND_BID_ID } from '../types/supplierTypes';
import { serializeSupplierBid, deserializeSupplierBid } from '../../serializers/supplier-serializers';

export const getAllSupplierBids = () => async (dispatch, getState) => {
  const { tenant: { currentTenant: { id } } } = getState();
  const { data } = await Axios.get(`/v1/${id}/bids/rfp`);
  if (data) {
    const { rfp_bids } = data;
    const deserialzedBids = rfp_bids.map((bid) => deserializeSupplierBid(bid));
    dispatch({
      type: VIEW_BIDS,
      payload: deserialzedBids,
    });
  }
};

export const createBid = (bid, owner_id) => async (dispatch, getState) => {
  const { tenant: { currentTenant } } = getState();
  const { data: { rfp_bid } } = await Axios
    .post(`/v1/${currentTenant.id}/bids/rfp?proposal_request_id?=${bid.rfpID}&event_owner_id=${owner_id}`, serializeSupplierBid(bid));
  dispatch({
    type: CREATE_BID_RESPONSE,
    payload: deserializeSupplierBid(rfp_bid),
  });
};

/**
 * Find a bid by ID from the cache
 * @param {*} id the id of the bid to find
 */
export const findBidByID = (id) => async (dispatch, getState) => {
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
