import React from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as File } from '../../svg/empty.svg';

const EmptyContentWrapper = ({ message }) => (
	<div className="text-center m-t-20 m-b-20">
		<File className="medium dark logo" />
		<p>{message}</p>
	</div>
);


EmptyContentWrapper.propTypes = {
  message: PropTypes.string,
};

EmptyContentWrapper.defaultProps = {
  message: '',
};

export default EmptyContentWrapper;
