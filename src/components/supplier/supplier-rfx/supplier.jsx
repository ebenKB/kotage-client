/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Divider from '../../kt-divider/divider';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import SupplierRfxItem from '../supplier-rfx-item/supplier-rfx-item';
import { getSupplierRfp } from '../../../redux/actions/supplierRfpActions';
import { getPageRemainder } from '../../../utils/app/index';
import PaginationFootNote from '../../pagination-footnote/pagination-footnote';
import { setNotification } from '../../../redux/actions/appActions';
import KtLoader from '../../loader/loader';

const supplier = ({
  proposals, meta, getSupplierRfpEvents, loading,
}) => {
  const history = useHistory();

  useEffect(() => {
    getSupplierRfpEvents()
      .catch((error) => {
        if (error.response) {
          const { response: { data: { invalid_token } } } = error;
          if (invalid_token) {
            history.push('/auth/signin');
          } else {
            setNotification(error, 'error');
          }
        }
      });
  }, []);

  const getRemainder = () => getPageRemainder(meta.count, proposals.length, 10);

  const activeEvents = () => {
    if (proposals) {
      return proposals.filter((p) => p.hasResponded === false);
    }
    return null;
  };

  const allEvents = () => {
    if (proposals) {
      return proposals.filter((p) => p.hasResponded === true);
    }
    return null;
  };

  const loadMoreRecords = () => {
  };

  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Events"
		>
			<div>

				{activeEvents().length > 0 && (
					<div>
						<Divider type="thick" title={`Active Events (${activeEvents().length})`} classes="kt-success" />
						{activeEvents().map((p) => (
							<>
								<SupplierRfxItem
									proposal={p}
									type="RfP"
								/>
								<Divider type="faint" />
							</>
						))}
					</div>
				)}
				{allEvents().length > 0 && (
					<div>
						<Divider type="faint" title={`All Events (${allEvents().length})`} classes="m-t-40" />

						{allEvents().map((p) => (
							<Fragment key={p.id}>
								<SupplierRfxItem
									proposal={p}
									type="RfP"
									key={p.id}
								/>
								<Divider type="faint" />
							</Fragment>
						))}
					</div>
				)}
			</div>
			{loading && (
				<div className="m-t-20">
					<KtLoader />
				</div>
			)}
			<div className="m-t-20">
				{meta && getRemainder() > 0 && (
					<PaginationFootNote
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
  loading: state.supplierRfp.loading,
  proposals: state.supplierRfp && state.supplierRfp.proposals,
  meta: state.supplierRfp && state.supplierRfp.meta,
});

export default connect(mapStateToProps, mapDispatchToProps)(supplier);
