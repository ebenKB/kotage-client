/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'semantic-ui-react';
import './kt-wrapper.scss';
import SearcFilter from '../search-filter/filter';

class KtWrapper extends React.Component {
  render() {
    let {
      link = '', linkName = '', header, canFilter, canPerform, handleAction, cancelUrl = '/', loading = false, actionName = 'Save', disabled = false,
    } = this.props;

    // check if there are no defaults
    if (link == null) {
      link = '/';
    }

    if (linkName == null) {
      linkName = 'New';
    }

    const options = [
      {
        text: 'Sort A-Z',
        key: 1,
        value: 1,
      },
      {
        text: 'Sort Z-A',
        key: 2,
        value: 2,
      },
    ];

    const handleChange = (e, data) => {
      console.log('The selection has chnaged', data);
    };

    const performAction = (e) => {
      console.log('we want to perform an action', this.props.footer, e);
    };

    return (
	<div className="kt-wrapper">
		<div className="kt-wrapper__header bold">
			<h2>{header}</h2>
			<div>
				<div>
					{canFilter && (
						<Dropdown placeholder="Filter records" selection options={options} onChange={handleChange} className="m-r-20 " />
					)}
					{linkName.length > 0 && (
						<Link to={link} className="action-link green ui button">
							{linkName}
						</Link>
					)}
				</div>

			</div>
		</div>
		<div className="kt-wrapper__body">
			{ canFilter && <SearcFilter /> }
			<div className="kt-wrapper__content">
				{this.props.children}
			</div>
		</div>
		{canPerform && (
			<div className="kt-wrapper__footer text-right">
				<div className="content">
					<Link to={cancelUrl}>
						<Button content="Cancel" className="default" />
					</Link>
					<Button
						type="submit"
						content={actionName}
						className={`green ${loading && 'loading'}`}
						onClick={handleAction}
						disabled={disabled}
					/>
				</div>
			</div>
		)}
	</div>
    );
  }
}

export default KtWrapper;
