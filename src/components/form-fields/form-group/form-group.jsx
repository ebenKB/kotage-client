/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-else-return */
import React from 'react';
import {
  Form, TextArea, Placeholder, Dropdown,
} from 'semantic-ui-react';

import Input from '../input/input';
import Amount from '../amount/amount';

import './form-group.scss';
import Dropzone from '../dropzone/dropzone';
import KtTextArea from '../textarea/textarea';
import InputValidator from '../input-validator/input-validator';

const FormGroup = ({
  type, placeholder, label, labelName, center, classes = '', inline = true, ...rest
}) => {
  const options = [
    {
      key: '1',
      text: 'Emmanuel',
      value: 'Emmanuel',
    },
    {
      key: '2',
      text: 'Elorm',
      value: 'Elorm',
    },
  ];

  const getElement = () => {
    if (type === 'text' || type === 'password' || type === 'number' || type === 'email') {
      return <InputValidator type={type} placeholder={placeholder} {...rest} />;
    } else if (type === 'date') {
      return <Input type={type} {...rest} />;
    } else if (type === 'dropdown') {
      return (
	<Dropdown
		placeholder={placeholder}
		search
		selection
		options={options}
		className={rest.classes}
		onChange={() => {}}
		{...rest}
	/>
      );
    } else if (type === 'amount') {
      return <Amount {...rest} />;
    } else if (type === 'textarea') {
      return (
	<Form>
		<TextArea placeholder={placeholder} style={{ minHeight: 100 }} />
	</Form>
      );
    } else if (type === 'kt-textarea') {
      return (
	<div className="ui form">
		<KtTextArea placeholder={Placeholder} {...rest} />
	</div>
      );
    } else if (type === 'dropzone') {
      return <Dropzone {...rest} />;
    } else {
      return rest.children;
    }
  };

  return (
	<div className={`form-group ${inline ? 'inline' : 'block'} ${center ? 'center' : ''} ${classes}`}>
		<label htmlFor={labelName}>
			<span className="bold">{label}</span>
		</label>
		<div>{getElement()}</div>
	</div>
  );
};

export default FormGroup;
