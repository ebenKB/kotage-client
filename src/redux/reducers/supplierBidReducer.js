import {
  CREATE_BID_RESPONSE, VIEW_BIDS, GET_BID_BY_ID, FIND_BID_ID, CLEAR_CURRENT_BID,
} from '../types/supplierTypes';

const initialState = {
  bids: [],
  currentBid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BID_RESPONSE: {
      return {
        ...state,
        bids: [action.payload, ...state.bids],
      };
    }

    case VIEW_BIDS: {
      return {
        ...state,
        bids: [...action.payload],
      };
    }

    case GET_BID_BY_ID: {
      return {
        ...state,
        currentBid: action.payload,
      };
    }

    case FIND_BID_ID: {
      return {
        ...state,
        currentBid: action.payload,
      };
    }

    case CLEAR_CURRENT_BID: {
      return {
        ...state,
        currentBid: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};
