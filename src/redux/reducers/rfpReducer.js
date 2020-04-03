import {
  CREATE_PROPOSAL, SET_RFP_LOADING, SET_RFP_DONE_LOADING,
  GET_RFP, GET_PROPOSAL_BY_ID, CREATE_MESSAGE,
} from '../types/rfpTypes';

const initialState = {
  loading: false,
  proposals: [],
  currentProposal: null,
  rfpInbox: null,
  rfpOutbox: null,
  meta: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROPOSAL: {
      if (action.payload) {
        return {
          ...state,
          proposals: [state.proposals, action.payload],
        };
      }
      return { ...state };
    }

    case SET_RFP_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case SET_RFP_DONE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case GET_RFP: {
      const { proposals } = action.payload;
      return {
        ...state,
        proposals: [...state.proposals, ...proposals],
        meta: action.payload.meta,
      };
    }

    case GET_PROPOSAL_BY_ID: {
      const proposal = state.proposals.find((p) => parseInt(p.id, 10)
        === parseInt(action.payload, 10));
      return {
        ...state,
        currentProposal: proposal,
      };
    }

    case CREATE_MESSAGE: {
      const outbox = state.rfpOutbox;
      let rfpMessages = null;
      if (outbox !== null) {
        rfpMessages = [...outbox, action.payload];
      } else {
        rfpMessages = [action.payload];
      }
      return {
        ...state,
        rfpOutbox: rfpMessages,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
