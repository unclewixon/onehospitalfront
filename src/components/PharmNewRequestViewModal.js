import React from 'react';
import Modal from 'react-bootstrap/Modal';

const PharmNewRequestViewModal = ({
	showModal,
	onModalClick,
	patient,
	activeRequest,
}) => {
	return (
		<Modal
			show={showModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton>
				{patient ? (
					<Modal.Title id="contained-modal-title-vcenter">
						{`${patient && patient.surname.toUpperCase()} ${patient &&
							patient.other_names.toUpperCase()}`}
					</Modal.Title>
				) : null}
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="form-group col-lg-6">
						<h4 className="primary">Service Unit</h4>
						<div>
							<p className="justify">{activeRequest.serviceUnit}</p>
						</div>
						<h5>Formulary</h5>
						<div>
							<p className="justify">{activeRequest.formulary}</p>
						</div>
						<h5>Drug Generic Name</h5>
						<div>
							<p className="justify">{activeRequest.genericName}</p>
						</div>
						<h5>Drug Name</h5>
						<div>
							<p className="justify">{activeRequest.drugName}</p>
						</div>
						<h5>Dose Quantity</h5>
						<div>
							<p className="justify">{activeRequest.quantity}</p>
						</div>
					</div>
					<div className="col-lg-6">
						<h4 className="primary">Number of refills</h4>
						<div>
							<p className="justify">{activeRequest.refills}</p>
						</div>
						<h5>E.g. 3</h5>
						<div>
							<p className="justify">{activeRequest.eg}</p>
						</div>
						<h5>Frequency type</h5>
						<div>
							<p className="justify">{activeRequest.frequency}</p>
						</div>
						<h5>Duration</h5>
						<div>
							<p className="justify">{activeRequest.duration}</p>
						</div>
						<h5>Note</h5>
						<div>
							<p className="justify">{activeRequest.refillNote}</p>
						</div>
						<h5>ICDIO Code</h5>
						<div>
							<p className="justify">{activeRequest.icdioCode}</p>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default PharmNewRequestViewModal;
