import {
  CREATE_TENANT, SET_LOADING, DONE_LOADING, SET_ERROR, GET_TENANT, ADD_SUPPLIER,
} from '../types/tenantTypes';

const initialState = {
  tenants: null,
  suppliers: [],
  currentTenant: null,
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TENANT: {
      return {
        ...state,
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case DONE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case GET_TENANT: {
      return {
        ...state,
        currentTenant: action.payload,
      };
    }

    case ADD_SUPPLIER: {
      return {
        ...state,
        supplier: [...state.suppliers, action.payload],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
