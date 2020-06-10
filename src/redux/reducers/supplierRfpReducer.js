import { GET_SUPPLIER_RFP, SET_CURRENT_SUPPLIER_RFP, FIND_SUPPLIER_EVENT_BY_ID } from '../types/supplierRfpTypes';

const initialState = {
  loading: false,
  proposals: [],
  currentProposal: null,
  rfpInbox: null,
  rfpOutbox: null,
  currentOutbox: null,
  currentInbox: null,
  rfpOutboxMeta: null,
  rfpInboxMeta: null,
  meta: null,
  currentPage: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIER_RFP: {
      return {
        ...state,
        proposals: action.payload.proposals,
        meta: action.payload.meta,
      };
    }

    case SET_CURRENT_SUPPLIER_RFP: {
      return {
        ...state,
        currentProposal: action.payload,
      };
    }

    case FIND_SUPPLIER_EVENT_BY_ID: {
      console.log('Finding the supplier by id');
      return {
        ...state,
        currentProposal: action.payload,
      };
    }

    default: {
      return null;
    }
  }
};
