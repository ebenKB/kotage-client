/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import useCollapse from 'react-collapsed';
import { Icon } from 'semantic-ui-react';
import './collapsible.scss';
import Divider from '../../kt-divider/divider';

const Collapsible = (props) => {
  const [isOpen, setOpen] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

  const getContent = () => {
    if (isOpen) {
      return (
	<div className="collapse-header">
		<Icon name="angle down" />
		<Divider type="thick" title={props.title} classes="m-t-10" />
	</div>
      );
    }
    return (
	<div className="collapse-header">
		<Icon name="angle up" />
		<Divider type="thick" title={props.title} classes="m-t-10" />
	</div>
    );
  };
  return (
	<Fragment>
		<button
			type="button"
			className="collapsibe-btn"
			{...getToggleProps({ onClick: () => setOpen((oldOpen) => !oldOpen) })}
		>
			{getContent()}
		</button>
		<section {...getCollapseProps()}>
			{props.children}
		</section>
	</Fragment>
  );
};

export default Collapsible;
