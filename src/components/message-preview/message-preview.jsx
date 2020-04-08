/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import MainContent from '../kt-main-content/mainContent';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import { ReactComponent as Reply } from '../../svg/reload.svg';
import { ReactComponent as BackArrow } from '../../svg/return.svg';
import './message-preview.scss';
import { findRfpMessageById } from '../../redux/actions/rfpActions';

const MessagePreview = ({ findRfpMessage, message }) => {
  const { id, message_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!message || message.id !== message_id) {
      console.log('Message id: ', message_id);
      findRfpMessage(message_id);
    }
  });

  const goBack = () => {
    history.goBack();
  };

  return (
	<MainContent
		classes="m-t-40"
	>
		<KtWrapperLite>
			<div className="message-preview">
				<div className="flex-center">
					<Button className="kt-transparent" onClick={goBack}>
						<BackArrow className="m-r-20 medium logo auto-height" />
					</Button>
					<Link to={`/rfx/proposal/${id}/message/new`}>
						<div className="flex-center kt-transparent">
							<Reply className="m-r-5 small logo auto-height" />
							<span>reply</span>
						</div>
					</Link>
				</div>
				<Divider type="faint" />
				{message && (
					<div className="m-t-20 message-preview__body kt-bg-shadow">
						<p align="justify">{message.message}</p>
					</div>
				)}
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

MessagePreview.propTypes = {
  findRfpMessage: PropTypes.func.isRequired,
  message: PropTypes.object,
};

MessagePreview.defaultProps = {
  message: null,
};
const mapDispatchToProps = {
  findRfpMessage: findRfpMessageById,
};

const mapStateToProps = (state) => ({
  message: state.rfp.currentOutbox,
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagePreview);