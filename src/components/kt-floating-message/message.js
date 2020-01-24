import React, { useState } from 'react';
import FloatingButton from '../snippets/floating-button/floating-button';
import './message.scss';

const Message = () => {
  const [canShowMsg, setCanShowMsg] = useState(false);

  const handleClick = () => {
    setCanShowMsg(!canShowMsg);
  }

  return (
    <div>
      <div className={`kt-message_wrapper ${canShowMsg ? 'active':'dispose'}`}>
        message content is here
      </div>
      <FloatingButton
        onClick={handleClick}
      />
    </div>
  )
}

export default Message;
