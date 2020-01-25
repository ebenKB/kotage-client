import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { Input } from 'semantic-ui-react';
// import Input from '../input/input';
import FormError from '../../snippets/error-icon/error-icon';

class InputValidator extends ValidatorComponent {
  render() {
  const { errorMessages, validators, requiredError, validatorListener, instantValidate, ...rest } = this.props;
  return (
	<>
		<Input
      {...rest}
      ref={(r) => { this.input = r; }}
    />
		<>{this.getErrorText()}</>
	</>
  );
  }

  getErrorText() {
    const { isValid } = this.state;
    if (isValid) {
      return null; /// there is no error
    }

  return (
	<div>
		<FormError 
      error={this.getErrorMessage()}
      classes="kt-logo__very-small" 
    />
	</div>
    )
  }
}

export default InputValidator;
