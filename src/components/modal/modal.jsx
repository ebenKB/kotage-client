/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import Divider from '../kt-divider/divider';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';
import './modal.scss';


const Modal = ({
  heading, children, confirmActionText, handleConfirmAction, type,
}) => {
  const [canShowModal, setCanShowModal] = useState(true);
  const closeModal = () => {
    setCanShowModal(false);
  };

  const getColor = () => {
    if (type.toLowerCase() === 'success') {
      return 'green';
    }

    if (type.toLowerCase() === 'primary') {
      return 'primary';
    }

    return 'default';
  };
  return (
	<div className={`${!canShowModal && 'hide'}`}>
		<div className="modal-wrapper xsm-caption" />
		<div className="modal kt-bg-shadow">
			<div className="modal-title flex-inline">
				<div className="bold">{heading}</div>
				<Button
					className="kt-transparent"
					onClick={closeModal}
				>
					<CloseIcon className="small logo" />
				</Button>
			</div>
			<Divider type="faint" classes="" />
			<div className="modal-body">
				{children}
				{/* <p>Did you remember to:</p>
				<ol>
					<li>Change the title?</li>
					<li>Update the scope of the work?</li>
					<li>Thank your boss for letting you use Kotage?</li>
				</ol> */}
			</div>
			<Divider type="faint" classes="" />
			<div className="text-right modal-footer ">
				<Button content="Cancel" size="small" default />
				<Button
					content={confirmActionText}
					color={getColor()}
					size="small"
					onClick={handleConfirmAction}
				/>
			</div>
		</div>
	</div>
  );
};

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  confirmActionText: PropTypes.string.isRequired,
  handleConfirmAction: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
};
export default Modal;

// 0552222004
