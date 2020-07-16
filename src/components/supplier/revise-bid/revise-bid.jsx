/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import BidEditor from '../bid-editor/bid-editor';

const ReviseBid = ({ currentBid }) => {
  const [bid] = useState({ ...currentBid });
  // const [bid] = useState({
  //   totalBidValue: 0,
  //   rfpID: null,
  //   currency: null,
  //   rfpQuestionResponses: [],
  //   technicalRequirements: [],
  //   commercialRequirements: [],
  //   questions: [
  //     {
  //       id: 1,
  //       question: 'How many years have you been in operations?',
  //     },
  //     {
  //       id: 2,
  //       question: 'How many years have you been in operations?',
  //     },
  //   ],
  // });

  return (
	<BidEditor
		title="Revise Bid"
		bid={bid}
		actionType="edit"
		actionName="Update"
	/>
  );
};

ReviseBid.propTypes = {
  currentBid: PropTypes.object.isRequired,
};

const mapDispatchToProps = () => {

};

const mapStateToProps = (state) => ({
  currentBid: state.supplierBids.currentBid,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviseBid);

// handleSubmit = async () => {
//   const { respondToRfp, tenantUID, currentProposal: { id } } = this.props;
//   const { commercialRequirements, technicalRequirements } = this.state;

//   // set the owner
//   this.setState((state) => ({
//     ...state,
//     rfpID: id,
//   }));
