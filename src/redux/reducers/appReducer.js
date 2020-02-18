import { SET_APP_ERROR } from '../types/appTypes';

const initialState = {
  error: '',
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
