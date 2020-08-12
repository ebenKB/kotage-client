/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import RfpEditor from '../../../rfp-editor/rfp-editor';
import Modal from '../../../modal/modal';

const EditRFP = ({ proposal }) => {
  const [canShowModal, setCanShowModal] = useState(false);

  const handleUpdateClick = () => {
    setCanShowModal(true);
  };

  const declineUpdate = () => {
    setCanShowModal(false);
  };

  const confirmUpdate = () => {
  };

  return (
	<div>
		{canShowModal && (
			<Modal
				heading="Before you save updates to this proposal"
				type="success"
				confirmActionText="Confirm and save updates to RFP"
				handleConfirmAction={confirmUpdate}
				handleDeclineAction={declineUpdate}
			>
				<div>
					<p>Do you know that</p>
					<ol>
						<li>New Changes will be saved to this proposal?</li>
						<li>Suppliers will be notified of the new changes?</li>
					</ol>
				</div>
			</Modal>
		)}
		<RfpEditor
			proposal={proposal}
			type="edit" // use type to know whether to track and compare changes to the form
			options={{ type: 'edit', heading: 'Edit Proposal', actionName: 'Update' }}
			handleSaveAction={handleUpdateClick}
		/>
	</div>
  );
};

const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
});

EditRFP.propTypes = {
  proposal: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(EditRFP);
