import React from 'react';
import { ReactComponent as Logo } from '../../../svg/plus.svg';

const AddItem = ({title, classes, handleClick}) => {
  return (
	<div className={`clickable kt-primary bold sm-caption ${classes}`} onClick={handleClick}>
		<Logo className="kt-logo__small kt-primary"/>
		<span>{title}</span>
	</div>
  )
}

export default AddItem;

