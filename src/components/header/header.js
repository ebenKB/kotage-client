import React from 'react';
import './header.scss';
import { ReactComponent as Kotage } from '../../svg/kotage.svg';
import Search from '../form-fields/search-input/search-input';
import UserProfile from '../snippets/user-profile/user-profile';

const header = () => {
  return (
    <div className="header">
      <div className="content">
        <div>
          <Kotage className="kotage-logo"/>
        </div>
          <Search />
          <div>
            <UserProfile
              title='John Smith'
            />
          </div>
      </div>
    </div>
  )
}

export default header
