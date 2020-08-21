import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import MainContent from '../kt-main-content/mainContent';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import Divider from '../kt-divider/divider';

const TermsConditions = ({
  terms,
  handleAction,
  forwardUrl,
}) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
	<MainContent>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Terms and Conditions" />
			<div className="m-t-20">
				{terms}
			</div>
			<div className="m-t-20 flex-center">
				<Button
					size="tiny"
					content="Cancel"
					onClick={goBack}
				/>
				<Link to={forwardUrl}>
					<Button
						size="tiny"
						positive
						content="Accept terms and conditions"
						onClick={handleAction}
					/>
				</Link>
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

TermsConditions.propTypes = {
  terms: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
  forwardUrl: PropTypes.string.isRequired,
};

export default TermsConditions;
