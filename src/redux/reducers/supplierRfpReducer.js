import {
  GET_SUPPLIER_RFP,
  SET_CURRENT_SUPPLIER_RFP,
  FIND_SUPPLIER_EVENT_BY_ID,
  GET_SUPPLIER_RFP_BY_ID,
  CLEAR_CURRENT_RFP,
  CONFIRM_RSVP,
  REVOKE_RSVP,
  CHECK_SUPPLIER_CLAIMS,
  SET_SUPPLIER_LOADING,
  SET_SUPPLIER_DONE_LOADING,
  VIEW_BIDS,
  GET_RECENT_ACTIVITIES,
} from '../types/supplierTypes';

const initialState = {
  loading: false,
  proposals: [],
  currentProposal: null,
  rfpInbox: null,
  rfpOutbox: null,
  currentOutbox: null,
  currentInbox: null,
  rfpOutboxMeta: null,
  rfpInboxMeta: null,
  meta: null,
  currentPage: 1,
  bidResponseDraft: null,
  recentActivities: {
    meta: null,
    data: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case CREATE_BID_RESPONSE: {
    //   return {
    //     ...state,
    //     bids: [action.payload, ...state.bids],
    //   };
    // }

    case GET_SUPPLIER_RFP: {
      return {
        ...state,
        proposals: action.payload.proposals,
        currentProposal: null,
        meta: action.payload.meta,
        loading: false,
      };
    }

    case SET_CURRENT_SUPPLIER_RFP: {
      return {
        ...state,
        currentProposal: action.payload,
      };
    }

    case FIND_SUPPLIER_EVENT_BY_ID: {
      return {
        ...state,
        currentProposal: action.payload,
      };
    }

    case GET_SUPPLIER_RFP_BY_ID: {
      return {
        ...state,
        currentProposal: { ...action.payload },
      };
    }

    case CLEAR_CURRENT_RFP: {
      return {
        ...state,
        currentProposal: null,
      };
    }

    case CONFIRM_RSVP: {
      return {
        ...state,
        currentProposal: {
          ...state.currentProposal,
          hasConfirmedRSVP: true,
        },
      };
    }

    case CHECK_SUPPLIER_CLAIMS: {
      const data = action.payload;
      const proposal = state.currentProposal;
      if (data.agreed_to_participate) {
        proposal.hasAcceptedTerms = true;
      }
      if (data.claimed) {
        proposal.hasConfirmedRSVP = true;
      }
      return {
        ...state,
        currentProposal: { ...proposal },
      };
    }

    case REVOKE_RSVP: {
      return {
        ...state,
        currentProposal: {
          ...state.currentProposal,
          hasConfirmedRSVP: false,
        },
      };
    }

    case SET_SUPPLIER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case SET_SUPPLIER_DONE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case GET_RECENT_ACTIVITIES: {
      const { meta } = action.payload;
      let { recentActivities: { data } } = state;
      if (data === null) {
        data = [];
      }
      return {
        ...state,
        recentActivities: {
          meta,
          data: [...data, ...action.payload.data],
        },
      };
    }

    case VIEW_BIDS: {
      return {
        ...state,
      };
    }

    default: {
      return { ...state };
    }
  }
};
