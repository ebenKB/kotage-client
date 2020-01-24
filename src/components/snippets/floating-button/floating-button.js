import React from 'react';
import './floating-button.scss';
import { ReactComponent as Icon } from '../../../svg/icon-chat.svg';

const FloatingButton = ({...res}) => {
  return (
    <div className="kt-floating-button"
      onClick={res.onClick}
      role="button"
    >
      <Icon className="icon"/>
    </div>
  )
}

export default FloatingButton
