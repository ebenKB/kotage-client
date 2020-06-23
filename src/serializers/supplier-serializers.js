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
  currency: bid.currency,
  technical_requirements_attributes: bid.technicalRequirements
    .map((t) => ({ filename: t.title, url: t.url })),
  commercial_requirements_attributes: bid.commercialRequirements
    .map((c) => ({ filename: c.title, url: c.url })),
  rfp_answers_attributes: null,
});

export const deserializeSupplierBid = (bid) => ({
  currency: bid.currency,
});
