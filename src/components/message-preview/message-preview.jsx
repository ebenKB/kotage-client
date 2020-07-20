/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MainContent from '../kt-main-content/mainContent';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MessageHeaderCaption from '../snippets/message-header-caption/message-header-caption';
import { ReactComponent as BackArrow } from '../../svg/return.svg';
import { ReactComponent as ResendIcon } from '../../svg/forward.svg';
import { ReactComponent as ReplyIcon } from '../../svg/backward.svg';
import { findRfpMessageById, setCurrenMessageBlob } from '../../redux/actions/rfpActions';
import Help from '../../utils/requisitions/new/help';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import { getUser } from '../../redux/actions/userActions';
// import KtFileItem from '../snippets/kt-file-item/kt-file-item';
import FileHandler from '../file-handler/file-handler';
import './message-preview.scss';
import {
  downloadMultipleZip,
} from '../../utils/app/file';

class MessagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      hasPreparedFiles: false,
      hasSignedUrls: false,
      error: null,
      signedAttachments: [],
      inbox: [
        {
          id: 1,
          subject: 'Deadline review',
          message: 'Please consider reviewing the deadline for the final proposal submission',
        },
        {
          id: 1,
          subject: 'Deadline review',
          message: 'Please consider reviewing the deadline for the final proposal submission',
        },
        {
          id: 1,
          subject: 'Deadline review',
          message: 'Please consider reviewing the deadline for the final proposal submission. This is because the current rise in prices has affected our discounts with our partners and we are looking for a extension to do new bargians.',
        },
        {
          id: 1,
          subject: 'Deadline review',
          message: 'Please consider reviewing the deadline for the final proposal submission',
        },
      ],
    };
  }

  componentDidMount() {
    const { user } = this.state;
    const { findRfpMessage, message, tenant_id } = this.props;

    const { match } = this.props;
    const { params } = match;
    const { message_id } = params;

    if (!message || message.id !== message_id) {
      findRfpMessage(message_id)
        .then((msg) => {
          if (!user) {
            getUser(msg.user_id, tenant_id) // get details of the user who created the message
              .then((data) => {
                this.setState((state) => ({ ...state, user: data }));
              });
          }
        });
    }
  }

  render() {
    const { match, history, tenant_id } = this.props;
    const { params } = match;
    const { id } = params;
    const {
      user,
    } = this.state;

    const { message } = this.props;
    const goBack = () => {
      history.goBack();
    };

    const downloadAllFiles = () => {
      downloadMultipleZip(message.files, 'RFP files');
    };

    return (
	<MainContent
		help={Help}
	>
		<RfpTitle classes="m-t-20" />
		<KtWrapperLite>
			<div className="flex-center">
				<Button className="kt-transparent" onClick={goBack}>
					<BackArrow className="m-r-20 medium dark logo auto-height" />
				</Button>
				<div className="cta circle hover">
					<Link to={`/rfx/proposal/${id}/message/create/new`}>
						<div className="flex-center kt-transparent kt-item__cta-tool-tip" attr-data="Reply">
							<ReplyIcon className="m-r-5 small dark logo auto-height" />
						</div>
					</Link>
				</div>
				<div className="flex-center kt-transparent m-l-10 kt-item__cta-tool-tip" attr-data="Resend">
					<Button className="kt-transparent" content={<ResendIcon className="small dark logo auto-height" />} />
				</div>
			</div>
			<div className="message-preview">
				<Divider type="faint" heading="Heading is here" />
				{message && (
					<div className="m-t-20 message-preview__body kt-bg-shadoww">
						<MessageHeaderCaption
							user={user}
						/>
						<p align="justify">{message.message}</p>
						<Divider type="faint" classes="p-b-8 p-t-8" />
						{message.attachments && (
							<FileHandler
								shouldSignUrl
								files={message.attachments}
								tenantID={tenant_id}
								objectOwnerID={message.id}
							/>
						)}
						{message && message.files && (
							<div className="m-t-20">
								<Button
									default
									content={(
										<span>
											Download
											{' '}
											{message.files.length}
											{' '}
											{message.files.length === 1 ? 'attachment' : 'attachments' }
										</span>
									)}
									size="tiny"
									icon={<AttachmentIcon />}
									className="kt-transparent flex-center"
									onClick={downloadAllFiles}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</KtWrapperLite>
	</MainContent>
    );
  }
}
MessagePreview.propTypes = {
  findRfpMessage: PropTypes.func.isRequired,
  message: PropTypes.object,
  tenant_id: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

MessagePreview.defaultProps = {
  message: null,
};

const mapDispatchToProps = {
  findRfpMessage: findRfpMessageById,
  setMessageBlob: setCurrenMessageBlob,
};

const mapStateToProps = (state) => ({
  message: state.rfp.currentOutbox,
  tenant_id: state.user.currentUser.tenant_id,
  currentRfpID: state.rfp.currentProposal.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagePreview));
