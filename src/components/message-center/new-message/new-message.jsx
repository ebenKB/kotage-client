/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Checkbox, Icon, Label,
} from 'semantic-ui-react';
import { uploadFiles } from '../../../utils/app';
import MainContent from '../../kt-main-content/mainContent';
import KtTextArea from '../../form-fields/textarea/textarea';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Help from '../../../utils/requisitions/new/help';
import Input from '../../form-fields/input/input';
import { createRfpMessage } from '../../../redux/actions/rfpActions';
import Dropzone from '../../dropzone/dropzone';
import Divider from '../../kt-divider/divider';
import { RFP_MESSAGE_FOLDERNAME } from '../../../utils/app/definitions';
import FloatingSupplierList from '../../floating-supplier-list/floating-supplier-list';


const NewMessage = ({
  createNewMessage, isLoading, currentProposal, currentProposalId, tenantUid,
}) => {
  const history = useHistory();
  const [message, setMessage] = useState(
    {
      rfp_id: currentProposalId,
      subject: '',
      message: '',
      files: [],
    },
  );

  const [canShowSuppliers, setCanShowSuppliers] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState(null);
  const [hasSetAllSuppliers, setAllSuppliers] = useState(false);

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

  const hideSuppliers = () => {
    setCanShowSuppliers(false);
  };

  const showSuplierDirectory = () => {
    setCanShowSuppliers(true);
  };

  const removeSupplierFromReceipients = (supplier) => {
    const newSuppliers = selectedSuppliers.filter((s) => s.id !== supplier.id);
    setSelectedSuppliers(newSuppliers);
  };

  const handleSetAllSuppliers = (data) => {
    setAllSuppliers(data.checked);
  };

  const setFiles = (files) => {
    setMessage({
      ...message,
      files,
    });
  };

  const handleAddSuppliers = (supplers) => {
    setSelectedSuppliers([...supplers]);
    setCanShowSuppliers(false);
    if (supplers.length > 0) {
      setAllSuppliers(false);
    }
  };

  const handleSubmit = async () => {
    const files = await
    uploadFiles(message.files, tenantUid, RFP_MESSAGE_FOLDERNAME);
    message.files = files;
    setMessage(message);
    let supplier_ids = null;
    if (selectedSuppliers.length > 0) {
      supplier_ids = selectedSuppliers.map((s) => s.account_id);
    }
    createNewMessage(message, supplier_ids)
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
			{currentProposal && (
				<FloatingSupplierList
					suppliers={currentProposal.suppliers}
					isVisible={canShowSuppliers}
					closeForm={hideSuppliers}
					handleAction={(suppliers) => handleAddSuppliers(suppliers)}
				/>
			)}
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
			<div className="m-t-20 m-b-20">
				<Checkbox
					onChange={(e, data) => handleSetAllSuppliers(data)}
					checked={hasSetAllSuppliers}
					label="Send to all suppliers"
				/>
				<span>&nbsp;or&nbsp;</span>
				<Button
					className="kt-transparent kt-primary"
					content="open supplier Directory"
					onClick={showSuplierDirectory}
				/>
				<span>&nbsp;</span>
				<span>to add suppliers</span>
				<div className="m-t-20 flex-center">
					{selectedSuppliers && selectedSuppliers.map((s) => (
						<Label>
							<Button
								className="kt-transparent tiny m-r-5"
								content={<Icon name="close" />}
								onClick={() => removeSupplierFromReceipients(s)}
							/>
							{selectedSuppliers && s.company_name}
						</Label>
					))}
				</div>
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
					small
					content="Send"
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
  currentProposal: state.rfp.currentProposal,
  currentProposalId: state.rfp.currentProposal.id,
  tenantUid: state.tenant.currentTenant.account_id,
});

NewMessage.propTypes = {
  createNewMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentProposalId: PropTypes.string.isRequired,
  tenantUid: PropTypes.string.isRequired,
  currentProposal: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
