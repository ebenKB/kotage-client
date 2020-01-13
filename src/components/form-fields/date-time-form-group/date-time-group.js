import React from 'react'

import './date-time-group.scss';

const DateTimeGroup = ({labelName, label}) => {
  return (
    <div className="date-time-group">
      <label htmlFor={labelName}> <span className="bold">{label}</span></label>
      <div className="date-group__content">
        <div>date</div>
        <div>time</div>
      </div>
    </div>
  )
}

export default DateTimeGroup
