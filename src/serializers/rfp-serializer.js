import { mergeDateAndTime, getDateOnly, getTimeOnly } from '../utils/app/index';

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
    bid_deadline_time: getTimeOnly(proposal.bid_deadline),
    rsvp_deadline_time: getTimeOnly(proposal.rsvp_deadline),
    question_deadline_time: getTimeOnly(proposal.question_deadline),
    published_at: proposal.published_at,
    currency: proposal.currency,
    files: (proposal.proposal_attachments && proposal.proposal_attachments.map((req) => ({
      id: req.id,
      title: req.title,
      file: req.file,
    }))),
    suppliers: proposal.proposal_suppliers,
    stakeholders: (proposal.proposal_stakeholders && proposal.proposal_stakeholders.map((s) => ({
      id: s.id,
      user_id: s.user_id,
      access_level: s.access_level,
    }))),
    documents: (proposal.proposal_response_sheet
      && proposal.proposal_response_sheet.proposal_document_requests
      && proposal.proposal_response_sheet.proposal_document_requests.map((doc) => ({
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
        id: s.id,
      })),
    proposal_attachments_attributes: proposal.files.map((f) => ({
      file: f.location,
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
