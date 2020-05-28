import React from 'react';
// import SortIcon from '@material-ui/icons/Sort';
import { Button } from 'semantic-ui-react';
import { ReactComponent as Sort } from '../../svg/sort.svg';
import Divider from '../kt-divider/divider';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';

const CompareBids = () => (
	<MainContent
		help={Help}
	>
		<RfpTitle classes="m-t-20" />
		<div className="m-t-20">
			<div className="text-right">
				<Button
					className="kt-transparent"
					content={<Sort />}
				/>
			</div>
		</div>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="faint" title="Compare Bid Amounts" classes="m-t-10 m-b-10 p-b-10" />
			do some comparisions here
		</KtWrapperLite>
	</MainContent>
);

export default CompareBids;
