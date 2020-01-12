import React from 'react';
import './header.scss';
import { ReactComponent as Kotage } from '../../svg/kotage.svg';
import Search from '../form-fields/search-input/search-input';

const header = () => {
  return (
    <div className="header">
      <div className="content">
        <div>
          <Kotage className="kotage-logo"/>
        </div>
          <Search />
          <div>user icon</div>
      </div>
    </div>
  )
}

export default header
