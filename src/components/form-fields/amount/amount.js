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
    <div>
      {/* <Dropdown upward floating options={options} text='File' />
      <Input type="number"/> */}
      <Input
        label={<Dropdown defaultValue='GHC' options={options} />}
        labelPosition='left'
        placeholder='Find domain'
        type='number'
      />
    </div>
  )
}

export default amount
