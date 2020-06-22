export const serializeSupplierBid = (bid) => ({
  totalBidAmount: bid.total_amount,
});

export const deserializeSupplierBid = (bid) => ({
  totalBidAmount: bid.total_amount,
});
