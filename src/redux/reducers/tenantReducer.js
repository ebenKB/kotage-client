import {
  CREATE_TENANT, SET_LOADING, DONE_LOADING, SET_ERROR, GET_TENANT,
  ADD_SUPPLIER, GET_SUPPLIER, GET_SUPPLIERS,
} from '../types/tenantTypes';

const initialState = {
  tenants: null,
  suppliers: null,
  /**
   * tempSuppliers is needed to store the ids of suppliers who
   * belong to a tenant.
   * This is necessary as the api only returns ids of suppliers
   * for a tenant
   */
  tempSuppliers: null,
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
      let newSuppliers = null;
      if (!state.suppliers) {
        newSuppliers = action.payload;
      } else {
        newSuppliers = [...state.suppliers, action.payload];
      }
      return {
        ...state,
        suppliers: newSuppliers,
      };
    }

    case GET_SUPPLIERS: {
      let newSuppliers = null;
      if (state.suppliers) {
        newSuppliers = [...state.suppliers, ...action.payload];
      } else {
        newSuppliers = [...action.payload];
      }
      return {
        ...state,
        tempSuppliers: newSuppliers,
      };
    }

    case GET_SUPPLIER: {
      if (action.payload) {
        if (state.suppliers) {
          return {
            ...state,
            suppliers: [...state.suppliers, action.payload],
          };
        }
        return {
          ...state,
          suppliers: [action.payload],
        };
      }
      return { ...state };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
