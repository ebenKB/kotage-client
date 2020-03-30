/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import QuestionListItem from '../question-list-item/question-list-item';
import './question-list-group.scss';


const QuestionListGroup = ({ questions }) => (
	<div className="question-list-group">
		<div className="bold">Questions</div>
		<div>
			{((questions === null) || (questions && questions.length === 0)) && (
				<div>There is no question attached to this proposal</div>
			)}
			{questions && questions.length > 0 && questions.map((q) => (
				<QuestionListItem
					question={q}
				/>
			))}
		</div>
	</div>
);

QuestionListGroup.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default QuestionListGroup;
