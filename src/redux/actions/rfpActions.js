/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  UPDATE_RFP,
  GET_RFP,
  CREATE_PROPOSAL,
  SET_RFP_LOADING,
  CREATE_MESSAGE,
  GET_RFP_OUTBOX,
  GET_RFP_INBOX,
  FIND_RFP_MESSAGE,
  CLEAR_RFP_OUTBOX,
  SET_RFP_DONE_LOADING,
  GET_PROPOSAL_BY_ID,
  SET_CURRENT_MESSAGE_BLOB,
} from '../types/rfpTypes';
import Axios from '../../utils/axios/axios';
import { getToken } from '../../utils/app/index';
import { setNotification } from './appActions';
import {
  serializeProposal, deserializeProposal, serializeRfpMessage, deserializeRfpMessage,
} from '../../serializers/rfp-serializer';
import { setPublishRfpLoading, setPublishRfpDoneLoding } from './ui';
// set default auth token
Axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

export const createProposal = (proposal) => async (dispatch, getState) => new
Promise((resolve, reject) => {
  dispatch({ type: SET_RFP_LOADING });
  const newProposal = serializeProposal(proposal);
  const { user } = getState();
  Axios.post(`/v1/${user.currentUser.tenant_id}/rfp`, newProposal)
    .then((data) => {
      dispatch({
        type: CREATE_PROPOSAL,
        payload: data,
      });
      // dispatch({ type: SET_RFP_DONE_LOADING });
      dispatch(setNotification({ message: 'New Rfp has been created' }, 'success'));
      resolve(data);
    })
    .catch((err) => {
      dispatch({ type: SET_RFP_DONE_LOADING });
      reject(err);
    });
});

export const updateProposal = (newProposal) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_RFP_LOADING });
    const serProposal = serializeProposal(newProposal);
    const { user } = getState();
    const data = await Axios.put(`/v1/${user.currentUser.tenant_id}/rfp/${newProposal.id}`, serProposal);
    dispatch({
      type: UPDATE_RFP,
      payload: data,
    });
    dispatch({ type: SET_RFP_DONE_LOADING });
  } catch (error) {
    dispatch({ type: SET_RFP_DONE_LOADING });
  }
};

export const getRequestForProposals = (page) => async (dispatch, getState) => new
Promise((resolve, reject) => {
  dispatch({ type: SET_RFP_LOADING });
  const { user } = getState();
  // const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/rfp?page=${page}`);
  const req = Axios.get(`/v1/${user.currentUser.tenant_id}/rfp?page=${page}`);
  Promise.resolve(req)
    .then((response) => {
      const { data } = response;
      const { proposal_requests, meta } = data;
      const deserializedProposals = proposal_requests
        .map((proposal) => deserializeProposal(proposal));
      const { pagination } = meta;
      dispatch({
        type: GET_RFP,
        payload: {
          proposals: deserializedProposals,
          meta: pagination,
          page,
        },
      });
      resolve(true);
    })
    .catch((error) => {
      dispatch({ type: SET_RFP_DONE_LOADING });
      reject(error);
    });
});

export const getCurrentProposal = (id) => async (dispatch) => {
  dispatch(
    {
      type: GET_PROPOSAL_BY_ID,
      payload: id,
    },
  );
  // dispatch(findProposal(id));
};

export const getRfpInbox = (rfp_id) => async (dispatch, getState) => {
  if (rfp_id !== null && rfp_id !== undefined) {
    try {
      dispatch({ type: SET_RFP_LOADING });
      const { user } = getState();
      const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/rfp/${rfp_id}/messages?path=inbox`);
      const formatedData = data.rfp_messages.map((d) => deserializeRfpMessage(d));
      dispatch({
        type: GET_RFP_INBOX,
        payload: {
          data: formatedData,
          meta: data.meta.pagination,
        },
      });
    } catch (error) {
      dispatch({ type: SET_RFP_DONE_LOADING });
    }
  }
};

export const getRfpOutbox = (rfp_id) => async (dispatch, getState) => {
  if (rfp_id !== null && rfp_id !== undefined) {
    try {
      dispatch({ type: SET_RFP_LOADING });
      const { user } = getState();
      const { data } = await Axios
        .get(`/v1/${user.currentUser.tenant_id}/rfp/${rfp_id}/messages?path=outbox`);

      const formatedData = data.rfp_messages.map((d) => deserializeRfpMessage(d));
      dispatch({
        type: GET_RFP_OUTBOX,
        payload: {
          data: formatedData,
          meta: data.meta.pagination,
        },
      });
    } catch (error) {
      dispatch({ type: SET_RFP_DONE_LOADING });
      dispatch({ type: CLEAR_RFP_OUTBOX });
    }
  } else {
    dispatch({ type: SET_RFP_DONE_LOADING });
  }
};

/**
 * send message to suppliers
 * If no suppliers are specified, then send the message to all suppliers
 * @param {*} message the message to send to the suppliers
 * @param {*} supplier_ids the suppliers to receive the message, defaults to null
 */
export const createRfpMessage = (message, supplier_ids) => async (dispatch, getState) => new
Promise((resolve) => {
  try {
    dispatch({ type: SET_RFP_LOADING });
    const { user } = getState();
    if (supplier_ids === null) { // send the message to all suppliers
      Axios.post(`/v1/${user.currentUser.tenant_id}/rfp/${message.rfp_id}/messages`, serializeRfpMessage(message))
        .then((data) => {
          dispatch({
            type: CREATE_MESSAGE,
            payload: deserializeRfpMessage(data.data.rfp_message),
          });
          resolve(true);
        });
    } else { // send message to the selected suppliers
      for (let i = 0; i < supplier_ids.length; i++) {
        Axios.post(`/v1/${user.currentUser.tenant_id}/rfp/${message.rfp_id}/messages?to=${supplier_ids[i]}`, serializeRfpMessage(message))
          .then((data) => {
            dispatch({
              type: CREATE_MESSAGE,
              payload: deserializeRfpMessage(data.data.rfp_message),
            });
            if (i === (supplier_ids.length - 1)) {
              resolve(true);
            }
          });
      }
    }
  } catch (error) {
    dispatch({ type: SET_RFP_DONE_LOADING });
  }
});

export const setLoading = () => async (dispatch) => dispatch({
  type: SET_RFP_LOADING,
});

export const findRfpMessageById = (message_id) => async (dispatch, getState) => new
Promise((resolve, reject) => {
  try {
    const { rfp } = getState();
    const { rfpOutbox } = rfp;
    // console.log('This is the entire outbox', rfpOutbox);
    const message = rfpOutbox.find((m) => parseInt(m.id, 10) === parseInt(message_id, 10));
    dispatch({
      type: FIND_RFP_MESSAGE,
      payload: message,
    });
    resolve(message);
  } catch (error) {
    reject(error);
  }
});

export const setCurrenMessageBlob = (blob) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENT_MESSAGE_BLOB,
      payload: blob,
    });
  } catch (error) {
    console.log(error);
  }
};

export const publishRfp = (rfpID) => async (dispatch, getState) => {
  try {
    dispatch(setPublishRfpLoading());
    const { user: { currentUser: { tenant_id } } } = getState();
    const { data } = await Axios.post(`/v1/${tenant_id}/rfp/${rfpID}/publish`);
    console.log('Done publishing and this is the data', data);
    dispatch(setPublishRfpDoneLoding());
  } catch (error) {
    console.log('an error occurred while publishing the event');
    dispatch(setPublishRfpDoneLoding());
  }
};

export const unpublishRfp = (rfpID) => async (dispatch, getState) => {
  try {
    const { user: { currentUser: { tenant_id } } } = getState();
    await Axios.post(`/v1/${tenant_id}/rfp/${rfpID}/unpublish`);
  } catch (error) {
    console.log('an error occurred while publishing the event');
  }
};
