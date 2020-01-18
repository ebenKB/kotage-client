import React from 'react';
import Input from '../input/input';
import { Form, TextArea, Placeholder } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'
import Amount from '../../../components/form-fields/amount/amount'

import './form-group.scss';
import Dropzone from '../dropzone/dropzone';
import KtTextArea from '../kt-textarea/kt-textarea';
import InputValidator from '../input-validator/input-validator';

const FormGroup = ({type, placeholder, label, labelName, center, classes='', ...rest}) => {

const options = [
  {
    key: '1',
    text: 'Emmanuel',
    value: 'Emmanuel'
  },
  {
    key: '2',
    text: 'Elorm',
    value: 'Elorm'
  },
]

  const getElement = () => {
    if(type==="text" || type === 'password' || type === 'number' || type === 'email'){
      return <InputValidator type={type}  placeholder={placeholder} {...rest} />
    } else if(type === 'dropdown') {
      return <Dropdown placeholder={placeholder} search selection options={options} className={rest.classes}/>
    } else if(type === 'amount') {
      return <Amount />
    } else if(type === 'textarea') {
      return (
        <Form>
          <TextArea placeholder={placeholder} style={{ minHeight: 100 }} />
        </Form>
      )
    } else if(type==='kt-textarea') {
      return (
        <div className="ui form">
          <KtTextArea  placeholder={Placeholder} {...rest}/>
        </div>
      )
    } else if(type === 'dropzone') {
      return <Dropzone/>
    } else {
      return rest.children
    }
  }

  return (
    <div className={`form-group ${center ? 'center' : ''} ${classes}`}>
      <label htmlFor={labelName}> <span className="bold">{label}</span></label>
      <div>{getElement()}</div>
    </div>
  )
}

export default FormGroup
