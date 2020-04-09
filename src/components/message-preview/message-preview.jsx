/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import MainContent from '../kt-main-content/mainContent';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
// import { ReactComponent as Reply } from '../../svg/reload.svg';
// import { ReactComponent as Forward } from '../../svg/forward.svg';
import { ReactComponent as BackArrow } from '../../svg/return.svg';
import './message-preview.scss';
import { findRfpMessageById } from '../../redux/actions/rfpActions';
import Help from '../../utils/requisitions/new/help';

const MessagePreview = ({ findRfpMessage, message }) => {
  const { id, message_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!message || message.id !== message_id) {
      findRfpMessage(message_id);
    }
  });

  const goBack = () => {
    history.goBack();
  };

  return (
	<MainContent
		classes="m-t-40"
		help={Help}
	>
		<KtWrapperLite>
			<div className="message-preview">
				<div className="flex-center">
					<Button className="kt-transparent" onClick={goBack}>
						<BackArrow className="m-r-20 medium logo auto-height" />
					</Button>
					<div className="cta circle hover">
						<Link to={`/rfx/proposal/${id}/message/create/new`}>
							<div className="flex-center kt-transparent">
								<ReplyRoundedIcon className="m-r-5 medium dark logo auto-height" />
								{/* <span>reply</span> */}
							</div>
						</Link>
					</div>
					<div className="flex-center kt-transparent m-l-10">
						<Button className="kt-transparent" content="resend" />
					</div>
				</div>
				<Divider type="faint" />
				{message && (
					<div className="m-t-20 message-preview__body kt-bg-shadow">
						<div className="text-right xsm-caption m-b-20">Monday 22nd March 2020</div>
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
