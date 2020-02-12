import React from 'react';
import PropTypes from 'prop-types';
import KotageLogo from '../../png/kotage-logo__colour.png';
import './kt-logo.scss';

const KtLogo = ({ classes }) => (
	<div className="kt-logo ">
		<img src={KotageLogo} alt="" className={`kt-main-logo__${classes}`} />
	</div>
);

KtLogo.propTypes = {
  classes: PropTypes.string,
};

KtLogo.defaultProps = {
  classes: '',
};
export default KtLogo;
