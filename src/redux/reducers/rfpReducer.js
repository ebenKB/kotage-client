import {
  CREATE_PROPOSAL,
  SET_RFP_LOADING,
  SET_RFP_DONE_LOADING,
  GET_RFP,
  GET_PROPOSAL_BY_ID,
  CREATE_MESSAGE,
  GET_RFP_INBOX,
  GET_RFP_OUTBOX,
  FIND_RFP_MESSAGE,
  UPDATE_RFP,
  SET_CURRENT_MESSAGE_BLOB,
} from '../types/rfpTypes';

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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROPOSAL: {
      if (action.payload) {
        return {
          ...state,
          proposals: [state.proposals, action.payload],
          loading: false,
        };
      }
      return { ...state };
    }

    case SET_RFP_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case SET_RFP_DONE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case GET_RFP: {
      const { proposals } = action.payload;
      // let { currentPage } = state;
      // if (action.payload.meta.next) {
      //   currentPage = +1;
      // }
      return {
        ...state,
        proposals: [...state.proposals, ...proposals],
        meta: action.payload.meta,
        currentPage: action.payload.page,
        loading: false,
      };
    }

    case GET_PROPOSAL_BY_ID: {
      const proposal = state.proposals.find((p) => parseInt(p.id, 10)
        === parseInt(action.payload, 10));
      return {
        ...state,
        currentProposal: proposal,
        loading: false,
      };
    }

    case CREATE_MESSAGE: {
      const outbox = state.rfpOutbox;
      let rfpMessages = null;
      if (outbox !== null) {
        rfpMessages = [...outbox, action.payload];
      } else {
        rfpMessages = [action.payload];
      }
      return {
        ...state,
        rfpOutbox: rfpMessages,
        loading: false,
      };
    }

    case GET_RFP_INBOX: {
      return {
        ...state,
        rfpInbox: null,
        loading: false,
      };
    }

    case GET_RFP_OUTBOX: {
      return {
        ...state,
        rfpOutbox: action.payload.data,
        rfpOutboxMeta: action.payload.meta,
        loading: false,
      };
    }

    case FIND_RFP_MESSAGE: {
      if (!state.currentOutbox || action.payload.id !== state.currentOutbox.id) {
        return {
          ...state,
          currentOutbox: action.payload,
        };
      }
      return state;
    }

    case SET_CURRENT_MESSAGE_BLOB: {
      let newWBlobs = [];
      if (state.currentOutbox.files) {
        newWBlobs = [...state.currentOutbox.files, action.payload];
      } else {
        newWBlobs = [action.payload];
      }
      return {
        ...state,
        currentOutbox: { ...state.currentOutbox, files: newWBlobs },
      };
    }
    case UPDATE_RFP: {
      return {
        ...state,
        currentProposal: action.payload,
      };
    }

    default: return state;
  }
};
