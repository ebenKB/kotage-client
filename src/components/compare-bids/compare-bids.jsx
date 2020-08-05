/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
// import SortIcon from '@material-ui/icons/Sort';
// import { Form, Radio, Button } from 'semantic-ui-react';
// import PopupDropdown from '../snippets/popup/popup';
// import { ReactComponent as Sort } from '../../svg/sort.svg';
import { Dropdown, Button } from 'semantic-ui-react';
// import AllInclusiveSharpIcon from '@material-ui/icons/AllInclusiveSharp';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import _ from 'lodash';
import sentenceCase from '../../utils/app/transform-text';
import { ReactComponent as LinkIcon } from '../../svg/link.svg';
import Divider from '../kt-divider/divider';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import './compare-bids.scss';
import RfpSupplierItemWrapper from '../rfp-supplier-item-wrapper/rfp-supplier-item-wrapper';
import { getRfpBids } from '../../redux/actions/rfpActions';

const CompareBids = ({ getBidsForProposal, currentProposal }) => {
  const { id } = useParams();
  const [bids, setBids] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [amountSortOrder, setAmountSortOrder] = useState('Lowest amount');
  const [responseSortOrder, setResponseSortOrder] = useState('Date A-Z');

  const bidAmountSortOptions = [
    { text: 'Lowest amount', value: 'Lowest amount' },
    { text: 'Highest amount', value: 'Highest amount' },
  ];

  const bidResponseSortOptions = [
    { text: 'Date A-Z', value: 'Date A-Z' },
    { text: 'Date Z-A', value: 'Date Z-A' },
  ];

  // collate all answers from various bids
  const collateRfpAnswers = () => {
    let all_answers = [];
    if (bids) {
      for (const bid of bids) {
        const bidAnswers = bid.rfp_answers;
        if (bidAnswers) {
          all_answers = [
            ...all_answers,
            bidAnswers.map((ans) => ({ ...ans, supplier_name: bid.supplier.company_name })),
          ];
        }
      }
      setAnswers(...all_answers);
    }
  };

  useEffect(() => {
    getBidsForProposal(id)
      .then((data) => {
        setBids(data);
      });
  }, []);

  useEffect(() => {
    if (bids) {
      collateRfpAnswers();
    }
  }, [bids]);


  useEffect(() => {
    let orderedBids = null;
    if (amountSortOrder === 'Lowest amount') {
      orderedBids = _.orderBy(bids, ['bid_amount'], 'asc');
    } else {
      orderedBids = _.orderBy(bids, ['bid_amount'], 'des');
    }
    setBids(orderedBids);
  }, [amountSortOrder]);

  useEffect(() => {
    let orderedBids = null;
    if (responseSortOrder === 'Date A-Z') {
      orderedBids = _.orderBy(bids, 'bidAt', ['asc']);
    } else {
      orderedBids = _.orderBy(bids, 'bidAt', ['desc']);
    }
    setBids(orderedBids);
  }, [responseSortOrder]);

  // find all answers using the question id
  const getQuestionAnswers = (question_id) => {
    if (answers && question_id) {
      const ans = answers
        .filter((q) => parseInt(q.proposal_question_id, 10) === parseInt(question_id, 10));
      return ans;
    }
    return [];
  };

  const handleBidAmountSortChange = (e, { value }) => {
    setAmountSortOrder(value);
  };

  const handleBidResponseSortChange = (e, { value }) => {
    setResponseSortOrder(value);
  };

  return (
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
						value={amountSortOrder}
						options={bidAmountSortOptions}
						onChange={handleBidAmountSortChange}
					/>
				</div>
			</div>
			{bids && bids.map((bid) => (
				<div className="m-t-20">
					<RfpSupplierItemWrapper
						classes="m-b-10 m-t-10"
					>
						<div className="">
							{bid.supplier.company_name.toUpperCase()}
						</div>
						<div>
							Submitted on
							{format(new Date(bid.bidAt), 'iiii do LLLL, yyyy')}
						</div>
						<div className="text-right bold">
							<span>{bid.currency.name.toUpperCase()}</span>
							<span>{' '}</span>
							{bid.totalBidValue}
						</div>
					</RfpSupplierItemWrapper>
				</div>
			))}
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="faint" title="Compare Bid Responses" classes="m-t-10 m-b-10 p-b-10" />
			<div className="m-t-20">
				<div className="text-right floating-filter">
					<span className="m-r-5">Sort by</span>
					<Dropdown
						placeholder="Sort Bid Amount"
						search
						selection
						options={bidResponseSortOptions}
						onChange={handleBidResponseSortChange}
						value={responseSortOrder}
					/>
				</div>
			</div>
			{currentProposal && currentProposal.questions && currentProposal.questions.map((q) => (
				<>
					<div className="bid-question__bullet m-t-20" key={q.id}>
						<LinkIcon className="m-r-10 kt-success small logo" />
						<div className="bold">
							{q.question}
						</div>
					</div>
					{getQuestionAnswers(q.id).map((ans) => (
						<div className="bid-response__headings m-t-20">
							<div>{sentenceCase(ans.supplier_name)}</div>
							<div>{ans.answer}</div>
						</div>
					))}
				</>
			))}
			<div className="m-t-20 text-right">
				<Button
					content="See more responses from suppliers"
					className="kt-primary kt-transparent"
				/>
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

const mapDispatchToProps = {
  getBidsForProposal: getRfpBids,
};

CompareBids.propTypes = {
  getBidsForProposal: PropTypes.func.isRequired,
  currentProposal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentProposal: state.rfp.currentProposal,
});
export default connect(mapStateToProps, mapDispatchToProps)(CompareBids);
