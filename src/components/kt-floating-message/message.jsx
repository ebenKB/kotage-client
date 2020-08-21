import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ClickOutside from 'react-outside-click-handler';
import { Button, TextArea, Form } from 'semantic-ui-react';
import FloatingButton from '../snippets/floating-button/floating-button';
import './message.scss';
import { sendUserFeedback, setNotification } from '../../redux/actions/appActions';

const Message = ({ isSendingFeedback, sendFeedback, notifyUser }) => {
  const [canShowMsg, setCanShowMsg] = useState(false);
  const [hasInit, setHasInit] = useState(false);
  const [content, setContent] = useState('');

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

  const getClass = () => {
    if (canShowMsg && hasInit) {
      return 'active';
    } if (hasInit) {
      return 'dispose';
    }
    return 'hide';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content !== '') {
      sendFeedback(content);
    }
    if (!isSendingFeedback) {
      setCanShowMsg(false);
      notifyUser({ message: 'You message has been sent' }, 'success');
      setContent('');
    }
  };
  const handleContentChange = (e, { value }) => {
    setContent(() => value);
  };

  return (
	<ClickOutside
		onOutsideClick={toggle}
	>
		<div>
			<div className={`kt-message_wrapper ${getClass()}`}>
				<div className="kt-message__header bold">
					Please leave a comment
				</div>
				<div className="kt-message_content">
					<div className="ui form m-b-10">
						<Form>
							<TextArea
								placeholder="We are happy to hear your feedback."
								value={content}
								style={{ minHeight: 160 }}
								onChange={handleContentChange}
							/>
						</Form>
					</div>
					<div className="text-right">
						<Button
							basic
							className="tiny small"
							onClick={handleSubmit}
							loading={isSendingFeedback}
							disabled={content === ''}
						>
							Send Comment
						</Button>
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

const mapDispatchToProps = {
  sendFeedback: sendUserFeedback,
  notifyUser: setNotification,
};

const mapStateToprops = (state) => ({
  isSendingFeedback: state.ui.buyer.isSendingFeedback,
});

Message.propTypes = {
  isSendingFeedback: PropTypes.bool.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired,
};

export default connect(mapStateToprops, mapDispatchToProps)(Message);
