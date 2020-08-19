import React from 'react';
import Modal from 'react-bootstrap/Modal';
// import moment from 'moment';
// import { Table } from 'react-bootstrap';
// import waiting from '../../assets/images/waiting.gif';
// import { request } from '../../services/utilities';
// import { notifySuccess, notifyError } from './../../services/notify';
// import '../../assets/profile.css'

const PayslipModal = ({ showModal, onModalClick, patient, activeRequest }) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			// size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body></Modal.Body>
		</Modal>
	);
};
export default PayslipModal;
