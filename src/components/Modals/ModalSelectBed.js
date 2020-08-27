import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PatientPlaceholder from '../../assets/images/placeholder.jpg';

const ModalSelectBed = ({ showModal, onModalClick }) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col-sm-4 col-md-2">
						<img
							alt=""
							src={PatientPlaceholder}
							style={{ width: '100%', height: '100%' }}
						/>
					</div>
					<div className="col-sm-8">
						<h4 className="onboarding-title">FULLNAME</h4>
						<div className="onboarding-text">WARD</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<p className="text-left">DEDA-000111222</p>
					</div>
					<div className="col-sm-6">
						<p className="text-right">Date Admitted</p>
					</div>
				</div>
				{/* <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        </div> */}
				<div className="modal-body">
					<form>
						<div className="form-group">
							<label htmlFor>Ward</label>
							<select
								className="form-control"
								placeholder="Enter email"
								type="email">
								<option></option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor>Bed Label Name</label>
							<select
								className="form-control"
								placeholder="Enter email"
								type="email">
								<option></option>
							</select>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button
						className="btn btn-secondary"
						data-dismiss="modal"
						type="button">
						Close
					</button>
					<button className="btn btn-primary" type="button">
						Assign Bed
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalSelectBed;
