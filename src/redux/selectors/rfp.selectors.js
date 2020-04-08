import { createSelector } from 'reselect';

const AllRFPs = (state) => state.rfp;

export const selectAllProposals = createSelector([AllRFPs], (rfp) => rfp.proposals);

export const selectRFPCount = createSelector(
  [selectAllProposals],
  (proposals) => proposals.length(),
);

export const hasRFPLoaded = createSelector(
  [selectAllProposals],
  (proposals) => proposals.length > 0,
);

export const getAllRfpInbox = createSelector([AllRFPs], (rfp) => rfp.rfpInbox);

export const getAllRfpOutbox = createSelector([AllRFPs], (rfp) => rfp.rfpOutbox);
