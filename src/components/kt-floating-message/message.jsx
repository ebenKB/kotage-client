import React, { useState } from 'react';
import ClickOutside from 'react-outside-click-handler';
import { Button, TextArea, Form } from 'semantic-ui-react';
import FloatingButton from '../snippets/floating-button/floating-button';
import './message.scss';

const Message = () => {
  const [canShowMsg, setCanShowMsg] = useState(false);
  const [hasInit, setHasInit] = useState(false);

  const handleClick = () => {
    setCanShowMsg(!canShowMsg);
    setHasInit(true);
  };

  const toggle = () => {
    if (hasInit && canShowMsg) {
      handleClick();
    } else {
      setHasInit(false);
    }
  };

  const getClas = () => {
    if (canShowMsg && hasInit) {
      return 'active';
    } if (hasInit) {
      return 'dispose';
    }
    return 'hide';
  };

  return (
	<ClickOutside
		onOutsideClick={toggle}
	>
		<div>
			<div className={`kt-message_wrapper ${getClas()}`}>
				<div className="kt-message__header bold">
            Please leave a comment
				</div>
				<div className="kt-message_content">
					<div className="ui form m-b-10">
						<Form>
							<TextArea
								placeholder="Tell us more"
								value="Some message is here"
								style={{ minHeight: 160 }}
							/>
						</Form>
					</div>
					<div className="text-right">
						<Button basic className="tiny small">Send</Button>
					</div>
				</div>
			</div>
			<FloatingButton
				onClick={handleClick}
				isOpen={!canShowMsg}
			/>
		</div>
	</ClickOutside>
  );
};

export default Message;
