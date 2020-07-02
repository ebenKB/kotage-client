/* eslint-disable camelcase */
export const transformBidRecentActivity = (activity) => {
  const {
    key, trackable_id, trackable_type, owner_id,
  } = activity;
  const recentActivity = {
    bidID: trackable_id,
    ownerID: owner_id,
  };
  if (key === 'rfp_bid.update') {
    recentActivity.message = `${trackable_type.toUpperCase()} ${trackable_id} was updated.`;
    recentActivity.type = 'update';
  } else if (key === 'rfp_bid.create') {
    recentActivity.message = `${trackable_type.toUpperCase()} ${trackable_id} was created.`;
    recentActivity.type = 'create';
  } else if (key === 'rfp_bid.destroy') {
    recentActivity.message = `${trackable_type.toUpperCase()} ${trackable_id} was deleted.`;
    recentActivity.type = 'delete';
  }
  return recentActivity;
};

export const transformSupplierRfpAnalytics = (analytics) => ({
  bidSubmitted: analytics.bid_submissions,
  bidsClaimed: analytics.claimed_but_not_submitted_bid,
  eventInvites: analytics.event_invites,
  pendingAction: analytics.no_action,
  notAttendedTo: analytics.event_invites - analytics.bid_submissions,
});
