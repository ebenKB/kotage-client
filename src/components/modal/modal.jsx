/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import Divider from '../kt-divider/divider';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';
import './modal.scss';


const Modal = ({
  heading, children, confirmActionText, handleConfirmAction, handleDeclineAction, type,
}) => {
  const [canShowModal, setCanShowModal] = useState(true);
  const closeModal = () => {
    setCanShowModal(false);
    handleDeclineAction();
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
			</div>
			<Divider type="faint" classes="" />
			<div className="modal-footer ">
				<Button
					content={confirmActionText}
					color={getColor()}
					size="small"
					onClick={handleConfirmAction}
				/>
				<span className="m-l-5 m-r-5">or</span>
				<Button
					content="Cancel"
					size="small"
					default
					onClick={closeModal}
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
  handleDeclineAction: PropTypes.func.isRequired,
};
export default Modal;
