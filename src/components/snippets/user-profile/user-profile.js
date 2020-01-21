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
            Help
          </Link>
        )}  
        icon='help circle' 
        description='' 
      />
      <Dropdown.Item 
        icon='sign-out' 
        text='Sign out' 
      />
      <Dropdown.Divider />
      <Dropdown.Item 
        text={(
          <Link to='/user/settings'>
            Settings
          </Link>
        )} 
        icon='setting' />
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default  UserProfile 
