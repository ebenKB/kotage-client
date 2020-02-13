import {
  INVITE_USER, LOGIN, SET_USER_LOADING, DONE_LOADING,
  GET_USERS, GET_INVIATION, CREATE_USER, GET_TENANT_ID, MAKE_ADMIN, REVOKE_ADMIN,
} from '../types/userTypes';

const initialState = {
  users: null,
  currentUser: null,
  isAuthenticated: false,
  auth_token: null,
  error: false,
  loading: false,
  invitation: null,
  tenant_id: null,
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
        currentUser: action.payload.user_id,
        auth_token: action.payload.token,
        tenant: action.payload.tenant_id,
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
      return {
        ...state,
        tenant_id: action.payload,
      };
    }

    case MAKE_ADMIN: {
      const user = action.payload;
      console.log('Users in the state', { state });
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

    default:
      return {
        ...state,
      };
  }
};
