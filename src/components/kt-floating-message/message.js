import React, { useState } from 'react';
import FloatingButton from '../snippets/floating-button/floating-button';
import { Button } from 'semantic-ui-react'
import './message.scss';

const Message = () => {
  const [canShowMsg, setCanShowMsg] = useState(false);

  const handleClick = () => {
    setCanShowMsg(!canShowMsg);
  }

  return (
    <div>
      <div className={`kt-message_wrapper ${canShowMsg ? 'active':'dispose'}`}>
        <div className="kt-message__header bold">
          Please leave a comment
        </div>
        <div className="kt-message_content">
          this is the content of the message
          <Button className="small green">Send</Button>
        </div>
      </div>
      <FloatingButton
        onClick={handleClick}
        isOpen={!canShowMsg}
      />
    </div>
  )
}

export default Message;
