import {
  LOADING_BIDS,
  BIDS_DONE_LOADING,
  LOADING_ANALYTICS,
  ANALYTICS_DONE_LOADING,
  LOADING_RECENT_ACTIVITIES,
  RECENT_ACTIVITIES_DONE_LOADING,
  LOADING_RSVP_CLOSING_SOON,
  RSVP_CLOSING_SOON_DONE_LOADING,
  LOADING_SUPPLIER_RFP_CLOSING_SOON,
  SUPPLIER_RFP_CLOSING_DONE_LOADING,
  IS_PUBLISHING_RFP,
  DONE_PUBLISHING_RFP,
  IS_SENDING_FEEDBACK,
  DONE_SENDING_FEEDBACK,
  IS_FETCHING_RFP_STAKEHOLDER,
  DONE_FETCHING_RFP_STAKEHOLDER,
} from '../types/ui';

// supplier actions
export const setBidLoading = () => async (dispatch) => dispatch({
  type: LOADING_BIDS,
});

export const bidDoneLoading = () => async (dispatch) => dispatch({
  type: BIDS_DONE_LOADING,
});

export const setAnalyticsLoading = () => async (dispatch) => dispatch({
  type: LOADING_ANALYTICS,
});

export const setAnalyticsDoneLoading = () => async (dispatch) => dispatch({
  type: ANALYTICS_DONE_LOADING,
});

export const setRecentActivitiesLoading = () => async (dispatch) => dispatch({
  type: LOADING_RECENT_ACTIVITIES,
});

export const setRecentActivitiesDoneLoading = () => async (dispatch) => dispatch({
  type: RECENT_ACTIVITIES_DONE_LOADING,
});

export const setRSVPClosingLoading = () => async (dispatch) => dispatch({
  type: LOADING_RSVP_CLOSING_SOON,
});

export const RSVPClosingDoneLoading = () => async (dispatch) => dispatch({
  type: RSVP_CLOSING_SOON_DONE_LOADING,
});

export const supplierRfpClosingLoading = () => async (dispatch) => dispatch({
  type: LOADING_SUPPLIER_RFP_CLOSING_SOON,
});

export const supplierRfpClosingDoneloading = () => async (dispatch) => dispatch({
  type: SUPPLIER_RFP_CLOSING_DONE_LOADING,
});

export const setPublishRfpLoading = () => async (dispatch) => dispatch({
  type: IS_PUBLISHING_RFP,
});

export const setPublishRfpDoneLoding = () => async (dispatch) => dispatch({
  type: DONE_PUBLISHING_RFP,
});

export const setSendUserFeedackLoading = () => async (dispatch) => dispatch({
  type: IS_SENDING_FEEDBACK,
});

export const setSendUserFeedbackDoneLoading = () => async (dispatch) => dispatch({
  type: DONE_SENDING_FEEDBACK,
});

export const setGetRfpStakeholderLoading = () => async (dispatch) => dispatch(
  { type: IS_FETCHING_RFP_STAKEHOLDER },
);

export const setGetRfpStakeholderDoneLoading = () => async (dispatch) => (dispatch({
  type: DONE_FETCHING_RFP_STAKEHOLDER,
}));
