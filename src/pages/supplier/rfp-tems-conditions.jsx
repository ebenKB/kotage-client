import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Divider from '../../components/kt-divider/divider';
import MainContent from '../../components/kt-main-content/mainContent';
import KtWrapperLite from '../../components/kt-wrapper-lite/kt-wrapper-lite';
import { acceptRfpTerms } from '../../redux/actions/supplierRfpActions';

const RfpTermsConditions = ({ acceptTerms }) => {
  const { id } = useParams();

  const handleAcceptRfpTerms = () => {
    acceptTerms();
  };
  return (
	<MainContent>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Terms and Conditions" />
			<div className="m-t-20">
				<p>
					Please continue if you accept the terms and conditions relating to the proposal.
				</p>
				<p>Otherwise cancel to return to the previous page.</p>
			</div>
			<div className="m-t-20 flex-center">
				<Link to={`/supplier/rfp/dashboard/${id}`}>
					<Button
						size="tiny"
						content="Cancel"
					/>
				</Link>
				<Button
					size="tiny"
					positive
					content="Accept terms and conditions"
					onClick={handleAcceptRfpTerms}
				/>
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

RfpTermsConditions.propTypes = {
  acceptTerms: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  acceptTerms: acceptRfpTerms,
};


export default connect(null, mapDispatchToProps)(RfpTermsConditions);
