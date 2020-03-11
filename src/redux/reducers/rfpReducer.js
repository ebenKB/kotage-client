import {
  UPDATE_DOC, CREATE_PROPOSAL, SET_RFP_OWNER, ADD_STAKEHOLDER,
} from '../types/rfpTypes';

const initialState = {
  newProposal: {
    title: 'This is a new proposal',
    description: 'This is the description for the proposal',
    bid_deadline: '',
    rsvp_deadline: '',
    question_deadline: '',
    currency_id: null,
    tenant_id: null,
    suppliers: null,
    stakeholders: null,
    proposal_attachments_attributes: null,
    proposal_response_sheet_attributes: {
      proposal_question_attributes: null,
      proposal_document_requests_attributes: null,
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DOC: {
      console.log('We want to update the document in the reducer');
      return null;
    }
    case CREATE_PROPOSAL: {
      console.log('we want to create a proposal', state.newProposal);
      return null;
    }

    case SET_RFP_OWNER: {
      const updatedProposal = state.newProposal;
      updatedProposal.stakeholders = [{
        id: action.payload.id,
        access_level: 2,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
      }];
      return {
        ...state,
        newProposal: updatedProposal,
      };
    }

    case ADD_STAKEHOLDER: {
      const { payload } = action;
      const updatedProposal = state.newProposal;
      updatedProposal.stakeholders = [...state.newProposal.stakeholders,
        {
          access_level: payload.access_level,
          id: payload.user.id,
          firstname: payload.user.firstname,
          lastname: payload.user.lastname,
          email: payload.user.email,
        }];
      return {
        ...state,
        newProposal: updatedProposal,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
