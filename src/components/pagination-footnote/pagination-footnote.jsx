import React from 'react';
import { Button } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

const PaginationFootnote = ({ remainder, handleAction, caption }) => (
	<div>
		{remainder > 0 && (
			<Button
				className="clickable bold kt-primary m-t-10 kt-transparent m-t-20"
				onClick={() => handleAction}
			>
				See
				&nbsp;
				{ remainder }
				&nbsp;
				more
				{' '}
				{caption}
				&nbsp;
			</Button>
		)}
	</div>
);

PaginationFootnote.propTypes = {
  remainder: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
};

export default PaginationFootnote;
