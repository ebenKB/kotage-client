/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'semantic-ui-react';

const BidQuestionResponse = ({ response }) => {
  useEffect(() => {
    console.log('This is the effect');
  }, []);

  return (
	<Table.Row>
		<Table.Cell>
			<h3>Question</h3>
		</Table.Cell>
		<Table.Cell>
			{response.answer}
		</Table.Cell>
	</Table.Row>
  );
};

BidQuestionResponse.propTypes = {
  response: PropTypes.object.isRequired,
};

export default BidQuestionResponse;
