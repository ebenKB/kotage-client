/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { ReactComponent as Icon } from '../../../svg/plus.svg';
import './add-item.scss';


const AddItem = ({
  title, classes, handleClick, Logo, isUrlLink, linkUrl,
}) => (
	<div>
		{!isUrlLink && (
			<Button className={`add-item cta kt-transparent clickable kt-primary bold sm-caption ${classes}`} onClick={handleClick}>
				{Logo !== null && (
					<div className="m-r-10">{Logo}</div>
				)}
				{Logo === null && (
					<Icon className="kt-logo__small kt-primary" />
				)}
				<span>{title}</span>
			</Button>
		)}
		{isUrlLink && (
			<Link to={linkUrl}>
				<Button className={`add-item cta kt-transparent clickable kt-primary bold sm-caption ${classes}`}>
					{Logo !== null && (
						<div className="m-r-10">{Logo}</div>
					)}
					{Logo === null && (
						<Icon className="kt-logo__small kt-primary" />
					)}
					<span>{title}</span>
				</Button>
			</Link>
		)}
	</div>
);

AddItem.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  Logo: PropTypes.object,
  isUrlLink: PropTypes.bool,
  linkUrl: PropTypes.string,
};


AddItem.defaultProps = {
  classes: '',
  Logo: null,
  isUrlLink: false,
  linkUrl: '',
};

export default AddItem;
