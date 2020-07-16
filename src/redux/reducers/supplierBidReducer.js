import {
  CREATE_BID_RESPONSE,
  VIEW_BIDS,
  GET_BID_BY_ID,
  FIND_BID_ID,
  CLEAR_CURRENT_BID,
  REVISE_EXISTING_BID,
  DELETE_BID,
  SET_LOADING,
  DONE_LOADING,
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

    case DELETE_BID: {
      const { bids } = state;
      const newBids = bids.filter((b) => b.id !== action.payload);
      return {
        ...state,
        bids: newBids,
      };
    }

    case REVISE_EXISTING_BID: {
      const updatedBids = state.bids.map((bid) => {
        if (bid.id === action.payload.id) {
          return action.payload;
        } return bid;
      });
      return {
        ...state,
        currentBid: action.payload,
        bids: [...updatedBids],
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case DONE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return { ...state };
    }
  }
};
