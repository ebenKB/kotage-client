
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MainContent from '../kt-main-content/mainContent';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import { ReactComponent as BackArrow } from '../../svg/return.svg';
import { findRfpMessageById } from '../../redux/actions/rfpActions';
import Help from '../../utils/requisitions/new/help';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import { getUser } from '../../redux/actions/userActions';
import UsernameWithInitialsLabel from '../snippets/Username-with-initials-label/username-with-initials-label';
import KtFileItem from '../snippets/kt-file-item/kt-file-item';
import './message-preview.scss';
import { prepareFileForDownload, downloadMultipleZip, getFileSignedUrl } from '../../utils/app/file';

const MessagePreview = ({
  findRfpMessage, message, tenant_id, currentRfpID,
}) => {
  const { id, message_id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPreparedFile, prepareFile] = useState(false);
  const [hasSignedUrls, setHasSignedUrl] = useState(false);
  let signedAttachments = [];

  const attachments = [
    {
      file_url: 'https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/O2_cE4-O1/PIK.png',
    },
    {
      file_url: 'https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/qqPSEwI5r/Background.png',
    },
  ];

  // const prepFilesForDownload = async () => {
  //   for (let i = 0; i < signedAttachments.length; i += 1) {
  //     prepareFileForDownload(signedAttachments[i].file_url)
  //       .then((file) => setFiles([...files, file]));
  //   }
  // };

  const prepareFilesSync = () => {
    signedAttachments.map(async (file) => {
      const fileBody = await prepareFileForDownload(file.file_url);
      if (fileBody) {
        const fileObject = { ...file, ...fileBody };
        setFiles((state) => [...state, fileObject]);
      }
    });
    setIsLoading(false);

    // const readyFiles = await Promise.all(
    //   // eslint-disable-next-line no-return-await
    //   signedAttachments.map(async (file) => {
    //     const fileBody = await prepareFileForDownload(file.file_url);
    //     return {
    //       ...file,
    //       ...fileBody,
    //     };
    //   }),
    // );
    // setFiles(...files, readyFiles);
    // setIsLoading(false);
  };

  const signFileUrls = async () => {
    for (let i = 0; i < attachments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const singedUrl = await getFileSignedUrl(attachments[i].file_url, tenant_id, currentRfpID);
      signedAttachments = [...signedAttachments, { ...signedAttachments[i], file_url: singedUrl }];
      if (i === (attachments.length - 1)) {
        setHasSignedUrl(true);
        prepareFilesSync();
        prepareFile(true);
        // setIsLoading(false);
      }
    }

    // attachments.map((file) => getFileSignedUrl(file.file_url, tenant_id, currentRfpID)
    //   .then((url) => (setSignedAttachments([...signedAttachments, {
    //     ...file,
    //     file_url: url,
    //   }]))));
    // setSignedAttachments(data);
  };

  useEffect(() => {
    if (!hasPreparedFile) {
      if (!hasSignedUrls) {
        signFileUrls();
      }
    }

    if (!message || message.id !== message_id) {
      findRfpMessage(message_id);
    }

    if (!user && message) {
      getUser(message.user_id, tenant_id)
        .then((data) => {
          setUser(data);
        });
    }
    // if (hasSignedUrls) {
    //   prepFilesForDownload();
    //   prepareFile(true);
    // }
  }, [hasPreparedFile, hasSignedUrls]);

  // useEffect(() => {
  //   if (!message || message.id !== message_id) {
  //     findRfpMessage(message_id);
  //   }

  //   if (!user && message) {
  //     getUser(message.user_id, tenant_id)
  //       .then((data) => {
  //         setUser(data);
  //       });
  //   }
  // });

  const goBack = () => {
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
					<BackArrow className="m-r-20 medium light logo auto-height" />
				</Button>
				<div className="cta circle hover">
					<Link to={`/rfx/proposal/${id}/message/create/new`}>
						<div className="flex-center kt-transparent file-item__cta-tool-tip" attr-data="Reply">
							<ReplyRoundedIcon className="m-r-5 medium dark logo auto-height" />
						</div>
					</Link>
				</div>
				<div className="flex-center kt-transparent m-l-10 file-item__cta-tool-tip" attr-data="Resend message">
					<Button className="kt-transparent" content="resend" />
				</div>
			</div>
			<div className="message-preview">
				<Divider type="faint" heading="Heading is here" />
				{message && (
					<div className="m-t-20 message-preview__body kt-bg-shadoww">
						<h3 className="dark">Message subject is here</h3>
						<div className="flex">
							{user && (<UsernameWithInitialsLabel user={user} />)}
							<div className="sm-caption m-b-20 m-l-8">
								<div className="kt-primary">
									{user && (
										<span>
											{user.firstname}
											{' '}
											{user.lastname}
										</span>
									)}
								</div>
								<span className="xsm-caption">Monday 22nd March 2020</span>
								<div>4 suppliers received this message</div>
							</div>
						</div>
						<div className="flex-center">
							<AttachmentIcon className="medium dark logo m-r-4" />
							<div>{message.attachments && message.attachments.length}</div>
						</div>
						<p align="justify">{message.message}</p>
						<Divider type="faint" classes="p-b-8 p-t-8" />
						<div className="file-item__wrapper">
							{files && files.map((file) => (
								<KtFileItem
									fileObject={file}
								/>
							))}
							{isLoading && attachments && (
								<Loader
									active
									inline
									content={(
										<span>
                      Loading
											{attachments.length}
											{' '}
                      attachments
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
                    Download all
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
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MessagePreview);
