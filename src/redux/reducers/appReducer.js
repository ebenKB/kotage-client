import { SET_APP_ERROR } from '../types/appTypes';

const initialState = {
  error: {
    type: 'error',
    message: 'Sorry! an error occured',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
