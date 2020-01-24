import React from 'react';
import './floating-button.scss';
import { ReactComponent as Icon } from '../../../svg/icon-chat.svg';
import { ReactComponent as CloseIcon } from '../../../svg/close.svg'; 

const FloatingButton = ({isOpen, ...res}) => {
  
  const getIcon = () => {
    if(isOpen) {
      return <Icon className="icon"/>
    } else {
      return (
        <CloseIcon 
          className="close icon"
        />
      )
    }
  }
  return (
    <div className="kt-floating-button"
      onClick={res.onClick}
      role="button"
    >
    {
      getIcon()
    }
    </div>
  )
}

export default FloatingButton
