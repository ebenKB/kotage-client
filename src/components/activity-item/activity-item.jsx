/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import './activity-item.scss';
import { Table } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import PaginationFootnote from '../pagination-footnote/pagination-footnote';
import { getPageRemainder } from '../../utils/app/index';
import KtLoader from '../loader/loader';

const ActivityItem = ({ recentActivities, loadMoreRecords, loading }) => {
  useEffect(() => {
    console.log('These are the activities', recentActivities);
  }, []);
  const getRemainder = () => {
    const { meta, data } = recentActivities;
    return getPageRemainder(meta.count, data.length, 10);
  };

  return (
	<div className="activity-item">
		<div className="activity-item__wrapper">
			{recentActivities && recentActivities.data && (
				<Table striped compact="very">
					<Table.Body>
						{recentActivities.data.map((r) => (
							<Table.Row key={r.id}>
								<Table.Cell>{r.message}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			)}
		</div>
		{loading && (
			<div className="m-t-10 m-b-10">
				<KtLoader />
			</div>
		)}
		<div className="m-t-20 kt-primary">
			{getRemainder() > 0 && (
				<PaginationFootnote
					handleAction={() => loadMoreRecords()}
					remainder={getRemainder()}
					caption="recent activites"
				/>
			)}
		</div>
	</div>
  );
};


ActivityItem.propTypes = {
  recentActivities: PropTypes.object.isRequired,
  loadMoreRecords: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ActivityItem;
