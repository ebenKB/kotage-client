import React from 'react';
import { Input } from 'semantic-ui-react';

import './input.scss';

const CustomInput = ({type, value, name, classes, ...props}) => {
  
  return (
    <Input 
      type={type} 
      value={value}
      name={name}
      className={classes}
      { ...props }
    />
  )
}

export default CustomInput
