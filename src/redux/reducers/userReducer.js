import { INVITE_USER, LOGIN , SET_USER_LOADING, DONE_LOADING, GET_USERS} from '../types/userTypes';

const initialState = {
  users: null,
  currentUser: null,
  isAuthenticated: false,
  auth_token:null,
  error: false,
  loading: false,
}

export default (state= initialState, action) => {
  switch(action.type) {
    case GET_USERS : 
    return {
      ...state,
      users: action.payload
    }
    
    case INVITE_USER :
    return {
      ...state,
    }

    case LOGIN :
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user_id,
        auth_token: action.payload.token,
        tenant: action.payload.tenant_id,
      }

    case SET_USER_LOADING : 
    return {
      ...state,
      loading: true
    }

    case DONE_LOADING : {
      return {
        ...state,
        loading: false,
      }
    }

    default : 
      return {
        ...state
      }
  }
}
