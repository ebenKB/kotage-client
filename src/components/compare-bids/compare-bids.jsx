import React from 'react';
// import SortIcon from '@material-ui/icons/Sort';
// import { Form, Radio, Button } from 'semantic-ui-react';
// import PopupDropdown from '../snippets/popup/popup';
// import { ReactComponent as Sort } from '../../svg/sort.svg';
import { Dropdown, Button } from 'semantic-ui-react';
// import AllInclusiveSharpIcon from '@material-ui/icons/AllInclusiveSharp';
import { ReactComponent as LinkIcon } from '../../svg/link.svg';
import Divider from '../kt-divider/divider';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import './compare-bids.scss';

const CompareBids = () => (
	<MainContent
		help={Help}
	>
		<RfpTitle classes="m-t-20" />
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="faint" title="Compare Bid Amounts" classes="m-t-10 m-b-10 p-b-10" />
			<div className="m-t-20">
				<div className="text-right floating-filter">
					<span className="m-r-5">Sort by</span>
					<Dropdown
						placeholder="Sort Bid Amount"
						search
						selection
						options={[{ text: 'Lowest amount' }, { text: 'Highest amount' }, { text: 'Date A-Z' }, { text: 'Date Z-A' }]}
					/>
				</div>
			</div>
			<div className="m-t-20">
				<div className="rfp-suppliers__item m-b-10 m-t-10">
					<div className="bold">MTN GHANA LIMITED</div>
					<div>25th May, 2020</div>
					<div className="text-right">USD 90,000</div>
				</div>
				<div className="rfp-suppliers__item m-b-10 m-t-10">
					<div className="bold">ASA SAVINGS LIMITED</div>
					<div>25th May, 2020</div>
					<div className="text-right">USD 85,000</div>
				</div>
				<div className="rfp-suppliers__item m-b-10 m-t-10">
					<div className="bold">BANK OF GHANA LIMITED</div>
					<div>25th May, 2020</div>
					<div className="text-right">USD 80,000</div>
				</div>
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="faint" title="Compare Bid Responses" classes="m-t-10 m-b-10 p-b-10" />
			<div className="m-t-20">
				<div className="text-right floating-filter">
					<span className="m-r-5">Sort by</span>
					<Dropdown placeholder="Sort Bid Amount" search selection options={[{ text: 'Date A-Z' }, { text: 'Date Z-A' }]} />
				</div>
			</div>
			<div className="bid-question__bullet m-t-20">
				<LinkIcon className="m-r-10 kt-success small logo" />
				<div className="bold">Are you officially registered with the National Tax Commission?</div>
			</div>
			{/* <div className="bid-response__headings m-t-20">
				<div className="bold">Company</div>
				<div className="bold">Response</div>
			</div> */}
			<div className="bid-response__headings m-t-20">
				<div>Mtn Ghana Limited</div>
				<div>Response</div>
			</div>
			<div className="bid-response__headings m-t-20">
				<div>ASA Savings & Loans</div>
				<div>Response</div>
			</div>
			<div className="bid-response__headings m-t-20">
				<div>Tigo Ghana Limited</div>
				<div>Response</div>
			</div>
			<div className="bid-question__bullet m-t-40">
				<LinkIcon className="m-r-10 small logo kt-success" />
				<div className="bold">Do you have a competent team to handle this project?</div>
			</div>
			{/* <div className="bid-response__headings m-t-20">
				<div className="bold">Company</div>
				<div className="bold">Response</div>
			</div> */}
			<div className="bid-response__headings m-t-20">
				<div>Mtn Ghana Limited</div>
				<div>Response</div>
			</div>
			<div className="bid-response__headings m-t-20">
				<div>ASA Savings & Loans</div>
				<div>Response</div>
			</div>
			<div className="bid-response__headings m-t-20">
				<div>Tigo Ghana Limited</div>
				<div>Response</div>
			</div>
			<div className="bid-question__bullet m-t-40">
				<LinkIcon className="m-r-10 kt-success small logo" />
				<div className="bold">Do you have a competent team to handle this project?</div>
			</div>
			{/* <div className="bid-response__headings m-t-20">
				<div className="bold">Company</div>
				<div className="bold">Response</div>
			</div> */}
			<div className="bid-response__headings m-t-20">
				<div>Mtn Ghana Limited</div>
				<div>Response</div>
			</div>
			<div className="bid-response__headings m-t-20">
				<div>ASA Savings & Loans</div>
				<div>Response</div>
			</div>
			<div className="bid-response__headings m-t-20">
				<div>Tigo Ghana Limited</div>
				<div>Yes</div>
			</div>
			<div className="m-t-20 text-right">
				<Button
					content="See more responses from suppliers"
					className="kt-primary kt-transparent"
				/>
			</div>
		</KtWrapperLite>
	</MainContent>
);

export default CompareBids;
