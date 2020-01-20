import { SET_LOADING, GET_REQUISITIONS } from "../types/requisitionTypes";

const initialState = {
  requisitions: null,
  loading: false,
  error: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_REQUISITIONS:
      return {
        ...state,
        requisitions: action.payload,
        loading: false,
      }
      case SET_LOADING:
        return {
          ...state,
          loading: true,
      }
    default:
      return state;
  }
}