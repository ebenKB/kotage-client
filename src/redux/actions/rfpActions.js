/* eslint-disable dot-notation */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_PROPOSAL, SET_RFP_LOADING, SET_RFP_DONE_LOADING,
} from '../types/rfpTypes';
import Axios from '../../utils/axios/axios';
import { mergeDateAndTime, getToken } from '../../utils/app/index';

// set default auth token
Axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

export const createProposal = (proposal) => async (dispatch, getState) => new Promise((resolve) => {
  dispatch({ type: SET_RFP_LOADING });
  /**
   * serialize proposal for the backend
   * This is important because the fontend uses different names for the
   * proposal
   */
  const newProposal = {
    title: proposal.title,
    tenant_id: proposal.tenant_id,
    description: proposal.description,
    bid_deadline: mergeDateAndTime(proposal.bid_deadline_date,
      proposal.bid_deadline_time),
    rsvp_deadline: mergeDateAndTime(proposal.rsvp_deadline_date,
      proposal.rsvp_deadline_time),
    question_deadline: mergeDateAndTime(proposal.question_deadline_date,
      proposal.question_deadline_time),
    currency_id: proposal.currency_id,
    proposal_stakeholders_attributes: proposal.stakeholders
      .map((user) => (
        {
          user_id: user.id,
          access_level: user.access_level,
        })),
    proposal_suppliers_attributes: proposal.suppliers.map((s) => (
      {
        supplier_id: s.supplier_id,
      })),
    proposal_attachments_attributes: proposal.files.map((f) => ({
      file: f.location,
    })),
  };

  // attach the response sheet
  newProposal.proposal_response_sheet_attributes = {
    proposal_document_requests_attributes: proposal.documents
      .map((doc) => ({ name: doc.name, description: doc.description })),
    proposal_questions_attributes: proposal.questions
      .map((question) => ({ question: question.question })),
  };
  const { user } = getState();
  Axios.post(`/v1/${user.currentUser.tenant_id}/rfp`, newProposal)
    .then((data) => {
      dispatch({
        type: CREATE_PROPOSAL,
        payload: data,
      });
      dispatch({ type: SET_RFP_DONE_LOADING });
      resolve(data);
    })
    .catch((err) => {
      dispatch({ type: SET_RFP_DONE_LOADING });
      console.log(err);
    });
});

export const getUsers = () => async () => {
  console.log('We are getting users');
  // const { data } = await Axios.get();
};


export const setLoading = () => async (dispatch) => dispatch({
  type: SET_RFP_LOADING,
});
