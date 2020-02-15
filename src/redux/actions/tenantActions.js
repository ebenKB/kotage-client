/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
import Axios from '../../utils/axios/axios';
import { SET_APP_ERROR } from '../types/appTypes';
import {
  SET_LOADING, DONE_LOADING, SET_ERROR, GET_TENANT,
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
export const getTenant = (tenant_id) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/${tenant_id}`);
    return dispatch({
      type: GET_TENANT,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: SET_APP_ERROR,
      payload: error,
    });
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
