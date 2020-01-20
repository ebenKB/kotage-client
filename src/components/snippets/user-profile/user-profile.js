// import React from 'react'
// import { Dropdown } from 'semantic-ui-react'

// const UserProfile = ({title}) => (
//   <Dropdown text={title} pointing='top right'>
//     <Dropdown.Menu>
//       <Dropdown.Item text='New' />
//       <Dropdown.Item text='Open...' description='ctrl + o' />
//       <Dropdown.Item text='Save as...' description='ctrl + s' />
//       <Dropdown.Item text='Rename' description='ctrl + r' />
//       <Dropdown.Item text='Make a copy' />
//       <Dropdown.Item icon='folder' text='Move to folder' />
//       <Dropdown.Item icon='trash' text='Move to trash' />
//       <Dropdown.Divider />
//       <Dropdown.Item text='Download As...' />
//       <Dropdown.Item text='Publish To Web' />
//       <Dropdown.Item text='E-mail Collaborators' />
//     </Dropdown.Menu>
//   </Dropdown>
// )

// export default UserProfile

import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import './user-profile.scss';

const trigger = (
  <span>
    <Icon name='user' className="heading "/> John, Smith
  </span>
)

const options = [
  {
    key: 'user',
    text: (
      <span>
        Signed in as <strong>John Smith</strong>
      </span>
    ),
    disabled: true,
  },
  { key: 'profile', text: (
    <>
      <Icon name='user' />
      <span>Your Profile</span>
    </>
  )},

  { key: 'help', text: (
    <>
      <Icon name='help circle' />
      <span>Help</span>
    </>
  )},
  { key: 'settings', text: (
    <div>
      <Icon name='setting' />
      <span>Settings</span>
    </div>
  )},
  { key: 'sign-out', text: (
    <>
      <Icon name='sign-out' />
      <span>Sign Out</span>
    </>
  )},
]

const UserDropdown = () => (
  <Dropdown
    trigger={trigger} 
    options={options} 
    pointing='top right'
    className="user-profile"
  />
)

export default UserDropdown
