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
  GET_SUPPLIER_RFP_ANALYTICS,
  GET_PROPOSALS_CLOSING_SOON,
  GET_RSVP_CLOSING_SOON,
  GET_SUPPLIER_RFP_INBOX,
  FIND_SUPPLIER_RFP_MESSAGE_BY_ID,
  GET_SUPPLIER_SENT_MESSAGES,
  CREATE_SUPPLIER_RFP_MESSAGE,
  SET_CURRENT_SUPPLIER_INBOX,
  SET_CURRENT_SUPPLIER_OUTBOX,
  FIND_SUPPLIER_OUTBOX_BY_ID,
} from '../types/supplierTypes';

const initialState = {
  loading: false,
  proposals: [],
  currentProposal: null,
  rfpInbox: null,
  rfpOutbox: null,
  currentMessage: null,
  currentMessageType: 'inbox',
  rfpOutboxMeta: null,
  rfpInboxMeta: null,
  meta: null,
  currentPage: 1,
  bidResponseDraft: null,
  recentActivities: {
    meta: null,
    data: null,
  },
  analytics: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    case GET_SUPPLIER_RFP_ANALYTICS: {
      return {
        ...state,
        analytics: action.payload,
      };
    }

    case GET_PROPOSALS_CLOSING_SOON: {
      let { analytics } = state;
      if (analytics === null) {
        analytics = {
          proposalsClosingSoon: action.payload,
        };
      } else {
        analytics.proposalsClosingSoon = action.payload;
      }
      return {
        ...state,
        analytics: { ...analytics },
      };
    }

    case GET_RSVP_CLOSING_SOON: {
      let { analytics } = state;
      if (analytics === null) {
        analytics = {
          RSVPClosingSoon: action.payload,
        };
      } else {
        analytics.RSVPClosingSoon = action.payload;
      }
      return {
        ...state,
        analytics: { ...analytics },
      };
    }

    case VIEW_BIDS: {
      return {
        ...state,
      };
    }

    case GET_SUPPLIER_RFP_INBOX: {
      const messages = action.payload;
      if (messages) {
        return {
          ...state,
          rfpInbox: [...messages],
        };
      } return { ...state };
    }

    case FIND_SUPPLIER_RFP_MESSAGE_BY_ID: {
      return {
        ...state,
        currentMessage: action.payload,
      };
    }

    case FIND_SUPPLIER_OUTBOX_BY_ID: {
      return {
        ...state,
        currentMessage: action.payload,
      };
    }

    case GET_SUPPLIER_SENT_MESSAGES: {
      const { data, meta } = action.payload;
      return {
        ...state,
        rfpOutbox: [...data],
        meta,
      };
    }

    case CREATE_SUPPLIER_RFP_MESSAGE: {
      const { rfpOutbox } = state;
      let updateBox = null;
      if (rfpOutbox === null) {
        updateBox = action.payload;
      } else {
        updateBox = [action.payload, ...rfpOutbox];
      }
      return {
        ...state,
        rfpOutbox: updateBox,
      };
    }

    case SET_CURRENT_SUPPLIER_INBOX: {
      return {
        ...state,
        currentMessage: action.payload,
      };
    }

    case SET_CURRENT_SUPPLIER_OUTBOX: {
      return {
        ...state,
        currentMessage: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};
