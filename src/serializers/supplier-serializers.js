/* eslint-disable camelcase */
export const deserializeSupplier = (supplier) => {
  const { tenant_supplier, id } = supplier;
  const { tenant } = tenant_supplier;
  const newSupplier = {
    id,
    email: tenant.email,
    company_name: tenant.company_name,
    phone: tenant.phone,
    account_id: tenant.account_id,
    country: tenant.country,
    timezone: tenant.timezone,
  };
  return newSupplier;
};

export const serializeSupplierBid = (bid) => ({
  bid_amount: bid.totalBidValue,
  proposal_request_id: bid.rfpID,
  bid_currency: bid.currency,
  technical_requirements_attributes: bid.technicalRequirements
    .map((t) => ({ filename: t.title, url: t.url })),
  commercial_requirements_attributes: bid.commercialRequirements
    .map((c) => ({ filename: c.title, url: c.url })),
  rfp_answers_attributes: bid.rfpQuestionResponses,
});

export const deserializeSupplierBid = (bid) => ({
  id: bid.id,
  ownerUID: bid.owner_uid,
  currency: {
    name: bid.bid_currency.split('_')[0],
    symbol: bid.bid_currency.split('_')[1],
  },
  totalBidValue: bid.bid_amount,
  bidValidity: bid.bid_validity,
  buyerAccepted: bid.buyer_accepted,
  revised: bid.revised,
  rfpAnswers: bid.rfp_answers,
  rfpID: bid.proposal_request_id,
  supplier: {
    id: bid.supplier.id,
  },
  technicalRequirements: bid.technical_requirements,
  commercialRequirements: bid.commercial_requirements,
  bid_date: bid.bid_at,
});
