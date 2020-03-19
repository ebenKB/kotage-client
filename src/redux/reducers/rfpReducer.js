import {
  CREATE_PROPOSAL, SET_RFP_LOADING, SET_RFP_DONE_LOADING,
} from '../types/rfpTypes';

const initialState = {
  loading: false,
  proposals: [],
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

    default: {
      return {
        ...state,
      };
    }
  }
};
