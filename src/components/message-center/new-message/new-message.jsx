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
import { ValidatorForm } from 'react-form-validator-core';
import { uploadFiles } from '../../../utils/app';
import MainContent from '../../kt-main-content/mainContent';
import KtTextArea from '../../form-fields/textarea/textarea';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Help from '../../../utils/requisitions/new/help';
// import Input from '../../form-fields/input/input';
import { createRfpMessage } from '../../../redux/actions/rfpActions';
import Dropzone from '../../dropzone/dropzone';
import Divider from '../../kt-divider/divider';
import { RFP_MESSAGE_FOLDERNAME } from '../../../utils/app/definitions';
import FloatingSupplierList from '../../floating-supplier-list/floating-supplier-list';
import { setNotification } from '../../../redux/actions/appActions';
import Can from '../../can/can';
import InputValidator from '../../form-fields/input-validator/input-validator';
import { createSupplierRfpMessage } from '../../../redux/actions/supplierRfpActions';

const NewMessage = ({
  createBuyerNewMessage,
  createSupplierNewMessage,
  isLoading,
  currentProposal,
  currentProposalId,
  showNotification,
  tenantUid,
  accountType,
  currentUser,
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
  const ref = React.createRef();

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

  const prepareBuyerMessage = () => {
    let supplier_ids = null;
    supplier_ids = selectedSuppliers.map((s) => s.account_id);
    createBuyerNewMessage(message, supplier_ids)
      .then(() => history.goBack());
  };

  const prepareSupplierMessage = () => {
    createSupplierNewMessage(message, currentProposal.tenant.id, currentProposal.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validatorForm = ref.current;
    // validatorForm.validate()
    //   .catch(() => console.log('error while validating the form'));
    const isValid = await validatorForm.isFormValid();
    if (isValid) {
      if ((selectedSuppliers && selectedSuppliers.length > 0) || accountType === 'supplier') {
        try {
          if (message.files) {
            const files = await
            uploadFiles(message.files, tenantUid, RFP_MESSAGE_FOLDERNAME);
            message.files = files;
            setMessage(message);
          }
          if (accountType === 'buyer') {
            prepareBuyerMessage();
          } else if (accountType === 'supplier') {
            prepareSupplierMessage();
          }
        } catch (error) {
          showNotification({
            message: 'error while uploading the files.',
          }, 'error');
        }
      } else {
        showNotification({
          message: 'Select at least one supplier to continue.',
        }, 'error');
      }
    } else {
      showNotification({
        message: 'Please provide all required information',
      }, 'error');
    }
  };

  return (
	<MainContent
		help={Help}
		classes="m-t-40"
	>
		<KtWrapper
			header="New message"
		>
			{currentProposal && (
				<FloatingSupplierList
					suppliers={currentProposal.suppliers}
					isVisible={canShowSuppliers}
					closeForm={hideSuppliers}
					handleAction={(suppliers) => handleAddSuppliers(suppliers)}
				/>
			)}
			<ValidatorForm
				ref={ref}
				onSubmit={() => {}}
			>
				<div>
					<InputValidator
						className="fluid m-b-10"
						type="text"
						placeholder="Subject"
						onChange={(e) => handleInputChange(e)}
						name="subject"
						value={message.subject}
						instantValidate={false}
						validators={['required', 'isString', 'minStringLength:8']}
						errorMessages={['Subject is required', 'Subject is not valid', 'Subject is too short.']}
					/>
				</div>
				<Can
					perform="supplier:send_message"
					accountType={accountType}
					roleType={currentUser.is_admin ? 'admin' : 'user'}
					yes={() => (
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
							<div className="m-t-20 flex-center wrap">
								{selectedSuppliers && selectedSuppliers.map((s) => (
									<Label key={s.id}>
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
					)}
					no={() => null}
				/>
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
						size="small"
						content="Send"
						color="green"
						onClick={handleSubmit}
						loading={isLoading}
					/>
				</div>
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
  );
};

const mapDispatchToProps = {
  createBuyerNewMessage: createRfpMessage,
  createSupplierNewMessage: createSupplierRfpMessage,
  showNotification: setNotification,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  tenantUid: state.tenant.currentTenant.account_id,
  accountType: state.app.accountType,
  currentUser: state.user.currentUser,
});

NewMessage.propTypes = {
  createBuyerNewMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentProposalId: PropTypes.number,
  tenantUid: PropTypes.string.isRequired,
  currentProposal: PropTypes.object,
  showNotification: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  createSupplierNewMessage: PropTypes.func.isRequired,
};

NewMessage.defaultProps = {
  currentProposal: null,
  currentProposalId: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
