import
{
  getDateOnly, getTimeOnly, convertTimeToDisplay,
} from '../utils/app/index';

export const deserializeProposal = (proposal) => {
  const newProposal = {
    id: proposal.id,
    title: proposal.title,
    description: proposal.description,
    bid_deadline: proposal.bid_deadline,
    rsvp_deadline: proposal.rsvp_deadline,
    question_deadline: proposal.question_deadline,
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
    tenant: (proposal.tenant && {
      id: proposal.tenant.id,
      company_name: proposal.tenant.company_name,
      email: proposal.tenant.email,
    }),
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
    hasConfirmedRSVP: proposal.hasConfirmedRSVP !== undefined ? proposal.hasConfirmedRSVP : false,
    hasAcceptedTerms: proposal.hasAcceptedTerms !== undefined ? proposal.hasAcceptedTerms : false,
  };
  return newProposal;
};

export const serializeSupplierRfp = (rfp) => {
  console.log('This is the rfp', rfp);
};
