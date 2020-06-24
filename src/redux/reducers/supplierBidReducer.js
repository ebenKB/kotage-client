import { CREATE_BID_RESPONSE, VIEW_BIDS } from '../types/supplierTypes';

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

    default: {
      return { ...state };
    }
  }
};
