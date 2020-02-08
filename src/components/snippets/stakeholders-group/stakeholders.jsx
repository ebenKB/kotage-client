import React from 'react';
import './stakeholders.scss';
import Input from '../../form-fields/input/input';
import { ReactComponent as Trash } from '../../../svg/bin.svg';
import { ReactComponent as Logo } from '../../../svg/plus.svg';
import { Dropdown } from 'semantic-ui-react';

const Stakeholders = () => {
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
	<div className="kt-stk__group m-t-30">
		<div className="bold">Stakeholders</div>
		<div>
			<div className="kt-stk-group__header bold light-caption">
				<div>Name or Email</div>
				<div>Permission</div>
			</div>
			<div className="kt-stk__content m-t-20">
				<div>
					<Input
            classes="fluid"
            placeholder="John Smith"
            type="text"
            />
				</div>
				<div>
					<Dropdown selection options={options} placeholder="Event owner"/>
				</div>
				<div>
					<Trash className="kt-logo__small"/>
				</div>
			</div>
			<div className="clickable m-t-20 kt-primary bold sm-caption" onClick={handleClick}>
				<Logo className="kt-logo__small kt-primary"/>
				<span>Invite Stakeholder</span>
			</div>
		</div>
	</div>
  )
}

export default Stakeholders