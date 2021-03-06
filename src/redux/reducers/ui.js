import {
  LOADING_RECENT_ACTIVITIES,
  RECENT_ACTIVITIES_DONE_LOADING,
  LOADING_BIDS,
  IS_PUBLISHING_RFP,
  BIDS_DONE_LOADING,
  LOADING_ANALYTICS,
  ANALYTICS_DONE_LOADING,
  LOADING_SUPPLIER_RFP_CLOSING_SOON,
  SUPPLIER_RFP_CLOSING_DONE_LOADING,
  LOADING_RSVP_CLOSING_SOON,
  DONE_PUBLISHING_RFP,
  IS_SENDING_FEEDBACK,
  DONE_SENDING_FEEDBACK,
  IS_FETCHING_RFP_STAKEHOLDER,
  DONE_FETCHING_RFP_STAKEHOLDER,
  IS_UPDATING_RFP,
  DONE_UPDATING_RFP,
  IS_UPDATING_ACCOUNT,
  DONE_UPDATING_ACCOUNT,
  REVISE_BID_LOADING,
  REVISE_BID_DONE_LOADING,
} from '../types/ui';

const initialState = {
  buyer: {
    isLoadingRFP: false,
    isUpdatingRfp: false,
    isPublishingRfp: false,
    isSendingFeedback: false,
    isFetchingRfpStakeholder: false,
    isUpdatingAccount: false,
    isRevisingBid: false,
  },
  supplier: {
    isLoadingSupplierRfp: false,
    isLoadingRecentActivities: false,
    isLoadigBids: false,
    isLoadingAnalytics: false,
    isLoadingRSVPClosing: false,
    isLoadingSupplierRfpClosing: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    // buyer activities
    case IS_PUBLISHING_RFP: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isPublishingRfp: true,
        },
      };
    }

    case DONE_PUBLISHING_RFP: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isPublishingRfp: false,
        },
      };
    }

    case IS_SENDING_FEEDBACK: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isSendingFeedback: true,
        },
      };
    }

    case DONE_SENDING_FEEDBACK: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isSendingFeedback: false,
        },
      };
    }

    case IS_FETCHING_RFP_STAKEHOLDER: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isFetchingRfpStakeholder: true,
        },
      };
    }

    case DONE_FETCHING_RFP_STAKEHOLDER: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isFetchingRfpStakeholder: false,
        },
      };
    }

    case IS_UPDATING_RFP: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isUpdatingRfp: true,
        },
      };
    }

    case DONE_UPDATING_RFP: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isUpdatingRfp: false,
        },
      };
    }

    case IS_UPDATING_ACCOUNT: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isUpdatingAccount: true,
        },
      };
    }

    case DONE_UPDATING_ACCOUNT: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isUpdatingAccount: false,
        },
      };
    }

    case REVISE_BID_LOADING: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isRevisingBid: true,
        },
      };
    }

    case REVISE_BID_DONE_LOADING: {
      return {
        ...state,
        buyer: {
          ...state.buyer,
          isRevisingBid: false,
        },
      };
    }
    // end buyer activites
    // supplier activities
    case LOADING_BIDS: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingBids: true,
        },
      };
    }

    case BIDS_DONE_LOADING: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingBids: false,
        },
      };
    }

    case LOADING_ANALYTICS: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingAnalytics: true,
        },

      };
    }

    case ANALYTICS_DONE_LOADING: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingAnalytics: false,
        },
      };
    }

    case LOADING_RSVP_CLOSING_SOON: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingRSVPClosing: false,
        },
      };
    }

    case LOADING_RECENT_ACTIVITIES: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingRecentActivities: true,
        },
      };
    }

    case RECENT_ACTIVITIES_DONE_LOADING: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingRecentActivities: false,
        },
      };
    }

    case LOADING_SUPPLIER_RFP_CLOSING_SOON: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingSupplierRfpClosing: true,
        },
      };
    }

    case SUPPLIER_RFP_CLOSING_DONE_LOADING: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingSupplierRfpClosing: false,
        },
      };
    }
    // end supplier activities
    default: {
      return { ...state };
    }
  }
};
