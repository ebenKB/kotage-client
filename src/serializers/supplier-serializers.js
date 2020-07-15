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
  id: bid.id,
  event_owner_id: bid.event_owner_id,
  bid_amount: bid.totalBidValue,
  bid_validity: bid.bidValidity,
  proposal_request_id: bid.rfpID,
  bid_currency: bid.currency,
  technical_requirements_attributes: bid.technicalRequirements
    .map((t) => ({ id: t.id, filename: t.title, url: t.url })),
  commercial_requirements_attributes: bid.commercialRequirements
    .map((c) => ({ id: c.id, filename: c.title, url: c.url })),
  rfp_answers_attributes: bid.rfpQuestionResponses,
});

export const deserializeSupplierBid = (bid) => ({
  id: bid.id,
  event_owner_id: bid.event_owner_id,
  proposal_request_id: bid.proposal_request_id,
  ownerUID: bid.owner_uid,
  status: bid.status,
  currency: {
    name: bid.bid_currency.split('_')[0].toUpperCase(),
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
  technicalRequirements: bid.technical_requirements.map((t) => ({
    id: t.id,
    title: t.filename,
    file: t.url,
  })),
  commercialRequirements: bid.commercial_requirements.map((c) => ({
    id: c.id,
    title: c.filename,
    file: c.url,
  })),
  bid_date: bid.bid_at,
});
