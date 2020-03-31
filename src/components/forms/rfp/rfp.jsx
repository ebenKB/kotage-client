/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { createProposal } from '../../../redux/actions/rfpActions';
import RfpEditor from '../../rfp-editor/rfp-editor';
import Modal from '../../modal/modal';

class RFP extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.myRef = React.createRef();
    this.state = {
      newProposal: {
        title: '',
        description: '',
        bid_deadline_date: '',
        rsvp_deadline_date: '',
        question_deadline_date: '',
        bid_deadline_time: '',
        rsvp_deadline_time: '',
        question_deadline_time: '',
        currency_id: null,
        tenant_id: ((currentUser && currentUser.tenant_id) || null),
        suppliers: [],
        questions: [],
        files: [],
        // an rfp has a default owner who is the current user
        stakeholders: [
          {
            id: ((currentUser && currentUser.id) || null),
            access_level: 2,
            firstname: ((currentUser && currentUser.firstname) || ''),
            lastname: ((currentUser && currentUser.lastname) || ''),
            email: ((currentUser && currentUser.email) || ''),
          },
        ],
        documents: [{
          id: shortid.generate(),
          name: '',
          description: '',
        }],
        proposal_attachments_attributes: null,
        proposal_response_sheet_attributes: {
          proposal_question_attributes: null,
          proposal_document_requests_attributes: null,
        },
      },
      canShowModal: false,
      hasConfirmedPublish: false,
    };
  }

  render() {
    const handleConfirmPublish = () => {
      this.setState((state) => ({
        ...state,
        hasConfirmedPublish: true,
      }));
    };

    const {
      newProposal,
      canShowModal,
    } = this.state;

    return (
	<div>
		{canShowModal && (
			<Modal
				heading="Save RFP?"
				type="success"
				confirmActionText="Publish RFP to suppliers"
				handleConfirmAction={handleConfirmPublish}
			>
				<div>
					<p>Did you remember to:</p>
					<ol>
						<li>Change the title?</li>
						<li>Update the scope of the work?</li>
						<li>Thank your boss for letting you use Kotage?</li>
					</ol>
				</div>
			</Modal>
		)}
		<RfpEditor
			proposal={newProposal}
			options={{ type: 'create', heading: 'New Proposal' }}
		/>
	</div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  newProposal: state.rfp.newProposal,
  tenantUid: state.tenant.currentTenant.account_id,
  loading: state.rfp.loading,
});

const mapDispatchToProps = {
  createNewProposal: createProposal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RFP));
