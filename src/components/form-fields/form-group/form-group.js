import React from 'react';
import Input from '../input/input';
import { Form, TextArea } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'
import Amount from '../../../components/form-fields/amount/amount'

import './form-group.scss';
import Dropzone from '../dropzone/dropzone';

const FormGroup = ({type, placeholder, label, labelName, ...otherProps}) => {

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
    if(type==="text" || type === 'password' || type === 'number'){
      return <Input type={type}  placeholder={placeholder} {...otherProps}/>
    } else if(type === 'dropdown') {
      return <Dropdown placeholder={placeholder} search selection options={options} className={otherProps.classes}/>
    } else if(type === 'amount') {
      return <Amount />
    } else if(type === 'textarea') {
      return (
        <Form>
          <TextArea placeholder={placeholder} style={{ minHeight: 100 }} />
        </Form>
      )
    } else if(type === 'dropzone') {
      return <Dropzone/>
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={labelName}> <span className="bold">{label}</span></label>
      {getElement()}
    </div>
  )
}

export default FormGroup
