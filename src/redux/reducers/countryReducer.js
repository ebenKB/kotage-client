import { GET_COUNTRIES } from "../types/countryTypes"

const initialState = {
  countries: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}