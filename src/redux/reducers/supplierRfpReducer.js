import { GET_SUPPLIER_RFP, SET_CURRENT_SUPPLIER_RFP } from '../types/supplierRfpTypes';

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
      return state;
    }

    case SET_CURRENT_SUPPLIER_RFP: {
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
