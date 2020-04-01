import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import KtTextArea from '../../form-fields/textarea/textarea';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Help from '../../../utils/requisitions/new/help';

const NewMessage = () => {
  const history = useHistory;
  const goBack = () => {
    console.log(history());
    // if (history) {
    //   history.goBack();
    // }
  };

  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="New message"
		>
			<p>Message you send about this RFP will be sent to all your suppliers.</p>
			<KtTextArea
				rows={10}
				classes="message-box fluid kt-bg-shadow"
			/>
			<div className="text-right m-t-20">
				<Button
					default
					content="Go Back"
					onClick={goBack()}
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
