/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import Divider from '../kt-divider/divider';
import QuestionListItem from '../question-list-item/question-list-item';


const QuestionListGroup = ({ questions }) => (
	<div>
		<Divider type="thick" title="QUESTIONS" />
		<div className="kt-opaque">
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
