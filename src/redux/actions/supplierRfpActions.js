/* eslint-disable camelcase */
import Axios from '../../utils/axios/axios';
import { deSerializeRfpSupplierInbox } from '../../serializers/supplier-serializers';
import { deserializeProposal } from '../../serializers/supplier-rfp-serializer';
import {
  transformBidRecentActivity,
  transformSupplierRfpAnalytics,
} from '../../transform/supplier-transforms';
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
  GET_RECENT_ACTIVITIES,
  GET_SUPPLIER_RFP_ANALYTICS,
  GET_PROPOSALS_CLOSING_SOON,
  GET_RSVP_CLOSING_SOON,
  GET_SUPPLIER_RFP_INBOX,
  FIND_SUPPLIER_RFP_MESSAGE_BY_ID,
  GET_SUPPLIER_SENT_MESSAGES,
  CREATE_SUPPLIER_RFP_MESSAGE,
  // SET_CURRENT_SUPPLIER_INBOX,
  // SET_CURRENT_SUPPLIER_OUTBOX,
} from '../types/supplierTypes';

import {
  setAnalyticsLoading,
  setAnalyticsDoneLoading,
  supplierRfpClosingDoneloading,
  setRSVPClosingLoading,
  supplierRfpClosingLoading,
  RSVPClosingDoneLoading,
} from './ui';

export const setLoading = () => async (dispatch) => dispatch({
  type: SET_SUPPLIER_LOADING,
});

export const setDoneLoading = () => async (dispatch) => dispatch({
  type: SET_SUPPLIER_DONE_LOADING,
});

/**
 * Get events that a supplier has been invited to
 * @param {*} page the current page that is being fetched
 */
// eslint-disable-next-line
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
    return dispatch(setDoneLoading());
  });
});

// set the current rfp as the one being viewed
export const setCurrentSupplierRfp = (rfp) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_SUPPLIER_RFP,
    payload: rfp,
  });
};

/**
 * Get the details of an event that a supplier has been invited to
 * @param {*} rfpID the ID of the rfp event
 * @param {*} rfpOwnerID the ID of the tenant/account that created the rfp
 */
export const getSupplierRfpByID = (rfpID, rfpOwnerID) => async (dispatch, getState) => (
  new Promise((resolve, reject) => {
    try {
      dispatch(setLoading());
      const { user } = getState();
      const promise = Axios
        .get(`/v1/${user.currentUser.tenant_id}/events/rfp?proposal_request_id=${rfpID}&event_owner_id=${rfpOwnerID}`);
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
      dispatch(setDoneLoading());
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
export const findSupplierEventByID = (id, event_owner_id) => async (dispatch, getState) => (
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
        dispatch(setDoneLoading());
        resolve(foundProposal);
      } else {
        // if the rfp is not found in the cache, query from the api
        dispatch(getSupplierRfpByID(id, event_owner_id));
        dispatch(setDoneLoading());
      }
    } catch (error) {
      dispatch(setDoneLoading());
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
    dispatch(setDoneLoading());
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

export const getRecentActivities = (page) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { tenant: { currentTenant } } = getState();
    const { data } = await Axios.get(`/v1/${currentTenant.id}/activities?page=${page}`);
    const activities = data['public_activity/activities'];
    const meta = data.meta.pagination;
    const newData = activities.map((activity) => transformBidRecentActivity(activity));
    dispatch({
      type: GET_RECENT_ACTIVITIES,
      payload: {
        data: newData,
        meta,
      },
    });
    dispatch(setDoneLoading());
  } catch (error) {
    dispatch(setDoneLoading());
  }
};

export const getSupplierRfpAnalytics = () => async (dispatch, getState) => {
  try {
    dispatch(setAnalyticsLoading());
    const { tenant: { currentTenant: { id } } } = getState();
    const { data: { rfp_analytics } } = await Axios.get(`/v1/${id}/events/rfp/analytics`);
    dispatch({
      type: GET_SUPPLIER_RFP_ANALYTICS,
      payload: transformSupplierRfpAnalytics(rfp_analytics[0]),
    });
    dispatch(setAnalyticsDoneLoading());
  } catch (error) {
    dispatch(setAnalyticsDoneLoading());
  }
};

export const getSupplierRfpClosing = (start_date, end_date) => async (dispatch, getState) => {
  try {
    dispatch(supplierRfpClosingLoading());
    const { tenant: { currentTenant: { id } } } = getState();
    const { data: { proposal_requests } } = await
    Axios.get(`/v1/${id}/events/deadlines/bids?start_date=${start_date}&end_date=${end_date}`);
    dispatch({
      type: GET_PROPOSALS_CLOSING_SOON,
      payload: proposal_requests.length,
    });
    dispatch(supplierRfpClosingDoneloading());
  } catch (error) {
    dispatch(supplierRfpClosingDoneloading());
  }
};

export const getRSVPClosingSoon = (start_date, end_date) => async (dispatch, getState) => {
  try {
    dispatch(setRSVPClosingLoading());
    const { tenant: { currentTenant: { id } } } = getState();
    const { data: { proposal_requests } } = await
    Axios.get(`/v1/${id}/events/deadlines/rsvp?start_date=${start_date}&end_date=${end_date}`);
    dispatch({
      type: GET_RSVP_CLOSING_SOON,
      payload: proposal_requests.length,
    });
    dispatch(RSVPClosingDoneLoading());
  } catch (error) {
    dispatch(RSVPClosingDoneLoading());
  }
};

export const getSupplierProposalQuestionByID = (proposal_question_id) => async (_, getState) => {
  const { supplierRfp: { currentProposal: { questions } } } = getState();
  const question = questions.find((q) => q.id === proposal_question_id);
  return question;
};

export const createSupplierRfpMessage = (
  message, rfpOwnerId, rfpID,
) => async (dispatch, getState) => {
  console.log('We want to send a supplier message here', message, rfpOwnerId);
  const { tenant: { currentTenant: { id } } } = getState();
  const { data } = await Axios.post(`/v1/${id}/events/rfp/messages?event_id=${rfpID}&event_owner_id=${rfpOwnerId}`, message);
  if (data) {
    const { supplier_rfp_message_response } = data;
    console.log('This is the data we got', supplier_rfp_message_response);
    dispatch({
      type: CREATE_SUPPLIER_RFP_MESSAGE,
      payload: supplier_rfp_message_response,
    });
  }
};

export const getSupplierRfpMessageInbox = () => async (dispatch, getState) => {
  const { tenant: { currentTenant: { id } } } = getState();
  const { data } = await Axios.get(`/v1/${id}/events/rfp/messages?path=inbox`);
  if (data) {
    const { supplier_rfp_messages } = data;
    dispatch({
      type: GET_SUPPLIER_RFP_INBOX,
      payload: supplier_rfp_messages.map((message) => deSerializeRfpSupplierInbox(message)),
    });
  }
};

export const findSupplierRfpMessageByID = (message_id, type) => async (dispatch, getState) => new
Promise((resolve, reject) => {
  try {
    let existingMessage = null;
    if (type === 'inbox' && message_id) {
      const { supplierRfp: { rfpInbox } } = getState();
      if (rfpInbox) {
        existingMessage = rfpInbox.find((f) => f.id === parseInt(message_id, 10));
      }
    } else if (type === 'outbox' && message_id) {
      const { supplierRfp: { rfpOutbox } } = getState();
      if (rfpOutbox) {
        existingMessage = rfpOutbox.find((f) => f.id === parseInt(message_id, 10));
      }
    }
    dispatch({
      type: FIND_SUPPLIER_RFP_MESSAGE_BY_ID,
      payload: existingMessage,
    });
    resolve(existingMessage);
  } catch (error) {
    reject((error));
  }
});

export const getSupplierSentMessages = () => async (dispatch, getState) => {
  const { tenant: { currentTenant: { id } } } = getState();
  const { data } = await Axios.get(`/v1/${id}/events/rfp/messages?path=outbox`);
  if (data) {
    const { supplier_rfp_message_responses } = data;
    dispatch({
      type: GET_SUPPLIER_SENT_MESSAGES,
      payload: {
        data: supplier_rfp_message_responses,
        meta: null,
      },
    });
  }
};

// export const setCurrentSupplierInbox = (message) => async (dispatch) => {
//   dispatch({
//     type: SET_CURRENT_SUPPLIER_INBOX,
//     payload: message,
//   });
// };


// export const setCurrentSupplierOutbox = (message) => async (dispatch) => {
//   dispatch({
//     type: SET_CURRENT_SUPPLIER_OUTBOX,
//     payload: message,
//   });
// };
