import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import './user-profile.scss';
import { Link } from 'react-router-dom';

const UserProfile = ({title, user}) => {
  return (
  <Dropdown 
    text='John Smith'
    pointing='top right'
    className='user-profile'
  >
    <Dropdown.Menu>
      <Dropdown.Item 
        text={(
          <Link to='/user-profile'>
            Your profile
          </Link>
        )}  
        icon='user' 
        description=''
        className="kt-success" 
      />
      <Dropdown.Item 
        icon='folder' 
        text={(
        <Link to='/user/requisitions'>
          Your requisitions
        </Link>
        )} 
      />
      <Dropdown.Item 
        text={(
          <Link to='/john/help'>
            Help Center
          </Link>
        )}  
        icon='help circle' 
        description='' 
      />
      <Dropdown.Item 
        text={(
          <Link to='/user/settings'>
            Settings
          </Link>
        )} 
        icon='setting' 
      />
      <Dropdown.Divider />
      <Dropdown.Item 
        icon='sign-out' 
        text='Sign out'
        className="kt-danger"
      />
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default  UserProfile 
