/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ButtonGroup from '../../form-fields/button-group/button-group';
import PopupDropdown from '../popup/popup';
import { getRfpSupplierDetails } from '../../../redux/actions/rfpActions';

const SupplierDetailsCaption = ({ type, supplier, getSupplierProposalDetails }) => {
  const [isLoadingBidDetails, setLoading] = useState(true);
  const [bidDetails, setBidDetails] = useState(null);

  useEffect(() => {
    if (!bidDetails) {
      // fetch details of the bid
      getSupplierProposalDetails()
        .then(({ data: { rfp_claim } }) => {
          console.log('This is the data', rfp_claim);
          setLoading(false);
          setBidDetails({ ...rfp_claim });
        });
    }
  }, []);

  return (
	<div>
		{isLoadingBidDetails && (<div>Loading</div>)}
		{bidDetails && bidDetails.has_responded && supplier && (
			<div className="rfp-suppliers__item m-b-10 m-t-10 active">
				<div className="bold">{supplier.company_name.toUpperCase()}</div>
				{bidDetails && (
					<div>
						Submitted on &nbsp;
						{format(new Date(bidDetails.responded_at), 'iiii do LLLL, yyyy')}
					</div>
				)}
				<div className="text-right">
					<ButtonGroup>
						<Button content="View Bid" />
						<Button
							positive
							content={(
								<PopupDropdown
									trigger="Bid Action"
									position="top center"
								>
									<div className="flex-center">
										<Button basic content="Decline" />
										<Button basic positive content="Accept" success />
									</div>
								</PopupDropdown>
							)}
						/>

					</ButtonGroup>
				</div>
			</div>
		)}
		{type === 'pending' && supplier && (
			<div className="rfp-suppliers__item m-b-10 m-t-10">
				<div className="bold">{supplier.name.toUpperCase()}</div>
				<div>Not submitted</div>
			</div>
		)}
	</div>
  );
};

const mapDispatchToProps = {
  getSupplierProposalDetails: getRfpSupplierDetails,
};

export default connect(null, mapDispatchToProps)(SupplierDetailsCaption);
