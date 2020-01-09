import React from 'react';
import './header.scss';
import { ReactComponent as Kotage } from '../../svg/kotage.svg';

const header = () => {
  return (
    <div className="header">
      <div className="content">
        <div>
          <Kotage className="kotage-logo"/>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default header
