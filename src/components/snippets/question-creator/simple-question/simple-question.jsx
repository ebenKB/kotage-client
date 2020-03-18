/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import '../question-creator.scss';
import Input from '../../../form-fields/input/input';
import { ReactComponent as Logo } from '../../../../svg/bin.svg';

const SimpleQuestion = ({ question, handleChange }) => {
  const handleOnChange = (e) => {
    e.preventDefault();
    handleChange(question.id, e.target.value);
    console.log(e.target.value);
  };

  return (
	<div className="question-wrapper m-t-20 m-b-20">
		<div className="question">
			<div className="">
				<Input
					type="text"
					value={question.question}
					classes="fluid"
					placeholder="Type question here"
					onChange={handleOnChange}
				/>
			</div>
		</div>
		<Logo className="kt-logo__small cta" />
	</div>
  );
};

SimpleQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SimpleQuestion;
