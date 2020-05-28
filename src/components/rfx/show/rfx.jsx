/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRequestForProposals } from '../../../redux/actions/rfpActions';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import help from '../../../utils/requisitions/index/help';
import RfxItem from '../../rfx-item/rfx-item';
import '../rfx.scss';
import Divider from '../../kt-divider/divider';
import KtLoader from '../../loader/loader';
import { getPageRemainder } from '../../../utils/app';
import { SET_APP_NOTIFICATION } from '../../../redux/types/appTypes';


const RFX = ({
  getProposals, proposals, setNotification, isLoading, meta, page,
}) => {
  const history = useHistory();

  useEffect(() => {
    // check if records have not been loaded or there are more records to load
    if (proposals.length === 0) {
      getProposals(page)
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
    }
  }, []);

  const getDescription = () => (
	<div>
		Showing
		&nbsp;
		{proposals.length}
		&nbsp;
		out of
		&nbsp;
		{ meta.count }
		&nbsp;
		request for proposals.
		<Divider type="thick" />
	</div>
  );

  const loadMoreRecords = () => {
    // check if there are more records to load
    if (proposals.length < meta.count && meta.next) {
      getProposals(page + 1)
        .catch((error) => {
          const { response: { data: { invalid_token } } } = error;
          if (invalid_token) {
            history.push('/auth/signin');
          } else {
            setNotification(error, 'error');
          }
        });
    }
  };

  // eslint-disable-next-line consistent-return
  const getFootNote = () => {
    const rem = getPageRemainder(meta.count, proposals.length, 10);
    if (rem > 0) {
      return (
	<Button
		className="clickable bold kt-primary m-t-10 kt-transparent m-t-20"
		onClick={loadMoreRecords}
	>
		See
		&nbsp;
		{ getPageRemainder(meta.count, proposals.length, 10) }
		&nbsp;
		more request for proposals
		&nbsp;
	</Button>
      );
    }
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
				{ proposals && proposals.map((proposal) => (
					<div key={proposal.id}>
						<RfxItem type={proposal.published_at !== null ? 'Published' : 'Draft'} proposal={proposal} />
						<Divider type="faint" />
					</div>
				))}
				<div className="m-t-20">
					{isLoading && (
						<KtLoader />
					)}
				</div>
				{meta && getFootNote()}
			</div>
		</KtWrapper>
	</MainContent>
  );
};

const mapDispatchToProps = {
  getProposals: getRequestForProposals,
  setNotification: SET_APP_NOTIFICATION,
};

const mapStateToProps = (state) => ({
  proposals: state.rfp.proposals,
  meta: state.rfp.meta,
  page: state.rfp.currentPage,
  isLoading: state.rfp.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(RFX);
