/* eslint-disable camelcase */
const transformBidRecentActivity = (activity) => {
  const {
    key, trackable_id, trackable_type, owner_id,
  } = activity;
  const recentActivity = {
    bidID: trackable_id,
    ownerID: owner_id,
  };
  if (key === 'rfp_bid.update') {
    recentActivity.message = `${trackable_type.toUpperCase()} ${trackable_id} was updated`;
  } else if (key === 'rfp_bid.create') {
    recentActivity.message = `${trackable_type} ${trackable_id} was created.`;
  } else if (key === 'rfp_bid.destroy') {
    recentActivity.message = `${trackable_type} ${trackable_id} was deleted`;
  }
  console.log('This is the activity', recentActivity);
  return recentActivity;
};

export default transformBidRecentActivity;
