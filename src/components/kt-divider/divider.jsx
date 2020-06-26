/* eslint-disable react/prop-types */
import React from 'react';
import { Label } from 'semantic-ui-react';
import { ReactComponent as Icon } from '../../svg/link.svg';

import './divider.scss';

const divider = ({
  title, type, classes = '', isNumbered = false, number = '', ishoverable = false,
}) => {
  const getForm = () => {
    if (isNumbered) {
      return (
	<div className={`kt-divider__wrapper ${classes}`}>
		<div>
			<Label size="big" circular className="kt-success">
				{number}
			</Label>
		</div>
		<div
			className={
        `kt-divider ${type} bold  ${type === 'faint' ? 'p-b-4' : 'p-b-8'} ${ishoverable && 'hoverable'}`
      }
		>
			{title}
			{ishoverable && <Icon className="m-l-5 small dark logo" />}
		</div>
	</div>
      );
    }
    return (
	<div className={`kt-divider ${type} ${classes} bold  ${type === 'faint' ? 'p-b-4' : 'p-b-8'} ${ishoverable && 'hoverable'}`}>
		{title}
		{ishoverable && <Icon className="m-l-5 small dark logo" />}
	</div>
    );
  };

  return (
    getForm()
  );
};


export default divider;
