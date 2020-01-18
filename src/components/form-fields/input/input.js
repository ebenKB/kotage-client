import React from 'react';
import { Input } from 'semantic-ui-react';

import './input.scss';

class CustomInput extends React.Component {
  render() {
    const {type, value, name, classes, ...props} = this.props;
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
}

export default CustomInput
