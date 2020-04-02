/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import KtTextArea from '../../form-fields/textarea/textarea';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Help from '../../../utils/requisitions/new/help';
import { ReactComponent as Attachment } from '../../../svg/attach.svg';

const NewMessage = () => {
  const history = useHistory();
  const [files, setFiles] = useState();
  const [message, setMessage] = useState('');

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleTextChange = (e) => {
    setMessage(e);
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
			<KtTextArea
				rows={10}
				classes="message-box fluid kt-bg-shadow"
				onChange={handleTextChange}
				value={message}
			/>
			<div className="attachment-wrapper m-t-10">
				<div className="flex-center">
					<div className="attachment-label">
						<Button className="kt-transparent">
							<Attachment className="attachment medium logo clickable" />
						</Button>
					</div>
					<Input
						type="file"
						multiple
						accept="image/*,.pdf"
						name="attachment"
						className="attachment"
						onChange={(e) => handleFileChange(e)}
					/>
					<div>
						{files && (
							<span>
								<span className="bold">{files.length}</span>
								{' '}
                file(s) attached
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="text-right m-t-20">
				<Button
					default
					content="Go Back"
					onClick={goBack}
				/>
				<Button
					content="Send Message"
					color="green"
					onClick={console.log('We want to send the message')}
				/>
			</div>
		</KtWrapper>
	</MainContent>
  );
};

export default NewMessage;
