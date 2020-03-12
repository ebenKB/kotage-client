/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import shortid from 'shortid';
import {
  CREATE_PROPOSAL, SET_RFP_OWNER, ADD_STAKEHOLDER, ADD_SUPPLIER, REQUEST_NEW_DOCUMENT,
  DELETE_PROPOSAL_DOCUMENT,
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
export const addStakeholder = (user, access_level) => async (dispatch) => dispatch({
  type: ADD_STAKEHOLDER,
  payload: {
    user,
    access_level,
  },
});


export const requestNewProposalDocument = () => async (dispatch) => dispatch({
  type: REQUEST_NEW_DOCUMENT,
  payload: {
    id: shortid.generate(),
    name: '',
    title: '',
  },
});

export const deleteProposalDocument = (id) => async (dispatch) => dispatch({
  type: DELETE_PROPOSAL_DOCUMENT,
  payload: id,
});

export const addSupplier = (supplier) => async (dispatch) => {
  console.log('We want to add a supplier', supplier);
  dispatch({
    type: ADD_SUPPLIER,
    payload: supplier,
  });
};
