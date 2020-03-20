/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRequestForProposals } from '../../../redux/actions/rfpActions';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import help from '../../../utils/requisitions/index/help';
import RfxItem from '../../rfx-item/rfx-item';
import '../rfx.scss';
import Divider from '../../kt-divider/divider';


const RFX = ({ getProposals, proposals, meta }) => {
  useEffect(() => {
    if (!proposals || proposals.length === 0) {
      getProposals();
    }
  }, [proposals]);

  const getDescription = () => (
	<div>
    Showing
    &nbsp;
		{meta.items}
    &nbsp;
    out of
		&nbsp;
		{ meta.count }
		&nbsp;
    request for proposals.
		<Divider type="thick" />
	</div>
  );

  const getFootNote = () => {
    const remainder = meta.count - meta.items;
    let diff = null;
    if (remainder >= 10) {
      diff = 10;
    } else {
      diff = remainder;
    }
    return (
	<div className="clickable bold kt-primary m-t-10">
    See
    &nbsp;
		{ diff }
    &nbsp;
    more request for proposals
    &nbsp;
	</div>
    );
  };

  return (
	<MainContent
		classes="m-t-20 rfx"
		help={help}
	>
		<KtWrapper
			header="RFx Events"
			canPerform={false}
			canFilter={false}
			link="rfx/new"
			linkName="New"
		>
			<div>
				{meta && getDescription()}
				<RfxItem type="Published" proposal={null} />
				<Divider type="faint" />
				<RfxItem type="Published" proposal={null} />
				<Divider type="faint" />
				{ proposals && proposals.map((proposal) => (
					<div>
						<RfxItem type={proposal.published_at !== null ? 'Published' : 'Draft'} proposal={proposal} />
						<Divider type="faint" />
					</div>
				))}
				{meta && getFootNote()}
			</div>
		</KtWrapper>
	</MainContent>
  );
};

const mapDispatchToProps = {
  getProposals: getRequestForProposals,
};

const mapStateToProps = (state) => ({
  proposals: state.rfp.proposals,
  meta: state.rfp.meta,
});

export default connect(mapStateToProps, mapDispatchToProps)(RFX);
