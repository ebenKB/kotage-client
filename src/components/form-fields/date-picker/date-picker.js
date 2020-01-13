import React from 'react';
import Input from '../input/input';

const DatePicker = ({placeholder}) => {
  return (
    <div>
      <Input
        type="date"
        placeholder={placeholder}
      />
      <span class="open-button">
        icon here
      </span>
    </div>
  )
}

export default DatePicker;
