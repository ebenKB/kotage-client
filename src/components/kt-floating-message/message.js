import React, { useState } from 'react';
import FloatingButton from '../snippets/floating-button/floating-button';
import { Button } from 'semantic-ui-react';
import './message.scss';
import KtTextArea from '../form-fields/kt-textarea/kt-textarea';


const Message = () => {
  const [canShowMsg, setCanShowMsg] = useState(false);
  const [hasInit, setHasInit] = useState(false);

  const handleClick = () => {
    setCanShowMsg(!canShowMsg);
    setHasInit(true);
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    // handle input changes here
  }

  const getClas =() => {
    if(canShowMsg) {
      return 'active'
    } else if(hasInit) {
      return 'dispose';
    } else {
      return 'hide';
    }
  }
  
  return (
    <div>
      <div className={`kt-message_wrapper ${getClas()}`}>
        <div className="kt-message__header bold">
          Please leave a comment
        </div>
        <div className="kt-message_content">
          <div className="ui form m-b-10">
            <KtTextArea  value="The content is here"/>
          </div>
          <div className="text-right">
            <Button basic className="tiny small green">Send</Button>
          </div>
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
