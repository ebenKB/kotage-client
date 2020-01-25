import React from 'react';
import '../question-creator.scss';
import FormGroup from '../../../form-fields/form-group/form-group';
import { ReactComponent as Logo } from '../../../../svg/bin.svg';

const SimpleQuestion = ({label, labelName}) => {
  return (
	<div className="question-wrapper m-t-20 m-b-20">
		<div className="question">
			<div className="">
				<FormGroup
            type="text" 
            placeholder="Type your question here"
            label={label}
            labelName={labelName}
            center={true}
          />
			</div>
		</div>
		<Logo className="kt-logo__small cta"/>
	</div>
  )
}

export default SimpleQuestion;

