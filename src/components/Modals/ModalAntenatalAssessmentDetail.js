import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { closeModals } from '../../actions/general';

// const fields = [
// 	'createdAt',
// 	'heightOfFunds',
// 	'fetalHeartRate',
// 	'positionOfFetus',
// 	'fetalLie',
// 	'relationshipToBrim',
// 	'comment',
// 	'lab_request',
// 	'radiology_request',
// 	'pharmacy_request',
// 	'nextAppointment',
// ];

class ModalAntenatalAssessmentDetail extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	loopObject = obj => {
		return Object.entries(obj).map((item, i) => {
			return (
				<tr>
					<td className="font-weight-bold text-left text-capitalize">
						{!item[0].includes('_')
							? item[0].replace(/([A-Z])/g, ' $1')
							: item[0]
									.split('_')
									.join(' ')
									.replace(/([A-Z])/g, ' $1')}
					</td>
					<td className="text-right">{item[1] || '-'}</td>
				</tr>
			);
		});
	};

	loopHistory = obj => {
		return Object.entries(obj).map((item, i) => {
			let item0 = item[0].replace(/([A-Z])/g, ' $1');
			return (
				<div className="element-box">
					<h6 className="element-header text-left text-capitalize">
						{!item0.includes('_') ? item0 : item0.split('_').join('.')}
					</h6>

					<table className="table">
						<tbody>{this.loopObject(item[1])}</tbody>
					</table>
				</div>
			);
		});
	};

	render() {
		const { antenatal_visit, patient } = this.props;
		let ant = antenatal_visit;
		let next = JSON.parse(ant.nextAppointment).apointmentDate;
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span aria-hidden="true"> ×</span>
						</button>

						<div className="onboarding-content with-gradient">
							<div className="element-info">
								<div className="element-info-with-icon">
									<div className="element-info-text">
										<h5 className="element-inner-header">
											Antenatal Assessment Detail
										</h5>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<div className="user-profile compact">
										<div className="up-contents mb-3">
											<div className="m-b pt-3">
												<div className="element-wrapper">
													<div className="element-box-tp">
														<h6 className="element-header text-left">
															Patient
														</h6>
														<table className="table table-clean">
															<tbody>
																<tr>
																	<td>
																		<div className="text-left">
																			Patient Name
																		</div>
																	</td>
																	<td className="text-right text-capitalize">
																		<div className="value text-success">
																			{patient.surname +
																				' ' +
																				patient.other_names}
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div className="text-left">File Number</div>
																	</td>
																	<td className="text-right">
																		<div className="value text-success">
																			{patient.fileNumber}
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-sm-12">
									<div className="element-wrapper">
										<div className="element-box">
											<h6 className="element-header text-left">General</h6>
											<table className="table ">
												<tbody>
													<tr>
														<td className="font-weight-bold text-left">
															Assessment Date
														</td>
														<td className="text-right">
															{moment(ant.createdAt).format('DD-MM-YYYY')}
														</td>
													</tr>

													<tr>
														<td className="font-weight-bold text-left">
															Height of Funds
														</td>
														<td className="text-right">
															{ant.heightOfFunds ? ant.heightOfFunds : ''}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															FetalHeartRate
														</td>
														<td className="text-right">
															{ant.fetalHeartRate ? ant.fetalHeartRate : ''}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Position Of Fetus
														</td>
														<td className="text-right">
															{ant.positionOfFetus
																? ant.positionOfFetus
																: ' - '}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Fetal Lie
														</td>
														<td className="text-right">
															{ant.fetalLie ? ant.fetalLie : '-'}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Relationship to brim
														</td>
														<td className="text-right">
															{' '}
															{ant.relationshipToBrim
																? ant.relationshipToBrim
																: '-'}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Next Appointment Date
														</td>
														<td className="text-right">
															{moment(next).format('DD-MM-YYYY') +
																' ' +
																moment(next).format('HH:mm')}
														</td>
													</tr>
													{ant.radiologyRequest.requestBody.length !== 0 ? (
														<tr>
															<td className="font-weight-bold text-left">
																Radiology Request
															</td>
															<td className="text-right">
																{ant.radiologyRequest.requestBody
																	.map(el => el.specialization)
																	.join(',')}
															</td>
														</tr>
													) : null}
													{ant.labRequest.requestBody.tests.length !== 0 ? (
														<tr>
															<td className="font-weight-bold text-left">
																Lab tests request
															</td>
															<td className="text-right">
																{ant.labRequest.requestBody.tests
																	.map(el => el.specialization)
																	.join(',')}
															</td>
														</tr>
													) : null}
													{ant.labRequest.requestBody.groups.length !== 0 ? (
														<tr>
															<td className="font-weight-bold text-left">
																Lab groups request
															</td>
															<td className="text-right">
																{ant.labRequest.requestBody.groups
																	.map(el => el.specialization)
																	.join(',')}
															</td>
														</tr>
													) : null}
												</tbody>
											</table>
										</div>
									</div>
								</div>

								{ant.pharmacyRequest.requestBody.length !== 0 ? (
									<div className="col-md-12">
										<div className="element-wrapper">
											<div className="element-box">
												<h6 className="element-header text-left">
													Prescription
												</h6>

												<table className="table">
													<thead>
														<tr>
															<th className="text-center">Generic Name</th>
															<th className="text-center">Drug Name</th>
															<th className="text-center">Quantity</th>
															<th className="text-center">No of refill</th>
															<th className="text-center">Frequency</th>
															<th className="text-center">Duration</th>
															<th className="text-center">EG</th>
															<th className="text-center">Note</th>
														</tr>
													</thead>
													<tbody>
														{ant.pharmacyRequest.requestBody ? (
															ant.pharmacyRequest.requestBody.map(
																(request, index) => {
																	return (
																		<tr key={index}>
																			<td className="text-center">
																				{request.genericName
																					? request.genericName
																					: ''}
																			</td>
																			<td className="text-center">
																				{request.drugName
																					? request.drugName
																					: '-'}
																			</td>
																			<td className="text-center">
																				{' '}
																				{request.quantity
																					? request.quantity
																					: '-'}
																			</td>
																			<td className="text-center">
																				{' '}
																				{request.refills
																					? request.refills
																					: '-'}
																			</td>
																			<td className="text-center">
																				{' '}
																				{request.frequency
																					? request.frequency
																					: '-'}
																			</td>
																			<td className="text-center">
																				{' '}
																				{request.eg ? request.eg : '-'}
																			</td>
																			<td className="text-center">
																				{' '}
																				{request.duration
																					? request.duration
																					: '-'}
																			</td>
																			<td className="text-left">
																				{' '}
																				{request.refillNote
																					? request.refillNote
																					: '-'}
																			</td>
																		</tr>
																	);
																}
															)
														) : (
															<tr>
																{' '}
																<td colSpan="8">No prescription</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		antenatal_visit: state.general.antenatal_visit,
		patient: state.user.patient,
	};
};

export default connect(mapStateToProps, { closeModals })(
	ModalAntenatalAssessmentDetail
);
