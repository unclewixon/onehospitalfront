import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { closeModals } from '../../actions/general';
// import PatientForm from '../PatientForm';
// import PatientNOKForm from '../PatientNOKForm';
import Observation from '../Nicu/Observation';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';

class ModalCreateFluidChat extends Component {
	render() {
		return (
			<Modal
				show={this.props.fluidModal}
				onHide={this.props.onModalFluidClick}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-title"
				// role="dialog"
				// style={{ display: 'block' }}
				className="onboarding-modal modal fade animated show">
				<Modal.Header
					onClick={this.props.closeModal}
					closeButton></Modal.Header>
				<Modal.Body className="modal-dialog modal-lg" role="document">
					<div className="modal-content text-center">
						<div className="modal-header faded smaller">
							<div className="modal-title">
								<span>Registrar:</span>
								<img
									alt=""
									className="avatar"
									src={require('../../assets/images/avatar1.jpg')}
								/>
								<span>Date: </span>
								<strong>{moment().format('ll')}Smart</strong>
							</div>
						</div>
						<Observation />
						{/* {this.props.currentStep === 1 ? (
						<PatientForm />
						) : (
              
							<PatientNOKForm />
						)} */}
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default ModalCreateFluidChat;
