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
				<div className="p-4 bg-light border-2">
					<div className="row">
						<div className="col-sm-6">
							<p>
								<span>Patient Name: </span>
								{activeRequest.patient_name ? activeRequest.patient_name : ''}
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								<span>Patient ID: </span>
								{'No yet available'}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<p>
								<span>Specimen: </span>
								{activeRequest.requestBody.refferredSpecimen}
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
				<div className="mt-4 p-4 bg-light border-2">
					<div>
						<h6>GROUPS</h6>
					</div>
					{activeRequest &&
						activeRequest.requestBody &&
						activeRequest.requestBody.group &&
						activeRequest.requestBody.group.map(grp => (
							<div>
								<div className="ml-4">
									<p>Group Name: </p>
								</div>
								{grp.tests &&
									grp.tests.map(test => (
										<div className="ml-2 p-4 bg-white border-2">
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
											<div />
											))
										</div>
									))}

								{grp.parameters &&
									grp.parameters.map(parameter => (
										<div className="ml-2 p-4 bg-white border-2">
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
									))}
							</div>
						))}
				</div>

				<div className="mt-4 p-4 bg-light border-2">
					<div>
						<h6>TESTS</h6>
					</div>
					{activeRequest &&
						activeRequest.requestBody &&
						activeRequest.requestBody.test &&
						activeRequest.requestBody.test.map(tst => (
							<div>
								<div className="ml-4">
									<p>Test Name: </p>
								</div>
								{tst.parameters &&
									tst.parameters.map(parameter => (
										<div className="ml-2 p-4 bg-white border-2">
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
									))}
							</div>
						))}
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalClinicalLab;
