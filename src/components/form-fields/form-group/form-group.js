import React from 'react';
import Input from '../input/input';
import Amount from '../../../components/form-fields/amount/amount'

import './form-group.scss';

const FormGroup = ({type, placeholder, label, labelName}) => {
  const getElement = () => {
    if(type==="text" || type === 'password' || type === 'number'){
      return <Input type={type}  placeholder={placeholder}/>
    } else if(type === 'dropdown') {
      return <div> dropdown here </div>
    } else if(type === 'amount') {
      return <Amount />
    }
      
  }

  return (
    <div className="form-group">
      <label htmlFor={labelName}>{label}</label>
      {getElement()}
    </div>
  )
}

export default FormGroup
