/* eslint-disable camelcase */
export const transformBidRecentActivity = (activity) => {
  const {
    key, trackable_id, trackable_type, owner_id, message,
  } = activity;
  const recentActivity = {
    bidID: trackable_id,
    ownerID: owner_id,
    message,
  };
  if (key === 'tenant.updated_event') {
    recentActivity.customeMessage = `${trackable_type.toUpperCase()} ${trackable_id} was updated.`;
    recentActivity.type = 'update';
  } else if (key === 'rfp_bid.create') {
    recentActivity.customeMessage = `${trackable_type.toUpperCase()} ${trackable_id} was created.`;
    recentActivity.type = 'create';
  } else if (key === 'rfp_bid.destroy') {
    recentActivity.customMessage = `${trackable_type.toUpperCase()} ${trackable_id} was deleted.`;
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
