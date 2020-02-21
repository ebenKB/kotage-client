import { SET_APP_NOTIFICATION, CLEAR_NOTIFICATION } from '../types/appTypes';

const initialState = {
  notification: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_NOTIFICATION: {
      // check the type of error
      let errorMessage = '';
      const { error } = action.payload;
      if (error.isAxiosError && error.code) {
        errorMessage = 'No record found for this domain';
      } else if (error.isAxiosError && error.code) {
        errorMessage = error.code;
      } else if (error.response.status === 409) {
        errorMessage = 'The record already exists';
      } else {
        errorMessage = error.message;
      }
      return {
        ...state,
        notification: {
          message: errorMessage,
          type: action.payload.type,
        },
      };
    }

    case CLEAR_NOTIFICATION: {
      return {
        ...state,
        notification: null,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
