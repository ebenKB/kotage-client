/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */

import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import shortid from 'shortid';
import './question-creator.scss';
import AddItem from '../add-item/add-item';
import SimpleQuestion from './simple-question/simple-question';


const QuestionCreator = ({ className, setQuestions, questions }) => {
  const [simpleQuestions, setSimpleQuestions] = useState([]);

  useEffect(() => {
    if (questions) {
      setSimpleQuestions(questions);
    }
  }, []);
  const addNewSimpleQuestion = () => {
    // check if the most previous question is not empty
    if (simpleQuestions.length === 0 || (simpleQuestions[simpleQuestions.length - 1].question !== '')) {
      setSimpleQuestions((questions) => [{ key: shortid.generate(), question: '' }, ...questions]);
    }
  };

  const updateQuestion = (key, idx, newValue) => {
    const questions = simpleQuestions;
    questions[idx] = {
      key,
      id: key,
      question: newValue,
    };
    setSimpleQuestions(() => ([...questions]));
    setQuestions(simpleQuestions);
  };

  const deleteQuestion = (key) => {
    const newQuestions = simpleQuestions.filter((q) => q.key !== key);
    setSimpleQuestions(() => [...newQuestions]);
    setQuestions(simpleQuestions);
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
						key={q.key}
						question={q}
						handleChange={(key, value) => updateQuestion(key, idx, value)}
						deleteQuestion={(key) => deleteQuestion(key)}
					/>
				))}
			</div>
		</div>
	</div>
  );
};

QuestionCreator.propTypes = {
  className: PropTypes.string,
  setQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array,
};

QuestionCreator.defaultProps = {
  className: '',
  questions: null,
};

export default QuestionCreator;
