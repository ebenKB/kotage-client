import React from 'react';
import { PropTypes } from 'prop-types';
import './timeline-item.scss';
import format from 'date-fns/format';

const TimelineItem = ({ label, dateValue, timeValue }) => {
  const getDate = () => format(new Date(dateValue), 'EEEE, do MMMM, yyyy');

  return (
	<div className="timeline-wrapper m-t-20">
		<div>
			{label}
		</div>
		<div>
			{getDate()}
			@
			{' '}
			{timeValue}
		</div>
	</div>
  );
};

TimelineItem.propTypes = {
  label: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  timeValue: PropTypes.string.isRequired,
};

export default TimelineItem;
