import React from 'react'
import './amount.scss';
import { Dropdown } from 'semantic-ui-react'
import Input from '../../../components/form-fields/input/input';

const options = [
  { key: 'GHC', text: 'GHC', value: 'GHC' },
  { key: 'USD', text: 'USD', value: 'USD' },
]

const amount = () => {
  return (
    <div className="amount-group">
      <Input
        label={<Dropdown defaultValue='GHC' options={options} className="custom"/>}
        labelPosition='left'
        placeholder='Amount'
        type='number'
        min={0}
      />
    </div>
  )
}

export default amount
