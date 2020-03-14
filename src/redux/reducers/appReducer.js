import { SET_APP_NOTIFICATION, CLEAR_NOTIFICATION } from '../types/appTypes';

const initialState = {
  notification: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_NOTIFICATION: {
      let errorMessage = '';
      const { notification } = action.payload;
      if (notification) {
        if (notification.isAxiosError && notification.code && notification.code === 'ECONNABORTED') {
          if (notification.status === 0) {
            errorMessage = 'Please check your internet connection';
          } else {
            errorMessage = 'Please try again after some time';
          }
        } else if (notification.isAxiosError && notification.code) {
          errorMessage = notification.code;
        } else if (notification.isAxiosError && notification.code) {
          errorMessage = 'No record found for this domain';
        } else if (notification.response && notification.response.status
          && notification.response.status === 409) {
          errorMessage = 'This record already existis';
        } else {
          errorMessage = notification.message;
          // errorMessage = 'An error occurred while completing your request';
        }
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
