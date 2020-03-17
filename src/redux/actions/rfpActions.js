/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_PROPOSAL,
} from '../types/rfpTypes';
import Axios from '../../utils/axios/axios';
import { mergeDateAndTime } from '../../utils/app/index';

export const createProposal = (proposal) => async (dispatch, getState) => {
  /**
   * serialize proposal for the backend
   * This is important because the fontend uses different names for the
   * proporties of the proposal
   */
  const newProposal = {
    title: proposal.titile,
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
      .map((user) => ({ user_id: user.id, access_level: user.access_level })),
    proposal_suppliers_attributes: proposal.suppliers.map((s) => ({ supplier_id: s.id })),
    proposal_attachments_attributes: proposal.files,
  };

  // attach the response sheet
  newProposal.proposal_response_sheet_attributes = {
    proposal_document_requests_attributes: proposal.documents
      .map((doc) => ({ name: doc.name, description: doc.description })),
    proposal_questions_attributes: proposal.questions,
  };

  try {
    const { user } = getState();
    const data = Axios.post(`/${user.currentUser.tenant_id}/rfp`, newProposal);
    dispatch({
      type: CREATE_PROPOSAL,
      payload: data,
    });
  } catch (error) {
    console.log('an error occured while processing your request', error);
  }
};
