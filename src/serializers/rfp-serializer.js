import
{
  mergeDateAndTime, getDateOnly, getTimeOnly, convertTimeToDisplay,
} from '../utils/app/index';

/**
 * format incoming data
 * @param {*} proposal
 */
export const deserializeProposal = (proposal) => {
  const newProposal = {
    id: proposal.id,
    title: proposal.title,
    description: proposal.description,
    bid_deadline_date: getDateOnly(proposal.bid_deadline),
    rsvp_deadline_date: getDateOnly(proposal.rsvp_deadline),
    question_deadline_date: getDateOnly(proposal.question_deadline),
    bid_deadline_time: convertTimeToDisplay(getTimeOnly(proposal.bid_deadline)),
    rsvp_deadline_time: convertTimeToDisplay(getTimeOnly(proposal.rsvp_deadline)),
    question_deadline_time: convertTimeToDisplay(getTimeOnly(proposal.question_deadline)),
    published_at: proposal.published_at,
    currency: proposal.currency,
    files: (proposal.proposal_attachments && proposal.proposal_attachments.map((req) => ({
      id: req.id,
      title: req.title,
      file: req.file,
    }))),
    suppliers: (proposal.proposal_suppliers && proposal.proposal_suppliers.map((s) => ({
      id: s.id,
      uid: s.uid,
      email: (s.tenant_supplier && s.tenant_supplier.tenant.email),
      phone: (s.tenant_supplier && s.tenant_supplier.tenant.phone),
      company_name: (s.tenant_supplier && s.tenant_supplier.tenant.company_name),
      account_id: (s.tenant_supplier && s.tenant_supplier.tenant.account_id),
      country: (s.tenant_supplier && s.tenant_supplier.tenant.country),
      timezone: (s.tenant_supplier && s.tenant_supplier.tenant.timezone),
    }))),
    stakeholders: (proposal.proposal_stakeholders && proposal.proposal_stakeholders.map((s) => ({
      id: s.id,
      user_id: s.user_id,
      access_level: s.access_level,
    }))),
    documents: (proposal.proposal_response_sheet
      && proposal.proposal_response_sheet.proposal_document_requests
      && proposal.proposal_response_sheet.proposal_document_requests.map((doc) => ({
        id: doc.id,
        name: doc.document_name,
        description: doc.description,
      }))),
    questions: (proposal.proposal_response_sheet
      && proposal.proposal_response_sheet.proposal_questions
      && proposal.proposal_response_sheet.proposal_questions.map((question) => ({
        id: question.id,
        question: question.question,
      }))),
  };
  return newProposal;
};

/**
 * format outgoing data
 * @param {*} proposal
 */
export const serializeProposal = (proposal) => {
  const newProposal = {
    title: proposal.title,
    tenant_id: proposal.tenant_id,
    description: proposal.description,
    bid_deadline: mergeDateAndTime(proposal.bid_deadline_date,
      proposal.bid_deadline_time),
    rsvp_deadline: mergeDateAndTime(proposal.rsvp_deadline_date,
      proposal.rsvp_deadline_time),
    question_deadline: mergeDateAndTime(proposal.question_deadline_date,
      proposal.question_deadline_time),
    currency_id: proposal.currency_id,
    proposal_stakeholders_attributes: proposal.stakeholders
      .map((user) => (
        {
          user_id: user.id,
          access_level: user.access_level,
        })),
    proposal_suppliers_attributes: proposal.suppliers.map((s) => (
      {
        supplier_id: s.id,
      })),
    proposal_attachments_attributes: proposal.files.map((f) => ({
      file: f.url,
      title: f.title,
    })),
  };

  // attach the response sheet
  newProposal.proposal_response_sheet_attributes = {
    proposal_document_requests_attributes: proposal.documents
      .map((doc) => ({ document_name: doc.name, description: doc.description })),
    proposal_questions_attributes: proposal.questions
      .map((question) => ({ question: question.question })),
  };
  return newProposal;
};

export const serializeRfpMessage = (message) => {
  const newMessage = {
    subject: message.subject,
    message: message.message,
    proposal_request_id: message.rfp_id,
    rfp_message_attachments_attributes: message.files.map((f) => ({
      file_url: f.url,
      title: f.title,
    })),
  };
  return newMessage;
};

export const deserializeRfpMessage = (message) => {
  const newMessage = {
    id: message.id,
    user_id: message.user_id,
    message: message.message,
    attachments: message.rfp_message_attachments.map((a) => ({
      id: a.id,
      title: a.title,
      file_url: a.file_url,
    })),
  };
  return newMessage;
};
