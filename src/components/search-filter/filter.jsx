import React from 'react';
import PopupDropdown from '../snippets/popup/popup';
import './filter.scss';

const filter = () => (
	<div className="search-filter">
    search filter
		<span>
			{' '}
			<PopupDropdown />
		</span>
	</div>
);

export default filter;
