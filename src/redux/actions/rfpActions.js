/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  CREATE_PROPOSAL, SET_RFP_OWNER, ADD_STAKEHOLDER, ADD_SUPPLIER,
} from '../types/rfpTypes';

export const createProposal = (proposal) => async (dispatch) => {
  console.log('IN THE RFP ACTIONS', proposal);
  dispatch({
    type: CREATE_PROPOSAL,
  });
};

export const setRFPOwner = () => async (dispatch, getState) => {
  const { user } = getState();
  dispatch({
    type: SET_RFP_OWNER,
    payload: user.currentUser,
  });
};

/**
 * This function adds a new stakeholder to the new proposal
 * @param {*} user the user to be added as a stakeholder
 */
export const addStakeholder = (user, access_level) => async (dispatch) => {
  console.log('we want to add this user a stakeholder', user);
  return dispatch({
    type: ADD_STAKEHOLDER,
    payload: {
      user,
      access_level,
    },
  });
};

export const addSupplier = (supplier) => async (dispatch) => {
  console.log('We want to add a supplier', supplier);
  dispatch({
    type: ADD_SUPPLIER,
    payload: supplier,
  });
};
