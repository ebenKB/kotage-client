/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
import Axios from '../../utils/axios/axios';
import { SET_APP_NOTIFICATION } from '../types/appTypes';
import {
  SET_LOADING, DONE_LOADING, SET_ERROR, GET_TENANT, ADD_SUPPLIER, GET_SUPPLIERS,
} from '../types/tenantTypes';

/**
 * this function creates a new tenant
 * @param {*} tenant the tenant to create
 */
export const createTenant = (tenant) => async () => new Promise((resolve, reject) => {
  try {
    const data = Axios.post('tenants', tenant);
    resolve(data);
  } catch (error) {
    reject(error);
  }
});

/**
 * this function retrieves one tenant from the databse
 * @param {*} tenant_id the id of the tenant to fetch
 */
export const getTenant = (tenant_id) => async (dispatch, getState) => {
  const { tenant } = getState();
  if (tenant.currentTenant == null) {
    try {
      const { data } = await Axios.get(`/${tenant_id}`);
      return dispatch({
        type: GET_TENANT,
        payload: data.tenant,
      });
    } catch (error) {
      return dispatch({
        type: SET_APP_NOTIFICATION,
        payload: {
          type: 'error',
          message: 'Sorry! an notification occured',
        },
      });
    }
  } else {
    return null;
  }
};

/**
 * This function checks whether a tenant domain is already registered or not
 * @param {*} domain the tenat domain to validate
 */
export const validateDomain = (domain) => async (dispatch) => (
  new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading);
      const { data, status } = await Axios.get(`/tenants/check_domain?domain=${domain}`);
      dispatch(doneLoading);
      if (status === 200 && data.exists === 'true') {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
      dispatch(doneLoading);
    }
  })
);

/**
 * search supplier using their unique identification
 * @param {*} tenant_id the tenant_id to search
 * @param {*} uid the uid to search
 */
export const searchSupplier = (tenant_id, uid) => async (dispatch) => (
  new Promise(async (resolve, reject) => {
    dispatch(setLoading);
    try {
      const { data } = await Axios.get(`/${tenant_id}/suppliers?uid=${uid}`);
      resolve(data.tenant);
      dispatch(doneLoading);
    } catch (error) {
      dispatch(doneLoading);
      reject(error);
    }
  })
);

export const getAllSuppliers = () => async (dispatch, getState) => {
  dispatch(setLoading);
  const { user } = getState();
  try {
    const { data } = await Axios.get(`/${user.currentUser.tenant_id}/suppliers`);
    dispatch({
      type: GET_SUPPLIERS,
      payload: data.suppliers,
    });
    dispatch(doneLoading);
  } catch (error) {
    console.log(error);
    dispatch(doneLoading);
  }
};

export const getSupplier = (uid, tenant_id) => new Promise(async (resolve, reject) => {
  try {
    const { data } = await Axios.get(`/${tenant_id}/suppliers?uid=${uid}`);
    console.log('This is the data we got', data);
    resolve(data.tenant);
  } catch (error) {
    console.log('an error occurred');
    reject(error);
  }
});

export const addSupplier = (tenant_id, uid) => async (dispatch) => (
  new Promise(async (resolve) => {
    try {
      const { data } = await Axios.post(`/${tenant_id}/suppliers`, { tenant_id, uid });
      dispatch({
        type: ADD_SUPPLIER,
        payload: data.tenant,
      });
      resolve(data);
    } catch (error) {
      dispatch({
        type: SET_APP_NOTIFICATION,
        payload: {
          type: 'error',
          notification: error,
        },
      });
    }
  }));

export const setLoading = (dispatch) => dispatch({
  type: SET_LOADING,
});

const doneLoading = (dispatch) => dispatch({
  type: DONE_LOADING,
});

export const setError = (error) => async (dispatch) => dispatch({
  type: SET_ERROR,
  payload: error,
});
