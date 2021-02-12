import React from 'react';
import Modal from 'react-bootstrap/Modal';

const PayslipModal = ({ showModal, onModalClick, patient, activeRequest }) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body></Modal.Body>
		</Modal>
	);
};
export default PayslipModal;
