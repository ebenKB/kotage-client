import {
  INVITE_USER, LOGIN, SET_USER_LOADING, DONE_LOADING,
  GET_USERS, GET_INVIATION, CREATE_USER, GET_TENANT_ID,
  MAKE_ADMIN, REVOKE_ADMIN, REQUEST_PASS_REQUEST, RESET_PASSWORD,
} from '../types/userTypes';

const initialState = {
  users: null,
  currentUser: null,
  isAuthenticated: false,
  error: false,
  loading: false,
  invitation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case INVITE_USER:
      return {
        ...state,
      };

    case CREATE_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }

    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };

    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case DONE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case GET_INVIATION: {
      return {
        ...state,
        invitation: action.payload,
      };
    }

    case GET_TENANT_ID: {
      const currentUser = { tenant_id: action.payload };
      return {
        ...state,
        currentUser,
      };
    }

    case MAKE_ADMIN: {
      const user = action.payload;
      const newUsers = state.users.filter((u) => u.id !== user.id);
      return {
        ...state,
        users: [...newUsers, user],
      };
    }

    case REVOKE_ADMIN: {
      const user = action.payload;
      const newUsers = state.users.filter((u) => u.id !== user.id);
      return {
        ...state,
        users: [...newUsers, user],
      };
    }

    case REQUEST_PASS_REQUEST: {
      return {
        ...state,
      };
    }

    case RESET_PASSWORD: {
      return {
        ...state,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
