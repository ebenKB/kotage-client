/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import RfpEditor from '../../../rfp-editor/rfp-editor';

const EditRFP = ({ proposal }) => (
	<div>
		<RfpEditor
			proposal={proposal}
			type="edit" // use type to know whether to track and compare changes to the form
			options={{ type: 'edit', heading: 'Edit Proposal' }}
		/>
	</div>
);

const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
});

EditRFP.propTypes = {
  proposal: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(EditRFP);
