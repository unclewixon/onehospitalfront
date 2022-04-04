import React from 'react';
import moment from 'moment';

import { formatPatientId, patientname } from '../../../services/utilities';

const ViewEncounter = ({ closeModal, encounter }) => {
	console.log('encanter details: ', encounter);
	return (
		<div
			className="onboarding-modal modal fade animated show row"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-lg modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Encounter Details</h4>
						<div className="row">
							<div className="col-md-4 col-sm-12">
								<table
									className="table table-striped"
									style={{
										tableLayout: 'fixed',
										borderCollapse: 'collapse',
									}}
								>
									<tbody>
										<tr>
											<td>
												<h6 className="font-weight-bold text-center">
													Patient Name:{' '}
												</h6>

												<h6 className="text-center">
													{patientname(encounter.patient)}
												</h6>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="col-md-4 col-sm-12">
								<table
									className="table table-striped text-center"
									style={{
										borderCollapse: 'collapse',
									}}
								>
									<tbody>
										<tr>
											<td>
												<h6 className="font-weight-bold text-center">
													Patient ID:
												</h6>
												<h6 className="text-center">
													{formatPatientId(encounter?.patient)}
												</h6>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="col-md-4 col-sm-12">
								<table
									className="table table-striped"
									style={{
										tableLayout: 'fixed',
										borderCollapse: 'collapse',
									}}
								>
									<tbody>
										<tr>
											<td>
												<h6 className="font-weight-bold text-center">
													Enrollment Date:
												</h6>
												<h6 className="text-center">
													{moment(encounter?.reatedAt).format(
														'DD-MM-YYYY H:mma'
													)}
												</h6>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<h6 className="font-weight-bold text-center">
								Patient Physical Examination
							</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Description</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										{encounter?.patient_physical_exams?.map((exam, i) => {
											return (
												<tr key={i}>
													<td>{exam.category}</td>
													<td>{exam.description}</td>
													<td>{exam.createdBy}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<h6 className="font-weight-bold text-center">
								Patient Review of System
							</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Description</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										{encounter?.review_of_systems?.map(labTest => {
											return (
												<tr key={labTest?.id}>
													<td>{labTest?.category}</td>

													<td>{labTest?.description}</td>

													<td>{labTest?.createdBy}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<br />
						<br />
						<br />

						<div className="row">
							<h6 className="font-weight-bold text-center">
								Patient Allergens
							</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>allergy</th>
											<th>Severity</th>
											<th>Reaction</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										{encounter?.patient_allergens?.map(labTest => {
											return (
												<tr key={labTest?.id}>
													<td>{labTest?.category}</td>

													<td>{labTest?.allergy}</td>
													<td>{labTest?.severity}</td>
													<td>{labTest?.reaction}</td>

													<td>{labTest?.createdBy}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<br />
						<br />
						<br />

						<div className="row">
							<h6 className="font-weight-bold text-center">
								Patient Consumable
							</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Quantity</th>
											<th>RequestNote</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										{encounter?.patient_consumables?.map(labTest => {
											return (
												<tr key={labTest?.id}>
													<td>{labTest?.quantity}</td>

													<td>{labTest?.requestNote}</td>

													<td>{labTest?.createdBy}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<br />
						<br />
						<br />

						<div className="row">
							<h6 className="font-weight-bold text-center">
								Patient Diagnoses
							</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Status</th>
											<th>Type</th>
											<th>Comment</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										{encounter?.patient_diagnoses?.map(labTest => {
											return (
												<tr key={labTest?.id}>
													<td>{labTest?.status}</td>

													<td>{labTest?.type}</td>
													<td
														style={{
															whiteSpace: 'pre-wrap',
															overflowWrap: 'break-word',
														}}
													>
														{labTest?.Comment}
													</td>

													<td>{labTest?.createdBy}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<h6 className="font-weight-bold text-center">Complaints</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Specialty</th>
											<th>Description</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{encounter?.complaints?.category}</td>

											<td>{encounter?.complaints?.specialty}</td>
											<td
												style={{
													whiteSpace: 'pre-wrap',
													overflowWrap: 'break-word',
												}}
											>
												<div
													dangerouslySetInnerHTML={{
														__html: encounter?.complaints?.description,
													}}
												/>
											</td>

											<td>{encounter?.complaints?.createdBy}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<h6 className="font-weight-bold text-center">Instruction</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Specialty</th>
											<th>Description</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{encounter?.instruction?.category}</td>

											<td>{encounter?.instruction?.specialty}</td>
											<td
												style={{
													whiteSpace: 'pre-wrap',
													overflowWrap: 'break-word',
												}}
											>
												<div
													dangerouslySetInnerHTML={{
														__html: encounter?.instruction?.description,
													}}
												/>
											</td>

											<td>{encounter?.instruction?.createdBy}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<h6 className="font-weight-bold text-center">Treatment Plan</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Specialty</th>
											<th>Description</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{encounter?.treatment_plan?.category}</td>

											<td>{encounter?.treatment_plan?.specialty}</td>
											<td
												style={{
													whiteSpace: 'pre-wrap',
													overflowWrap: 'break-word',
												}}
											>
												<div
													dangerouslySetInnerHTML={{
														__html: encounter?.treatment_plan?.description,
													}}
												/>
											</td>

											<td>{encounter?.treatment_plan?.createdBy}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<h6 className="font-weight-bold text-center">Patient History</h6>
							<div className="col-md-12">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Category</th>
											<th>Description</th>
											<th>Created By</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{encounter?.patient_history?.category}</td>

											<td
												style={{
													whiteSpace: 'pre-wrap',
													overflowWrap: 'break-word',
												}}
											>
												<div
													dangerouslySetInnerHTML={{
														__html: encounter?.patient_history?.description,
													}}
												/>
											</td>

											<td>{encounter?.patient_history?.createdBy}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewEncounter;
