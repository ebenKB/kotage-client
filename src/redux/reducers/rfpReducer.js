import {
  CREATE_PROPOSAL, SET_RFP_LOADING, SET_RFP_DONE_LOADING, GET_RFP,
} from '../types/rfpTypes';

const initialState = {
  loading: false,
  proposals: [],
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

    default: {
      return {
        ...state,
      };
    }
  }
};
