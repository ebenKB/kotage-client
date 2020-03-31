import React from 'react';
import { PropTypes } from 'prop-types';
import './timeline-item.scss';
import format from 'date-fns/format';

const TimelineItem = ({ label, dateValue }) => {
  const getDate = () => format(new Date(dateValue), 'EEEE, io MMMM, yyyy');
  const getTime = () => format(15, 'H aaaa');

  return (
	<div className="timeline-wrapper m-t-20">
		<div>
			{label}
		</div>
		<div>
			{getDate()}
      @
			{' '}
			{getTime()}
		</div>
	</div>
  );
};

TimelineItem.propTypes = {
  label: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  // timeValue: PropTypes.string.isRequired,
};

export default TimelineItem;
