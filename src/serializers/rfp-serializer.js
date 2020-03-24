import { mergeDateAndTime } from '../utils/app/index';

export const deSerializerProposal = (proposal) => {
  console.log('return a new format', proposal);

  const newProposal = {
    title: proposal.title,
    description: proposal.description,
    bid_deadline_date: '',
    rsvp_deadline_date: '',
    question_deadline_date: '',
    bid_deadline_time: '',
    rsvp_deadline_time: '',
    question_deadline_time: '',
    published_at: proposal.published_at,
    currency: proposal.currency,
    files: proposal.attachments,
    suppliers: proposal.proposal_suppliers,
    stakeholders: proposal.proposal_stakeholders,
    documents: proposal.proposal_response_sheeet.proposal_document_requests,
    questions: proposal.proposal_response_sheeet.proposal_questions,
  };
  return newProposal;
};

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
        supplier_id: s.supplier_id,
      })),
    proposal_attachments_attributes: proposal.files.map((f) => ({
      file: f.location,
    })),
  };

  // attach the response sheet
  newProposal.proposal_response_sheet_attributes = {
    proposal_document_requests_attributes: proposal.documents
      .map((doc) => ({ name: doc.name, description: doc.description })),
    proposal_questions_attributes: proposal.questions
      .map((question) => ({ question: question.question })),
  };
  return newProposal;
};
