/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_PROPOSAL, SET_RFP_LOADING,
  SET_RFP_DONE_LOADING, GET_RFP,
  GET_PROPOSAL_BY_ID, CREATE_MESSAGE, GET_RFP_OUTBOX, GET_RFP_INBOX, FIND_RFP_MESSAGE,
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
  /**
   * serialize proposal for the backend
   * This is important because the fontend uses different names for the
   * proposalimport { setNotification } from './appActions';
import { deserializeProposal } from '../../serializers/rfp-serializer';
import { deserializeProposal } from '../../serializers/rfp-serializer';
import { CREATE_MESSAGE } from '../types/rfpTypes';
import { GET_RFP_INBOX } from '../types/rfpTypes';
import { GET_RFP_INBOX } from '../types/rfpTypes';

   */
  // const newProposal = {
  //   title: proposal.title,
  //   tenant_id: proposal.tenant_id,
  //   description: proposal.description,
  //   bid_deadline: mergeDateAndTime(proposal.bid_deadline_date,
  //     proposal.bid_deadline_time),
  //   rsvp_deadline: mergeDateAndTime(proposal.rsvp_deadline_date,
  //     proposal.rsvp_deadline_time),
  //   question_deadline: mergeDateAndTime(proposal.question_deadline_date,
  //     proposal.question_deadline_time),
  //   currency_id: proposal.currency_id,
  //   proposal_stakeholders_attributes: proposal.stakeholders
  //     .map((user) => (
  //       {
  //         user_id: user.id,
  //         access_level: user.access_level,
  //       })),
  //   proposal_suppliers_attributes: proposal.suppliers.map((s) => (
  //     {
  //       id: s.id,
  //     })),
  //   proposal_attachments_attributes: proposal.files.map((f) => ({
  //     file: f.location,
  //   })),
  // };

  // // attach the response sheet
  // newProposal.proposal_response_sheet_attributes = {
  //   proposal_document_requests_attributes: proposal.documents
  //     .map((doc) => ({ name: doc.name, description: doc.description })),
  //   proposal_questions_attributes: proposal.questions
  //     .map((question) => ({ question: question.question })),
  // };
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

export const getRequestForProposals = () => async (dispatch, getState) => {
  dispatch({ type: SET_RFP_LOADING });
  const { user } = getState();
  const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/rfp`);
  const { proposal_requests, meta } = data;
  const deserializedProposals = proposal_requests.map((proposal) => deserializeProposal(proposal));
  const { pagination } = meta;
  dispatch({
    type: GET_RFP,
    payload: {
      proposals: deserializedProposals,
      meta: pagination,
    },
  });
  // dispatch({ type: SET_RFP_DONE_LOADING });
};

// export const findProposal = (id) => async (dispatch, getState) => {
//   const { user } = getState();
//   const suppliers = [];
//   const { data } = await Axios.get(`/v1/${user.currentUser.tenant_id}/rfp/${id}`);
//   const { proposal_request } = data;
//   console.log('This is the data', data);
//   const getSuppliers = () => {
//     for (const supplier of proposal_request.suppliers) {
//       Axios.get(`/v1/${tenant_id}/suppliers?uid=${uid}`);
//     }
//   };
// };

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

export const findRfpMessageById = (message_id) => async (dispatch, getState) => {
  try {
    const { rfp } = getState();
    const { rfpOutbox } = rfp;
    // console.log('This is the entire outbox', rfpOutbox);
    const message = rfpOutbox.find((m) => parseInt(m.id, 10) === parseInt(message_id, 10));
    dispatch({
      type: FIND_RFP_MESSAGE,
      payload: message,
    });
  } catch (error) {
    console.log('an error occcurred', error);
  }
};
