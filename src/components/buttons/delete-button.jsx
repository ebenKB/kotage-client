/* eslint-disable react/require-default-props */
import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ReactComponent as Trash } from '../../svg/bin.svg';
import './buttons.scss';


const DeleteButton = ({ type, classes = '' }) => {
  const getButton = () => {
    if (type === 'icon') {
      return (
	<Button className={`kt-transparent ${classes}`}>
		<Trash className="delete kt-logo__small" />
	</Button>
      );
    }
    return (<div className={classes}>text button</div>
    );
  };
  return (<>{getButton()}</>);
};

DeleteButton.propTypes = {
  type: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default DeleteButton;
