import {
  CREATE_PROPOSAL, SET_RFP_LOADING, SET_RFP_DONE_LOADING, GET_RFP, GET_PROPOSAL_BY_ID,
} from '../types/rfpTypes';

const initialState = {
  loading: false,
  proposals: [],
  currentProposal: null,
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

    default: {
      return {
        ...state,
      };
    }
  }
};
