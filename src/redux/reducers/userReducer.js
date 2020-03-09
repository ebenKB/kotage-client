import {
  INVITE_USER, LOGIN, SET_USER_LOADING, DONE_LOADING,
  GET_USERS, GET_INVIATION, GET_INVIATIONS, CREATE_USER, GET_TENANT_ID,
  MAKE_ADMIN, REVOKE_ADMIN, REQUEST_PASS_RESET, RESET_PASSWORD, DELETE_USER,
  RESEND_INVITATION, DELETE_INVITATION, LOGOUT,
} from '../types/userTypes';

const initialState = {
  users: null,
  userInvitations: null,
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

    case INVITE_USER: {
      const { userInvitations } = state;
      let newInvitations = [];
      if (userInvitations) {
        newInvitations = [...userInvitations, action.payload];
      } else {
        newInvitations = [action.payload];
      }
      return {
        ...state,
        userInvitations: newInvitations,
      };
    }

    case RESEND_INVITATION: {
      return {
        ...state,
      };
    }

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

    case LOGOUT: {
      localStorage.removeItem('kotage-auth');
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    }

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

    case GET_INVIATIONS: {
      return {
        ...state,
        userInvitations: action.payload,
      };
    }
    case GET_TENANT_ID: {
      const { currentUser } = state;
      let newUser = null;
      if (currentUser !== null) {
        newUser = { ...currentUser, tenant_id: action.payload };
      } else {
        newUser = { tenant_id: action.payload };
      }

      return {
        ...state,
        currentUser: newUser,
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

    case REQUEST_PASS_RESET: {
      return {
        ...state,
      };
    }

    case RESET_PASSWORD: {
      return {
        ...state,
      };
    }

    case DELETE_USER: {
      // a user was deleted
      const users = state.users.filter((u) => u.id !== action.payload);
      return {
        ...state,
        users,
      };
    }

    case DELETE_INVITATION: {
      const invitations = state.userInvitations.filter((u) => u.id !== action.payload);
      return {
        ...state,
        userInvitations: invitations,
      };
    }

    case 'persist/REHYDRATE': {
      if (action.payload) {
        const { user } = action.payload;
        return {
          ...user,
        };
      }
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
