/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as Logo } from '../../../svg/plus.svg';


const AddItem = ({ title, classes, handleClick }) => (
	<div className={`clickable kt-primary bold sm-caption ${classes}`} onClick={handleClick}>
		<Logo className="kt-logo__small kt-primary" />
		<span>{title}</span>
	</div>
);

AddItem.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default AddItem;
