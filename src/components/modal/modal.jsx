import React from 'react';
import Divider from '../kt-divider/divider';
import './modal.scss';

const Modal = () => (
	<div>
		<div className="modal-wrapper" />
		<div className="modal kt-bg-shadow">
			<div className="modal-title">
        Title of modal
				<Divider type="faint" classes="m-t-10 m-b-10" />
			</div>
			<div>This is the body of the modal</div>
			<div>This is the footer of the modal</div>
		</div>
	</div>
);

export default Modal;

// 0552222004
