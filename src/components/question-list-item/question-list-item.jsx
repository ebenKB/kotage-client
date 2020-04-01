/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as MenuIcon } from '../../svg/menu.svg';

const QuestionListItem = ({ question }) => (
	<div className="m-b-10">
		{question && (
			<div className="m-b-10 flex-center">
				<MenuIcon className="very small logo m-r-10" />
				{question.question}
			</div>
		)}
	</div>
);

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionListItem;
