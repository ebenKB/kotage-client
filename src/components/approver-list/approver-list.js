import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import './approver-list.scss';
import { ReactComponent as Logo } from '../../svg/plus.svg';
import AddItem from '../snippets/add-item/add-item';

const ApproverList = ({labelName, label}) => {
  const options = [
    {
      key: '1',
      text: 'Emmanuel',
      value: 'Emmanuel'
    },
    {
      key: '2',
      text: 'Elorm',
      value: 'Elorm'
    },
  ]

  const handleClick = () => {
    console.log('we want to add a new approver');
  }
  
  return (
    <div className="approver-list__wrapper m-t-40">
      <div className="approver-list__content">
        <label htmlFor={labelName}> <span className="bold">{label}</span></label>
        <div>
          <div className="m-t-10 m-b-10">
            <Dropdown placeholder='Select approver' search selection options={options} className="fluid"/>
          </div>
          <AddItem
            classes="m-t-40 m-b-30"
            title="Add New Approver"
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default ApproverList
