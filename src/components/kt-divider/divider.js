import React from 'react'
import './divider.scss';

const divider = ({title, type, display}) => {
  return (
    <div className={`kt-divider ${type} bold ${display}`}>{title}</div>
  )
}

export default divider
