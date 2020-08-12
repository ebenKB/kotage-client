/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProposalQuestionByID } from '../../redux/actions/rfpActions';
import { getSupplierProposalQuestionByID } from '../../redux/actions/supplierRfpActions';

const BidQuestionResponse = ({
  response, accountType, getQuestionDetials, getSupplierRfpQuestionDetials,
}) => {
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (accountType === 'buyer') {
      getQuestionDetials(response.proposal_question_id)
        .then((ques) => setQuestion(ques));
    } else if (accountType === 'supplier') {
      getSupplierRfpQuestionDetials(response.proposal_question_id)
        .then((ques) => setQuestion(ques));
    }
  }, []);

  return (
	<Table.Row>
		<Table.Cell>
			{question.question}
		</Table.Cell>
		<Table.Cell>
			{response.answer}
		</Table.Cell>
	</Table.Row>
  );
};

BidQuestionResponse.propTypes = {
  response: PropTypes.object.isRequired,
  accountType: PropTypes.string.isRequired,
  getQuestionDetials: PropTypes.func.isRequired,
  getSupplierRfpQuestionDetials: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getQuestionDetials: getProposalQuestionByID,
  getSupplierRfpQuestionDetials: getSupplierProposalQuestionByID,
};

export default connect(null, mapDispatchToProps)(BidQuestionResponse);
