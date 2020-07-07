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
} from '../types/ui';

const initialState = {
  buyer: {
    isLoadingRFP: false,
    isPublishingRfp: false,
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

    case LOADING_RSVP_CLOSING_SOON: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          isLoadingRSVPClosing: false,
        },
      };
    }

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

    default: {
      return { ...state };
    }
  }
};
