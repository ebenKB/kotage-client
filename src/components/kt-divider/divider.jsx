/* eslint-disable react/prop-types */
import React from 'react';
import { Label } from 'semantic-ui-react';
import './divider.scss';

const divider = ({
  title, type, classes = '', isNumbered = false, number = '',
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
		<div className={`kt-divider ${type} bold  ${type === 'faint' ? 'p-b-4' : 'p-b-8'}`}>{title}</div>
	</div>
      );
    }
    return (
	<div className={`kt-divider ${type} ${classes} bold  ${type === 'faint' ? 'p-b-4' : 'p-b-8'}`}>{title}</div>
    );
  };

  return (
    getForm()
  );
};


export default divider;
