import React from 'react';
import { Input } from 'semantic-ui-react';

import './input.scss';

const input = ({type, value, classes, ...props}) => {
  return (
    <Input type={type} value={value} className={classes} {...props}/>
  )
}

export default input
