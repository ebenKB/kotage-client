/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Divider, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MainContent from '../kt-main-content/mainContent';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import { ReactComponent as BackArrow } from '../../svg/return.svg';
import './message-preview.scss';
import { findRfpMessageById } from '../../redux/actions/rfpActions';
import Help from '../../utils/requisitions/new/help';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import { getUser } from '../../redux/actions/userActions';
import { ReactComponent as FileIcon } from '../../svg/pdf-alt.svg';

const MessagePreview = ({ findRfpMessage, message, tenant_id }) => {
  const { id, message_id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const options = [
    { key: '1', text: 'Preview', value: '1' },
    { key: '2', text: 'Download', value: '2' },
  ];
  useEffect(() => {
    if (!message || message.id !== message_id) {
      findRfpMessage(message_id);
    }
    if (!user && message) {
      getUser(message.user_id, tenant_id)
        .then((data) => {
          setUser(data);
        });
    }
  });

  const goBack = () => {
    history.goBack();
  };

  return (
	<MainContent
		help={Help}
	>
		<RfpTitle classes="m-t-20" />
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
						<div className="text-right xsm-caption m-b-20">
              Monday 22nd March 2020
						</div>
						<h3 className="dark">Message subject is here</h3>
						<div className="flex-center">
							<AttachmentIcon className="medium dark logo m-r-4" />
							<span>{message.attachments && message.attachments.length}</span>
						</div>
						<div className="m-b-20">
							<div className="flex-center">
								<MailIcon className="small dark logo m-r-5" />
								<span className="sm-caption kt-primary">4 suppliers received this message</span>
							</div>
							<div className="flex-center">
								<AccountCircleIcon className="small dark logo m-r-5" />
								<span className="kt-primary">{user && user.email}</span>
							</div>
						</div>
						<div className="file-item__wrapper">
							<div className="m-b-20 flex-center file-item kt-bg-shadow">
								<FileIcon className="big logo auto-height m-r-5" />
								<Dropdown basic options={options} text="File Title" />
							</div>
							<div className="m-b-20 flex-center file-item kt-bg-shadow">
								<FileIcon className="big logo auto-height m-r-5" />
								<Dropdown basic options={options} text="File Title" />
							</div>
							<div className="m-b-20 flex-center file-item kt-bg-shadow">
								<FileIcon className="big logo auto-height m-r-5" />
								<Dropdown basic options={options} text="File Title" />
							</div>
						</div>
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
  tenant_id: PropTypes.string.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePreview);
