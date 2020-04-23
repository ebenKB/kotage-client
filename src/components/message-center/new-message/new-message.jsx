/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import KtTextArea from '../../form-fields/textarea/textarea';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Help from '../../../utils/requisitions/new/help';
import Input from '../../form-fields/input/input';
import { createRfpMessage } from '../../../redux/actions/rfpActions';
import Dropzone from '../../dropzone/dropzone';
import Divider from '../../kt-divider/divider';

const NewMessage = ({ createNewMessage, isLoading, currentProposalId }) => {
  const history = useHistory();
  const [message, setMessage] = useState(
    {
      rfp_id: currentProposalId,
      subject: 'ff',
      message: '',
      files: [],
    },
  );

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };

  const handleTextChange = (e) => {
    setMessage({
      ...message,
      message: e,
    });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMessage({
      ...message,
      [name]: value,
    });
  };

  const setFiles = (files) => {
    setMessage({
      ...message,
      files,
    });
  };

  const handleSubmit = () => {
    createNewMessage(message)
      .then(() => history.goBack());
  };

  return (
	<MainContent
		help={Help}
		classes="m-t-40"
	>
		<KtWrapper
			header="New message"
		>
			<p>Messages you send about this RFP will be sent to all your suppliers.</p>
			<div>
				<Input
					className="fluid m-b-10"
					type="text"
					placeholder="Subject"
					onChange={(e) => handleInputChange(e)}
					name="subject"
					value={message.subject}
				/>
			</div>
			<KtTextArea
				placeholder="Message"
				rows={10}
				classes="message-box fluid kt-bg-shadow"
				onChange={handleTextChange}
				value={message.message}
			/>
			<Divider type="faint" title="Attachment" classes="m-b-20 m-t-10" />
			<Dropzone
				onFilesChange={(files) => setFiles(files)}
			/>
			<div className="text-right m-t-20">
				<Button
					default
					content="Go Back"
					onClick={goBack}
				/>
				<Button
					content="Send to all suppliers"
					color="green"
					onClick={handleSubmit}
					loading={isLoading}
				/>
			</div>
		</KtWrapper>
	</MainContent>
  );
};

const mapDispatchToProps = {
  createNewMessage: createRfpMessage,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  currentProposalId: state.rfp.currentProposal.id,
});

NewMessage.propTypes = {
  createNewMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentProposalId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
