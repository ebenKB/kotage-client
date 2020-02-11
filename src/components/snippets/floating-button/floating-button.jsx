/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import './floating-button.scss';
import { ReactComponent as Icon } from '../../../svg/icon-chat.svg';
import { ReactComponent as CloseIcon } from '../../../svg/close.svg';

const FloatingButton = ({ isOpen, ...res }) => {
  const getIcon = () => {
    if (isOpen) {
      return <Icon className="icon" />;
    }
    return (
	<CloseIcon
		className="close icon"
	/>
    );
  };
  return (
	<div
		className="kt-floating-button"
		onClick={res.onClick}
		role="button"
	>
		{
    getIcon()
    }
	</div>
  );
};

export default FloatingButton;
