
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import shortid from 'shortid';
import './question-creator.scss';
import AddItem from '../add-item/add-item';
import SimpleQuestion from './simple-question/simple-question';


const QuestionCreator = ({ className }) => {
  const [simpleQuestions, setSimpleQuestions] = useState([]);

  const addNewSimpleQuestion = () => {
    // check if the most previous question is not empty
    if (simpleQuestions.length === 0 || (simpleQuestions[simpleQuestions.length - 1].question !== '')) {
      setSimpleQuestions((questions) => [...questions, { id: shortid.generate(), question: 'dd' }]);
    }
  };

  const updateQuestion = (id, idx, newValue) => {
    const questions = simpleQuestions;
    questions[idx] = {
      id,
      question: newValue,
    };
    setSimpleQuestions(() => ([...questions]));
  };

  return (
	<div className={`docs-group m-t-30 ${className}`}>
		<div className="bold">Questionaire</div>
		<div className="docs-wrapper">
			<AddItem
				title="Add New Question"
				handleClick={addNewSimpleQuestion}
			/>
			<div>
				{/* show all questions here */}
				{simpleQuestions.map((q, idx) => (
					<SimpleQuestion
						index={idx}
						key={q.id}
						question={q}
						handleChange={(id, value) => updateQuestion(id, idx, value)}
					/>
				))}
			</div>
		</div>
	</div>
  );
};

QuestionCreator.propTypes = {
  className: PropTypes.string,
};

QuestionCreator.defaultProps = {
  className: '',
};

export default QuestionCreator;
