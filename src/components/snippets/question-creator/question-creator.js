import React from 'react';
import './question-creator.scss';
import FormGroup from '../../form-fields/form-group/form-group';
import { ReactComponent as Logo } from '../../../svg/bin.svg';
import SimpleQuestion from './simple-question/simple-question';
import { ReactComponent as Icon } from '../../../svg/plus.svg';

const QuestionCreator = ({type = 'simple', label}) => {
  const getQuestionType = () => {
    if(type === 'simple') {
      return (
        <span>Simple question creator</span>
      );
    }
  }

  const addNewQuestion = () => {
    console.log('we want to add a new question')
  }

  return (
    <div>
      <SimpleQuestion
        label={label}
        labelName="question"
      />
      <SimpleQuestion
        label={label}
        labelName="question"
      />
      <div 
        className="clickable m-t-15 m-b-30 kt-primary bold sm-caption" 
        onClick={addNewQuestion}
      >
        <Icon className="kt-logo__small kt-primary"/>
        <span>Add New</span>
      </div>
    </div>
  )
}

export default QuestionCreator;
