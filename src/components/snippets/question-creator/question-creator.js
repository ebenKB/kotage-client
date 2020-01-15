import React from 'react';
import './question-creator.scss';
import FormGroup from '../../form-fields/form-group/form-group';
import { ReactComponent as Logo } from '../../../svg/bin.svg';

const QuestionCreator = ({type = 'simple'}) => {

  const getQuestionType = () => {
    if(type === 'simple') {
      return (
        <span>Simple question creator</span>
      );
    }
  }
  return (
    <div className="question-wrapper">
      <div className="question">
        <div className="">
          <FormGroup
            type="text" 
            placeholder="Type your question here"
            label="Your Question"
            labelName="question"
            center={true}
          />
        </div>
      </div>
      <Logo className="kt-logo__small cta"/>
    </div>
  )
}

export default QuestionCreator;
