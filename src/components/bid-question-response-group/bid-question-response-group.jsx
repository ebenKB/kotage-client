/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'semantic-ui-react';
import BidQuestionResponse from '../bid-question-response/bid-question-response';

const BidQuestionResponseGroup = ({ data, accountType }) => (
	<Table>
		<Table.Header>
			<Table.HeaderCell>Question</Table.HeaderCell>
			<Table.HeaderCell>Answer</Table.HeaderCell>
		</Table.Header>
		<Table.Body>
			{data.map((r) => (
				<BidQuestionResponse response={r} accountType={accountType} />
			))}
		</Table.Body>
	</Table>
);

BidQuestionResponseGroup.propTypes = {
  data: PropTypes.object.isRequired,
  accountType: PropTypes.string.isRequired,
};

export default BidQuestionResponseGroup;
