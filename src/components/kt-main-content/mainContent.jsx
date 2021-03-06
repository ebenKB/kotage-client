/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Divider from '../kt-divider/divider';
import './kt-main-content.scss';

const MainContent = (props) => {
  const { help, classes } = props;
  return (
	<div className={`kt-main__content ${classes}`}>
		<div>
			{props.children}
		</div>
		<div className="help kt-black">
			{ help && help.map((h, idx) => (
				<div key={idx}>
					<Divider
						type="faint"
						title={h.title}
						classes="help p-b-4"
					/>
					<div className="m-t-10 m-b-20">{h.description}</div>
				</div>
			))}
		</div>
	</div>
  );
};

export default MainContent;
