import React from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const ModalClinicalLab = ({
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
				<Modal.Title id="contained-modal-title-vcenter">
					Enter Lab Result
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div
					style={{
						border: '1px solid black',
						padding: '30px',
					}}>
					<div className="row">
						<div className="col-sm-6">
							<p>
								<span>Patient Name: </span>
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								<span>Patient ID: </span>
								{activeRequest.patient.fileNumber}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<p>
								<span>Specimen: </span>
								{activeRequest.referredSpeciment}
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								<span>Request Date: </span>
								{moment(activeRequest.createdAt).format('DD/MM/YYYY hh:mm')}
							</p>
						</div>
					</div>
				</div>
				<div
					style={{
						border: '1px solid black',
						padding: '30px',
						margin: '30px 0px 0px 0px',
					}}>
					<div>
						<div>
							<h6>GROUPS</h6>
						</div>
						<div
							style={{
								marginLeft: '30px',
							}}>
							<p>Group Name: </p>
						</div>
						<div
							style={{
								marginLeft: '60px',
							}}>
							<p>Test Name</p>
						</div>
						<div
							style={{
								marginLeft: '90px',
							}}>
							<Table className="table bordered">
								<thead>
									<tr>
										<th>Param Name</th>
										<th>Range</th>
										<th>Result</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</Table>
							<div>
								<p>Parameter</p>
							</div>
							<div>
								<Table className="table bordered">
									<thead>
										<tr>
											<th>Param Name</th>
											<th>Range</th>
											<th>Result</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
								</Table>
							</div>
						</div>
					</div>
					<div>
						<div>
							<h6>TESTS</h6>
						</div>
						<div
							style={{
								marginLeft: '30px',
							}}>
							<p>Test Name</p>
						</div>
						<div
							style={{
								marginLeft: '60px',
							}}>
							<Table className="table bordered">
								<thead>
									<tr>
										<th>Param Name</th>
										<th>Range</th>
										<th>Result</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</Table>
							<div>
								<p>Parameter</p>
							</div>
							<div>
								<Table className="table bordered">
									<thead>
										<tr>
											<th>Param Name</th>
											<th>Range</th>
											<th>Result</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
								</Table>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalClinicalLab;
