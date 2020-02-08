/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { TextArea, Placeholder, Dropdown } from 'semantic-ui-react';

import Amount from '../amount/amount';

import './form-group.scss';
import Dropzone from '../dropzone/dropzone';
import KtTextArea from '../kt-textarea/kt-textarea';
import InputValidator from '../input-validator/input-validator';

const FormGroup = ({
  inline = true, type, placeholder, label, labelName, center, classes = '', ...rest
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
    } if (type === 'date') {
      return <InputValidator type={type} {...rest} />;
    } if (type === 'dropdown') {
      return (
	<Dropdown
		placeholder={placeholder}
		search
		selection
		options={options}
		className={rest.classes}
		onChange={() => alert('change')}
		{...rest}
	/>
      );
    } if (type === 'amount') {
      return <Amount {...rest} />;
    } if (type === 'textarea') {
      return (<TextArea placeholder={placeholder} style={{ minHeight: 100 }} />);
    } if (type === 'kt-textarea') {
      return (
	<div className="ui form">
		<KtTextArea placeholder={Placeholder} {...rest} />
	</div>
      );
    } if (type === 'dropzone') {
      return <Dropzone {...rest} />;
    }
    return rest.children;
  };

  const getForm = () => {
    if (inline) {
      return (
	<div className={`form-group ${center ? 'center' : ''} ${classes}`}>
		<label htmlFor={labelName}>
			<span className="bold">{label}</span>
		</label>
		<div>{getElement()}</div>
	</div>
      );
    }
    return (
	<div className={`form-group block ${center ? 'center' : ''} ${classes}`}>
		<label htmlFor={labelName}>
			<span className="bold">{label}</span>
		</label>
		<div>{getElement()}</div>
	</div>
    );
  };
  return (
    getForm()
  );
};

export default FormGroup;
