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
import { uploadFiles } from '../../../utils/app/index';
import { RFP_FOLDER_NAME } from '../../../utils/app/definitions';

class RFP extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.myRef = React.createRef();
    this.state = {
      newProposal: {
        title: '',
        allow_late_bids: false,
        allow_revise_bids: false,
        description: null,
        bid_deadline_date: null,
        rsvp_deadline_date: null,
        question_deadline_date: null,
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
    };
  }

  render() {
    const {
      newProposal,
      canShowModal,
    } = this.state;

    const { createNewProposal, history, tenantUid } = this.props;

    const handlePublish = () => {
      this.setState((state) => ({
        ...state,
        canShowModal: true,
      }));
    };

    const declinePublishAction = () => {
      this.setState((state) => ({
        ...state,
        canShowModal: false,
      }));
    };

    const handleConfirmPublish = async () => {
      this.setState((state) => ({
        ...state,
        canShowModal: false,
      }));
      const files = await
      uploadFiles(newProposal.files, tenantUid, RFP_FOLDER_NAME);
      const proposal = newProposal;
      proposal.files = files;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }), () => {
        createNewProposal(newProposal)
          .then(() => history.push('/rfx'))
          .catch(() => {
            // show error
            // remove files from s3
          });
      });
    };

    return (
	<div>
		{canShowModal && (
			<Modal
				heading="Before you publish this RFP to suppliers"
				type="success"
				confirmActionText="Confirm and publish RFP to suppliers"
				handleConfirmAction={handleConfirmPublish}
				handleDeclineAction={declinePublishAction}
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
			/* handleSaveAction={() => null} */
			publishAction={handlePublish}
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
