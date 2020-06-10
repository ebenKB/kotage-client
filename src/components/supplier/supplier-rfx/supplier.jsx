/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import SupplierRfxItem from '../supplier-rfx-item/supplier-rfx-item';
import { getSupplierRfp } from '../../../redux/actions/supplierRfpActions';
import { getPageRemainder } from '../../../utils/app/index';
import PaginationFootnote from '../../pagination-footnote/pagination-footnote';

const supplier = ({ proposals, meta, getSupplierRfpEvents }) => {
  useEffect(() => {
    console.log('here loading');
    getSupplierRfpEvents();
  }, []);

  const getRemainder = () => getPageRemainder(meta.count, proposals.length, 10);

  const loadMoreRecords = () => {
    console.log('We want more records');
  };

  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Active Events"
		>
			<div>
				<Divider type="faint" />
				{proposals && proposals.map((p) => (
					<>
						<SupplierRfxItem
							proposal={p}
							type="RfP"
						/>
						<Divider type="faint" />
					</>
				))}
			</div>
			<div className="m-t-20">
				{meta && getRemainder() > 0 && (
					<PaginationFootnote
						remainder={getRemainder()}
						handleAction={() => loadMoreRecords}
						caption="request for proposals"
					/>
				)}
			</div>
		</KtWrapper>
	</MainContent>
  );
};
const mapDispatchToProps = {
  getSupplierRfpEvents: getSupplierRfp,
};

const mapStateToProps = (state) => ({
  proposals: state.supplierRfp && state.supplierRfp.proposals,
  meta: state.supplierRfp && state.supplierRfp.meta,
});

export default connect(mapStateToProps, mapDispatchToProps)(supplier);
