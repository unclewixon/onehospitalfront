import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Invoice from './../Invoice/Invoice';
import Receipt from './../Invoice/Reciept';
import '../../assets/css/reciept.css';

const InvoiceModal = ({ showModal, onModalClick, activeRequest }) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			// size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			// dialogClassName="reciept"
			onHide={onModalClick}>
			<Modal.Header closeButton> </Modal.Header>
			<Modal.Body>
				<Invoice />
			</Modal.Body>
		</Modal>
	);
};
export default InvoiceModal;
