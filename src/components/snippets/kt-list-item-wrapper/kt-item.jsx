import React from 'react';
import { PropTypes } from 'prop-types';
import { Divider } from 'semantic-ui-react';
import { ReactComponent as Logo } from '../../../svg/cart.svg';

const KtItem = ({ children }) => (
	<>
		<div className="kt-list__item rfx-item">
			<div className="icon-caption">
				<Logo />
			</div>
			<div className="kt-list__item-content">
				{children}
			</div>
		</div>
		<Divider />
	</>
);

KtItem.propTypes = {
  children: PropTypes.element.isRequired,
};

export default KtItem;
