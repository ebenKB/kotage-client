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
import { findRfpMessageById } from '../../redux/actions/rfpActions';
import Help from '../../utils/requisitions/new/help';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import { getUser } from '../../redux/actions/userActions';
import KtFileItem from '../snippets/kt-file-item/kt-file-item';
import './message-preview.scss';
import { prepareFileForDownload, downloadMultipleZip, getFileSignedUrl } from '../../utils/app/file';

class MessagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      files: [],
      hasPreparedFiles: false,
      hasSignedUrls: false,
      error: null,
      signedAttachments: [],
      attachments: [
        {
          file_url: 'https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/O2_cE4-O1/PIK.png',
        },
        {
          file_url: 'https://ebenkb.s3.us-east-2.amazonaws.com/kotage/FFR.jpg',
        },
        {
          file_url: 'https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/O2_cE4-O1/PIK.png',
        },
        {
          file_url: 'https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/O2_cE4-O1/PIK.png',
        },
      ],
    };
  }


  componentDidMount() {
    const { hasPreparedFiles, hasSignedUrls, user } = this.state;
    const { findRfpMessage } = this.props;
    const {
      // eslint-disable-next-line react/prop-types
      message, tenant_id,
    } = this.props;

    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    const { params } = match;
    // eslint-disable-next-line react/prop-types
    const { message_id } = params;

    if (!hasPreparedFiles) {
      if (!hasSignedUrls) {
        this.signFileUrls();
      }
    }

    if (!message || message.id !== message_id) {
      findRfpMessage(message_id);
    }

    if (!user && message) {
      getUser(message.user_id, tenant_id)
        .then((data) => {
          this.setState((state) => ({ ...state, user: data }));
        });
    }
  }

  prepareFilesSync = () => {
    const { signedAttachments } = this.state;
    signedAttachments.map(async (file_url) => {
      const fileBody = await prepareFileForDownload(file_url);
      if (fileBody) {
        const fileObject = { file_url, ...fileBody };
        this.setState((state) => ({ ...state, files: [...state.files, fileObject] }));
      }
    });
  };

    signFileUrls = async () => {
      const { currentRfpID, tenant_id } = this.props;
      const {
        attachments,
      } = this.state;
      for (let i = 0; i < attachments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
        const singedUrl = await getFileSignedUrl(attachments[i].file_url, tenant_id, currentRfpID);
        this.setState((state) => ({
          ...state,
          signedAttachments: [...state.signedAttachments, singedUrl],
        }));
        if (i === (attachments.length - 1)) {
          this.setState((state) => ({ ...state, hasSignedUrls: true }));
          try {
            this.prepareFilesSync();
            this.setState((state) => ({ ...state, hasPrepareed: true }));
          } catch (error) {
            this.setState((state) => ({ ...state, error }));
          }
        }
      }
    };

    render() {
      // eslint-disable-next-line react/prop-types
      const { match, history } = this.props;
      // eslint-disable-next-line react/prop-types
      const { params } = match;
      // eslint-disable-next-line react/prop-types
      const { id } = params;
      const {
        files, user, signedAttachments, error,
      } = this.state;

      const { message } = this.props;
      const goBack = () => {
        // eslint-disable-next-line react/prop-types
        history.goBack();
      };

      const downloadAllFiles = () => {
        downloadMultipleZip(files, 'RFP files');
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
							{files && files.map((file) => (
								<KtFileItem
									fileObject={file}
									user={user}
								/>
							))}
							{ !error && signedAttachments.length !== files.length && (
								<Loader
									active
									size="tiny"
									inline
									content={(
										<span className="sm-caption">
                      Loading
                      &nbsp;
											{signedAttachments.length - files.length}
											{' '}
                      attachment(s)
										</span>
									)}
								/>
							)}
						</div>
						<div className="m-t-20">
							<Button
								default
								content={(
									<span>
                    Download
										{' '}
										{files.length}
										{' '}
                    attachments
									</span>
								)}
								size="tiny"
								icon={<AttachmentIcon />}
								className="kt-transparent flex-center"
								onClick={downloadAllFiles}
							/>
						</div>
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
  currentRfpID: PropTypes.string.isRequired,
};

MessagePreview.defaultProps = {
  message: null,
};
const mapDispatchToProps = {
  findRfpMessage: findRfpMessageById,
};

const mapStateToProps = (state) => ({
  message: state.rfp.currentOutbox,
  tenant_id: state.user.currentUser.tenant_id,
  currentRfpID: state.rfp.currentProposal.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagePreview));
