import React from 'react';
import { ReactComponent as Loader } from '../../svg/loader.svg';
import './loader.scss';

const PageLoader = () => (
	<div className="loader text-center">
		<Loader />
	</div>
);

export default PageLoader;
