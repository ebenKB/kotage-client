import React from 'react';
import { Button } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { ReactComponent as Logo } from '../../../svg/plus.svg';


const AddItem = ({ title, classes, handleClick }) => (
	<Button className={`cta kt-transparent clickable kt-primary bold sm-caption ${classes}`} onClick={handleClick}>
		<Logo className="kt-logo__small kt-primary" />
		<span>{title}</span>
	</Button>
);

AddItem.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};


AddItem.defaultProps = {
  classes: '',
};

export default AddItem;
