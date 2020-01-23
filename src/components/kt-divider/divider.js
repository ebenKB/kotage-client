import React from 'react'
import './divider.scss';

const divider = ({title, type, classes=''}) => {
  return (
    <div className={`kt-divider ${type} bold ${classes} ${type==='faint' ? 'p-b-4': 'p-b-8'}`}>{title}</div>
  )
}

export default divider
