import {
  GET_SUPPLIER_RFP, SET_CURRENT_SUPPLIER_RFP,
  FIND_SUPPLIER_EVENT_BY_ID, GET_SUPPLIER_RFP_BY_ID, CLEAR_CURRENT_RFP,
} from '../types/supplierRfpTypes';

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
        currentProposal: null,
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
      return {
        ...state,
        currentProposal: action.payload,
      };
    }

    case GET_SUPPLIER_RFP_BY_ID: {
      return {
        ...state,
        currentProposal: { ...action.payload },
      };
    }

    case CLEAR_CURRENT_RFP: {
      return {
        ...state,
        currentProposal: null,
      };
    }
    default: {
      return null;
    }
  }
};
