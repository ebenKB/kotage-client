import {
  SET_LOADING, GET_REQUISITIONS, CREATE_REQUISITION, SET_FILES,
} from '../types/requisitionTypes';

const initialState = {
  requisitions: null,
  loading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUISITIONS:
      return {
        ...state,
        requisitions: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REQUISITION:
      return {
        ...state,
        requisitions: [...state, action.payload],
        loading: false,
      };
    case SET_FILES:
      return {
        ...state,
      };
    default:
      return state;
  }
};
