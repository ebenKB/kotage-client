import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { acceptRfpTerms } from '../../redux/actions/supplierRfpActions';
import TermsConditions from '../../components/terms-and-conditions/terms-conditions';

const RfpTermsConditions = ({ acceptTerms }) => {
  const { id } = useParams();

  const handleAcceptRfpTerms = () => {
    acceptTerms();
  };
  return (
	<TermsConditions
		terms="put all the terms and conditions here"
		handleAction={handleAcceptRfpTerms}
		forwardUrl={`/supplier/rfp/${id}/response`}
	/>
  );
};

RfpTermsConditions.propTypes = {
  acceptTerms: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  acceptTerms: acceptRfpTerms,
};


export default connect(null, mapDispatchToProps)(RfpTermsConditions);
