/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';

const QuestionListItem = ({ question }) => (
	<div className="m-b-10">
		{question && (<div className="m-b-10">{question.question}</div>)}
	</div>
);

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionListItem;
