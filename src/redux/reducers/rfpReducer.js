import shortid from 'shortid';
import {
  UPDATE_DOC, CREATE_PROPOSAL, SET_RFP_OWNER, ADD_STAKEHOLDER, REQUEST_NEW_DOCUMENT,
} from '../types/rfpTypes';

const initialState = {
  newProposal: {
    title: 'This is a new proposal',
    description: 'This is the description for the proposal',
    bid_deadline_date: '',
    rsvp_deadline_date: '',
    question_deadline_date: '',
    bid_deadline_time: '',
    rsvp_deadline_time: '',
    question_deadline_time: '',
    currency_id: null,
    tenant_id: null,
    suppliers: null,
    stakeholders: null,
    documents: [{
      id: shortid.generate(),
      name: 'VAT CLEARANCE',
      description: 'Please provide a copy of your VAT clearance certificate',
    }],
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
      return {
        ...state,
      };
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
      // check if the user is not already added as a stakeholder
      const existing = updatedProposal.stakeholders.filter((s) => s.id === payload.user.id);
      if (!existing) {
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
      return { ...state };
    }

    case REQUEST_NEW_DOCUMENT: {
      // before adding a document, check to make sure that the prev document is not empty
      const { documents } = state.newProposal;
      const docsSize = documents.length;
      const prevDoc = documents[docsSize - 1];
      if (prevDoc.name !== '' && prevDoc.description !== '') {
        const newDocs = [...documents, action.payload];
        return {
          ...state,
          newProposal: {
            ...state.newProposal,
            documents: newDocs,
          },
        };
      }
      return { ...state };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
