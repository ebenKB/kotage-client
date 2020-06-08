import { GET_COUNTRIES } from '../types/countryTypes';

const initialState = {
  countries: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
