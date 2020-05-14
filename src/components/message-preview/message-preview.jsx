/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { Button, Divider, Loader } from 'semantic-ui-react';
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
import KtFileItem from '../snippets/kt-file-item/kt-file-item';
import './message-preview.scss';
import {
  prepareFileForDownload, downloadMultipleZip, getPresignUrlFromServer, getFullFilePath,
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
    const { hasSignedUrls, user } = this.state;
    const { findRfpMessage, message, tenant_id } = this.props;

    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    const { params } = match;
    // eslint-disable-next-line react/prop-types
    const { message_id } = params;

    if (!message || message.id !== message_id) {
      findRfpMessage(message_id)
        .then((msg) => {
          if ((!hasSignedUrls && (!msg.files))
          || (msg.files && (msg.files.length < msg.attachments.length))) {
            this.signFileUrls();
          }

          if (!user) {
            getUser(msg.user_id, tenant_id)
              .then((data) => {
                this.setState((state) => ({ ...state, user: data }));
              });
          }
        });
    }
  }

  prepareFilesSync = () => {
    const { signedAttachments } = this.state;
    const { setMessageBlob } = this.props;
    signedAttachments.map(async (file_url) => {
      try {
        const fileBody = await prepareFileForDownload(file_url);
        if (fileBody) {
          const fileObject = { file_url, ...fileBody };
          setMessageBlob(fileObject);
          // this.setState((state) => ({ ...state, files: [...state.files, fileObject] }));
        }
      } catch (error) {
        this.setState((state) => ({ ...state, error, hasPreparedFiles: true }));
      }
    });
    this.setState((state) => ({ ...state, hasPreparedFiles: true }));
  };

    signFileUrls = async () => {
      const { message } = this.props;
      if ((message && !message.files)
        || (message && message.files && message.files.length < message.attachments.length)) {
        const { attachments } = message;
        for (let i = 0; i < attachments.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          // const singedUrl = await getFileSignedUrl(attachments[i].file_url,
          // tenant_id, currentRfpID);
          try {
            // eslint-disable-next-line no-await-in-loop
            const singedUrl = await
            getPresignUrlFromServer(getFullFilePath(attachments[i].file_url));
            this.setState((state) => ({
              ...state,
              signedAttachments: [...state.signedAttachments, singedUrl],
            }));
          } catch (error) {
            this.setState((state) => ({ ...state, error }));
          }
          if (i === (attachments.length - 1)) {
            this.setState((state) => ({ ...state, hasSignedUrls: true }));
            this.prepareFilesSync();
            this.setState((state) => ({ ...state, hasPrepareed: true }));
          }
        }
      }
    };

    canLoadedFiles = () => {
      const { message } = this.props;
      const { error } = this.state;
      if (message) {
        if (message.attachments) {
          if (message.files) {
            if (message.files.length < message.attachments.length) {
              if (!error) {
                return true;
              }
            }
          } else if (!error) {
            return true;
          }
        }
      }
      return false;
    };

    render() {
      // eslint-disable-next-line react/prop-types
      const { match, history } = this.props;
      // eslint-disable-next-line react/prop-types
      const { params } = match;
      // eslint-disable-next-line react/prop-types
      const { id } = params;
      const {
        user,
      } = this.state;

      const { message } = this.props;
      const goBack = () => {
        // eslint-disable-next-line react/prop-types
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
						<div className="file-item__wrapper">
							{message.files && message.files.map((file) => (
								<KtFileItem
									fileObject={file}
									user={user}
								/>
							))}
							{ this.canLoadedFiles() && (
								<Loader
									active
									size="tiny"
									inline
									content={(
										<span className="sm-caption">
											Loading
											&nbsp;
											attachments
										</span>
									)}
								/>
							)}
						</div>
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
											attachment(s)
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
  setMessageBlob: PropTypes.func.isRequired,
  // currentRfpID: PropTypes.string.isRequired,
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
