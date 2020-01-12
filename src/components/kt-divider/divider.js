import React from 'react'
import './divider.scss';

const divider = ({title, type, classes}) => {
  return (
    <div className={`kt-divider ${type} bold ${classes}`}>{title}</div>
  )
}

export default divider
