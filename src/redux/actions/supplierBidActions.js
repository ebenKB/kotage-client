/* eslint-disable camelcase */
import Axios from '../../utils/axios/axios';
import { VIEW_BIDS, CREATE_BID_RESPONSE } from '../types/supplierTypes';
import { serializeSupplierBid, deserializeSupplierBid } from '../../serializers/supplier-serializers';

export const getAllSupplierBids = () => async (dispatch, getState) => {
  const { tenant: { currentTenant: { id } } } = getState();
  const { data: { rfp_bids } } = await Axios.get(`/v1/${id}/bids/rfp`);
  const deserialzedBids = rfp_bids.map((bid) => deserializeSupplierBid(bid));
  dispatch({
    type: VIEW_BIDS,
    payload: deserialzedBids,
  });
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
