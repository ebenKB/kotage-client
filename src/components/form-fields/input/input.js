import React from 'react';
import { Input } from 'semantic-ui-react';

import './input.scss';

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {type, value, name, classes, ...rest} = this.props;
    return (
      <Input 
        type={type} 
        value={value}
        name={name}
        className={classes}
        { ...rest }
      />
    )
  }
}

export default CustomInput
