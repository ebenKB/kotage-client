/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import BidEditor from '../bid-editor/bid-editor';
import { uploadFiles } from '../../../utils/app/index';
import { RFP_FOLDER_NAME } from '../../../utils/app/definitions';
import { reviseExistingBid } from '../../../redux/actions/supplierBidActions';

class ReviseBid extends Component {
  constructor(props) {
    super(props);

    const { currentBid } = this.props;
    this.state = {
      bid: { ...currentBid },
    };
  }

  // const [bid] = useState({ ...currentBid });

  handleUpdate = async (data) => {
    const editedBid = data;
    const { bid } = this.state;
    const { commercialRequirements, technicalRequirements } = editedBid;
    const { tenantUID, currentProposal, reviseBid } = this.props;

    /**
     * if the user want to edit, sort out the files that have alredy been uploaded to the server
     * and upload only those that are new
    */
    const existingCommReq = commercialRequirements
      .filter((c) => c.id !== undefined && c.id !== null);
    const newCommReq = commercialRequirements.filter((c) => c.id === undefined);

    // upload commercial requirements to remote server
    const commercialReqFiles = await uploadFiles(newCommReq, tenantUID, RFP_FOLDER_NAME);
    editedBid.commercialRequirements = [
      ...commercialReqFiles,
      ...existingCommReq.map((e) => ({ id: e.id, title: e.title, url: e.file })),
    ];

    const existingTechReq = technicalRequirements
      .filter((t) => t.id !== undefined && t.id !== null);
    const newTechReq = technicalRequirements.filter((t) => t.id === undefined);

    // upload technical requirements to remote serve
    const technicalReqFiles = await uploadFiles(newTechReq, tenantUID, RFP_FOLDER_NAME);
    editedBid.technicalRequirements = [
      ...technicalReqFiles,
      ...existingTechReq.map((e) => ({ id: e.id, title: e.title, url: e.file })),
    ];

    // check if any technical requirements were deleted
    if (editedBid.technicalRequirements.length !== bid.technicalRequirements.length) {
      const deletedTechRequirements = [];
      for (const req of bid.technicalRequirements) {
        const isExisting = editedBid.technicalRequirements.find((t) => t.id === req.id);
        if (!isExisting) { // file has been deleted
          console.log('Deleted file', req);
          deletedTechRequirements.push(req);
        }
      }

      // formated the deleted files for delete
      editedBid.technicalRequirements = [
        ...editedBid.technicalRequirements,
        ...deletedTechRequirements.map((d) => ({ ...d, destroy: true })),
      ];
    }

    // check if any commercial requirements were deleted
    if (editedBid.commercialRequirements.length !== bid.commercialRequirements.length) {
      const deletedCommercialRequirement = [];
      for (const req of bid.commercialRequirements) {
        console.log('CHECKING FILE', req);
        const isExisting = editedBid.commercialRequirements.find((c) => c.id === req.id);
        if (!isExisting) { // file has been deleted
          console.log('Deleted file', req);
          deletedCommercialRequirement.push(req);
        }
      }
      if (deletedCommercialRequirement.length > 0) {
        // format the deleted files for delete
        editedBid.commercialRequirements = [
          ...editedBid.commercialRequirements,
          ...deletedCommercialRequirement.map((d) => ({ ...d, destroy: true })),
        ];
        console.log('This is the edited bid', editedBid);
      }
    }
    reviseBid(editedBid, currentProposal.tenant.id);
  };

  render() {
    const { bid } = this.state;
    return (
	<BidEditor
		title="Revise Bid"
		bid={bid}
		actionType="edit"
		actionName="Update"
		handleAction={(editedBid) => this.handleUpdate(editedBid)}
	/>
    );
  }
}

ReviseBid.propTypes = {
  currentBid: PropTypes.object.isRequired,
  tenantUID: PropTypes.number.isRequired,
  currentProposal: PropTypes.object.isRequired,
  reviseBid: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  reviseBid: reviseExistingBid,
};

const mapStateToProps = (state) => ({
  currentBid: state.supplierBids.currentBid,
  tenantUID: state.tenant.currentTenant.account_id,
  currentProposal: state.supplierRfp.currentProposal,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviseBid);
