import {
  CREATE_BID_RESPONSE, VIEW_BIDS, GET_BID_BY_ID, FIND_BID_ID,
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
      console.log('WE FOUND A BID', action.payload);
      return {
        ...state,
        currentBid: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};
