/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_PROPOSAL, SET_RFP_LOADING,
  SET_RFP_DONE_LOADING, GET_RFP,
  GET_PROPOSAL_BY_ID, CREATE_MESSAGE,
  GET_RFP_OUTBOX, GET_RFP_INBOX, FIND_RFP_MESSAGE,
  UPDATE_RFP, SET_CURRENT_MESSAGE_BLOB,
} from '../types/rfpTypes';
import Axios from '../../utils/axios/axios';
import { getToken } from '../../utils/app/index';
import { setNotification } from './appActions';
import {
  serializeProposal, deserializeProposal, serializeRfpMessage, deserializeRfpMessage,
} from '../../serializers/rfp-serializer';

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
    console.log('This is the data', data);
    dispatch({
      type: UPDATE_RFP,
      payload: data,
    });
    dispatch({ type: SET_RFP_DONE_LOADING });
  } catch (error) {
    console.log('An error occured while updating');
    dispatch({ type: SET_RFP_DONE_LOADING });
  }
};

export const getRequestForProposals = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_RFP_LOADING });
    const { user } = getState();
    const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/rfp?page=${page}`);
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
    console.log('returning true');
    return true;
  } catch (error) {
    console.log('return false');
    dispatch({ type: SET_RFP_DONE_LOADING });
    return false;
  }
};

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
      const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/rfp/${rfp_id}/messages?path=outbox`);
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
    }
  } else {
    dispatch({ type: SET_RFP_DONE_LOADING });
  }
};


export const createRfpMessage = (message) => async (dispatch, getState) => new
Promise((resolve) => {
  try {
    dispatch({ type: SET_RFP_LOADING });
    const { user } = getState();
    Axios.post(`/v1/${user.currentUser.tenant_id}/rfp/${message.rfp_id}/messages`, serializeRfpMessage(message))
      .then((data) => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: data,
        });
        resolve(true);
      });
  } catch (error) {
    console.log('error here');
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
    console.log('an error occcurred', error);
    reject(error);
  }
});

export const setCurrenMessageBlob = (blob) => async (dispatch) => {
  console.log('We want to set message blob', blob);
  try {
    dispatch({
      type: SET_CURRENT_MESSAGE_BLOB,
      payload: blob,
    });
  } catch (error) {
    console.log(error);
  }
};
