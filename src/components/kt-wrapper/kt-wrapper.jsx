/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'semantic-ui-react';
import './kt-wrapper.scss';
import SearcFilter from '../search-filter/filter';

/**
 * This is a general wrapper for form elements
 */
class KtWrapper extends React.Component {
  render() {
    const {
      header,
      canFilter,
      canPerform,
      handleAction,
      cancelUrl = '/',
      isLoading = false,
      actionName,
      isDisabled = false,
      canPublish = false,
      children,
      saveBtnClasses,
      handlePublishAction,
      isLite,
      isLoadingSecondary,
    } = this.props;
    let {
      link = '', linkName = '',
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

    return (
	<div className="kt-wrapper">
		{!isLite && (
			<div className={`kt-wrapper__header ${!isLite && 'bold'}`}>
				{!isLite && (<h2>{header}</h2>)}
				{isLite && (<>{header}</>)}
				<div>
					<div>
						{canFilter && (
							<Dropdown placeholder="Filter records" selection options={options} className="m-r-20 " />
						)}
						{linkName.length > 0 && (
							<Link to={link} className="action-link green ui button">
								{linkName}
							</Link>
						)}
					</div>

				</div>
			</div>
		)}
		<div className="kt-wrapper__body">
			{ canFilter && <SearcFilter /> }
			<div className="kt-wrapper__content">
				{children}
			</div>
		</div>
		{canPerform && (
			<div className="kt-wrapper__footer text-right">
				<div className="content">
					<Link to={cancelUrl}>
						<Button basic content="Cancel" className="default" />
					</Link>
					<Button
						type="submit"
						content={actionName}
						className={`${saveBtnClasses} ${isLoadingSecondary && 'loading'}`}
						onClick={handleAction}
						disabled={isDisabled}
					/>
					{canPublish && (
						<Button
							type="submit"
							content="Publish"
							className={`green ${isLoading && 'loading'}`}
							onClick={handlePublishAction}
							disabled={isDisabled}
						/>
					)}
				</div>
			</div>
		)}
	</div>
    );
  }
}

// vaidate all proptypes
KtWrapper.propTypes = {
  link: PropTypes.string,
  linkName: PropTypes.string,
  header: PropTypes.string.isRequired,
  canFilter: PropTypes.bool,
  canPerform: PropTypes.bool,
  handleAction: PropTypes.func,
  cancelUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  actionName: PropTypes.string,
  isDisabled: PropTypes.bool,
  canPublish: PropTypes.bool,
  saveBtnClasses: PropTypes.string,
  handlePublishAction: PropTypes.func,
  isLite: PropTypes.bool,
  isLoadingSecondary: PropTypes.bool,
};

KtWrapper.defaultProps = {
  actionName: 'Save',
  isLoading: false,
  isDisabled: false,
  cancelUrl: '/',
  canFilter: false,
  handleAction: null,
  saveBtnClasses: 'green',
  handlePublishAction: null,
  isLite: false,
  isLoadingSecondary: false,
};

export default KtWrapper;
