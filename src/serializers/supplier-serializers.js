
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
    .map((t) => ({
      id: t.id, filename: t.title, url: t.url, _destroy: t.destroy,
    })),
  commercial_requirements_attributes: bid.commercialRequirements
    .map((c) => ({
      id: c.id, filename: c.title, url: c.url, _destroy: c.destroy,
    })),
  rfp_answers_attributes: bid.rfpQuestionResponses,
});

export const deserializeSupplierBid = (bid) => {
  const { supplier } = bid;
  const { tenant_supplier: { id, tenant, ...rem } } = supplier;
  return {
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
    supplier_old: {
      id: bid.supplier.id,
    },
    supplier: {
      ...rem,
      ...tenant,
      id: supplier.id,
      supplier_id: id,
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
    bidAt: bid.bid_at,
  };
};


export const deSerializeRfpSupplierInbox = (data) => {
  const { rfp_message } = data;
  return {
    supplierRfpMessageID: data.id,
    read: data.read,
    reatAt: data.read_at,
    // message_id: rfp_message.id,
    id: rfp_message.id,
    from: rfp_message.from,
    message: rfp_message.message,
    proposalRequestID: rfp_message.proposal_request_id,
    subject: rfp_message.subject,
    attachments: rfp_message.rfp_message_attachments,
    to: rfp_message.to,
    user_id: rfp_message.user_id,
  };
};

export const deserializeSupplierMessage = (data) => {
  const {
    id,
    user_id,
    proposal_request_id,
    from,
    to,
    subject,
    supplier_rfp_message_id,
    supplier_id,
    read,
    read_at,
    message,
  } = data;
  return {
    message_id: supplier_rfp_message_id,
    user_id,
    proposalOwner: proposal_request_id,
    from,
    to,
    subject,
    supplierRfpMessageID: id,
    supplierID: supplier_id,
    read,
    readAt: read_at,
    message,
  };
};
