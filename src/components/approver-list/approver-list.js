import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import './approver-list.scss';
import { ReactComponent as Logo } from '../../svg/plus.svg';

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

  }
  return (
    <div className="approver-list__wrapper m-t-40">
      <div className="approver-list__content">
        <label htmlFor={labelName}> <span className="bold">{label}</span></label>
        <div>
          <div className="m-t-10 m-b-10">
            <Dropdown placeholder='Select approver' search selection options={options} className="fluid"/>
          </div>
          <div className="clickable m-t-40 m-b-30 kt-primary bold sm-caption" onClick={handleClick}>
            <Logo className="kt-logo__small kt-primary"/>
            <span>Add New Approver</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproverList
