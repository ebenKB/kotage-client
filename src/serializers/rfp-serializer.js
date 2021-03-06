/* eslint-disable camelcase */
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

    suppliers: (proposal.proposal_suppliers && proposal.proposal_suppliers.map((supplier) => {
      const s = supplier.supplier.tenant_supplier.tenant;
      // eslint-disable-next-line no-shadow
      const { id, supplier_id } = supplier;
      return {
        id,
        supplier_id,
        uid: s.uid,
        email: s.email,
        phone: s.phone,
        company_name: s.company_name,
        account_id: s.account_id,
        country: s.country,
        timezone: s.timezone,
      };
    })),

    stakeholders: (proposal.proposal_stakeholders && proposal.proposal_stakeholders.map((s) => ({
      id: s.id,
      user_id: s.user_id,
      access_level: s.access_level,
    }))),

    // attach the proposal responses
    response_sheet_id: proposal.proposal_response_sheet.id,
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
        key: question.id,
        question: question.question,
      }))),
  };

  return newProposal;
};

/**
 * format outgoing data
 * @param {*} proposal
 */
export const serializeProposal = (proposal, type = 'create') => {
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
    // proposal_stakeholders_attributes: proposal.stakeholders
    //   .map((user) => (
    //     {
    //       user_id: user.id,
    //       access_level: user.access_level,
    //     })),
    // proposal_suppliers_attributes: proposal.suppliers.map((s) => (
    //   {
    //     supplier_id: s.id,
    //   })),
    // proposal_attachments_attributes: proposal.files.map((f) => ({
    //   file: f.url,
    //   title: f.title,
    // })),
  };

  if (type === 'create') { // attach associated records without their IDs
    newProposal.proposal_stakeholders_attributes = proposal.stakeholders
      .map((user) => ({
        user_id: user.id,
        access_level: user.access_level,
      }));

    newProposal.proposal_suppliers_attributes = proposal.suppliers.map((s) => (
      {
        supplier_id: s.id,
        // supplier_id: s.supplier_id,
      }));

    newProposal.proposal_attachments_attributes = proposal.files.map((f) => ({
      file: f.url,
      title: f.title,
    }));

    newProposal.proposal_response_sheet_attributes = {
      proposal_document_requests_attributes: proposal.documents
        .map((doc) => ({ document_name: doc.name, description: doc.description })),

      proposal_questions_attributes: proposal.questions
        .map((question) => ({ question: question.question })),
    };
  } else if (type === 'edit') { // add IDs to associated records
    newProposal.proposal_stakeholders_attributes = proposal.stakeholders
      .map((s) => ({
        id: s.id,
        user_id: s.user_id,
        access_level: s.access_level,
      }));

    newProposal.proposal_suppliers_attributes = proposal.suppliers.map((s) => (
      {
        id: s.id,
        supplier_id: s.supplier_id,
      }));

    newProposal.proposal_attachments_attributes = proposal.files.map((f) => ({
      id: f.id,
      file: f.url,
      title: f.title,
    }));

    newProposal.proposal_response_sheet_attributes = {
      id: proposal.response_sheet_id,
      proposal_document_requests_attributes: proposal.documents
        .map((doc) => ({
          id: doc.id,
          document_name: doc.name,
          description: doc.description,
        })),

      proposal_questions_attributes: proposal.questions
        .map((question) => ({
          id: question.id,
          question: question.question,
        })),
    };
  }

  // attach the response sheet
  // newProposal.proposal_response_sheet_attributes = {
  //   proposal_document_requests_attributes: proposal.documents
  //     .map((doc) => ({ document_name: doc.name, description: doc.description })),
  //   proposal_questions_attributes: proposal.questions
  //     .map((question) => ({ question: question.question })),
  // };
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
      file: a.file_url,
    })),
  };
  return newMessage;
};

export const deserializeRfpBid = (bid) => {
  const {
    supplier, technical_requirements, commercial_requirements, rfp_answers, ...rest
  } = bid;
  const { tenant_supplier: { id, tenant, ...rem } } = supplier;
  return {
    ...rest,
    rfpAnswer: rfp_answers,
    technicalRequirements: technical_requirements,
    commercialRequirements: commercial_requirements,
    supplier: {
      ...rem,
      ...tenant,
      id: supplier.id,
      supplier_id: id,
    },
  };
};
