import React from 'react';
import { ReactComponent as Logo } from '../../../svg/cancel.svg';

import './error-icon.scss';

const App = () => (
  <div>
    {/* Logo is an actual React component */}
    <Logo />
  </div>
);

const ErrorIcon = ({error, classes}) => {
  return (
    <div className="field-error">
     <Logo className={classes}/> {error}
    </div>
  )
}

export default ErrorIcon
