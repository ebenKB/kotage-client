/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_PROPOSAL,
} from '../types/rfpTypes';
import Axios from '../../utils/axios/axios';
import { mergeDateAndTime } from '../../utils/app/index';

export const createProposal = (proposal) => async (dispatch, getState) => {
  // format the date to suit the api structure
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
    proposal_suppliers_attribute: proposal.suppliers,
    proposal_stateholders_attributes: proposal.stakeholders,
    proposal_attachments_attributes: proposal.files,
  };
  console.log('This is the proposal wer are trying to create', newProposal);
  // set all the documents for the proposal
  const documents = proposal.documents.map((doc) => ({
    name: doc.name,
    description: doc.description,
  }));

  // attach the response sheet
  newProposal.proposal_response_sheet_attributes = {
    proposal_document_requests_attributes: documents,
    proposal_questions_attributes: proposal.questions,
  };
  try {
    const { user } = getState();
    const data = Axios.post(`/${user.currentUser.tenant_id}/rfp`, newProposal);
    console.log('We are done creating the proposal and this is the data', data);
    dispatch({
      type: CREATE_PROPOSAL,
    });
  } catch (error) {
    console.log('an error occured while processing your request', error);
  }
};

// export const setRFPOwner = () => async (dispatch, getState) => {
//   const { user } = getState();
//   dispatch({
//     type: SET_RFP_OWNER,
//     payload: user.currentUser,
//   });
// };

/**
 * This function adds a new stakeholder to the new proposal
 * @param {*} user the user to be added as a stakeholder
 */
// export const addStakeholder = (user, access_level) => async (dispatch) => dispatch({
//   type: ADD_STAKEHOLDER,
//   payload: {
//     user,
//     access_level,
//   },
// });


// export const requestNewProposalDocument = () => async (dispatch) => dispatch({
//   type: REQUEST_NEW_DOCUMENT,
//   payload: {
//     id: shortid.generate(),
//     name: '',
//     title: '',
//   },
// });

// export const unpdateNewProposal = (newProposal) => async (dispatch) => dispatch({
//   type: UPDATE_NEW_PROPOSAL,
//   payload: newProposal,
// });

// export const deleteProposalDocument = (id) => async (dispatch) => dispatch({
//   type: DELETE_PROPOSAL_DOCUMENT,
//   payload: id,
// });

// export const addSupplier = (supplier) => async (dispatch) => {
//   dispatch({
//     type: ADD_SUPPLIER,
//     payload: supplier,
//   });
// };
