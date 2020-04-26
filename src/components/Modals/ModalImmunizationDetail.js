import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

const fields = [
	'typeOfVaccine',
	'dateOfAdministration',
	'vaccineBatchNo',
	'nextVisitDate',
	'administeredbyname',
];
export class ModalImmunizationDetail extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	detailBody = immunize => {
		return fields.map((el, i) => {
			return (
				<tr>
					<td className="font-weight-bold text-left text-uppercase">
						{el === 'administeredbyname'
							? 'administered by name'.toUpperCase()
							: el.replace(/([A-Z])/g, ' $1')}
					</td>
					<td className="text-right text-capitalize">{immunize[el]}</td>
				</tr>
			);
		});
	};

	render() {
		const immunize = this.props.immunization;
		// const immunize = immunization.find(el => el.id === immunization_id);
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
							<div className="element-info mb-3">
								<div className="element-info-with-icon">
									<div className="element-info-text">
										<h5 className="element-inner-header">
											Immunization Enrolment Detail
										</h5>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<div className="user-profile compact">
										{/* <div
											className="up-head-w"
											style={{
												backgroundImage: require('../../assets/images/b3.jpeg'),
											}}>
											<div className="up-main-info" style={{ padding: '1em' }}>
												<h2 className="up-header text-capitalize">
													{immunize.patient_name}
												</h2>
											</div>
										</div> */}
										<div className="up-contents">
											<div className="m-b">
												<div className="element-box-tp">
													<table className="table table-clean">
														<tbody>
															<tr>
																<td>
																	<div className="text-left">Patient Name</div>
																</td>
																<td className="text-right text-capitalize">
																	<div className="value text-success">
																		{immunize.patient_name}
																	</div>
																</td>
															</tr>
															<tr>
																<td>
																	<div className="text-left">File Number</div>
																</td>
																<td className="text-right">
																	<div className="value text-success">
																		{immunize.fileNumber}
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
								<div className="col-sm-12">
									<div className="element-wrapper">
										<div className="element-box">
											<table className="table table-clean">
												<tbody>{this.detailBody(immunize)}</tbody>
											</table>
										</div>
									</div>
								</div>
								<div className="col-md-12">
									<div className="element-wrapper">
										<div className="element-box">
											<h6 className="element-header text-left">Prescription</h6>

											<table className="table">
												<thead>
													<tr>
														<th className="text-center">S/N</th>
														<th className="text-center">Generic Name</th>
														<th className="text-center">Drug Name</th>
														<th className="text-center">Quantity</th>
														<th className="text-center">No of refill</th>
														<th className="text-center">Frequency</th>
														<th className="text-center">Duration</th>
														<th className="text-center">Note</th>
													</tr>
												</thead>
												<tbody>
													{Array.isArray(immunize.prescription) ? (
														immunize.prescription.map((request, index) => {
															return (
																<tr key={index}>
																	<td className="text-center">{index + 1}</td>
																	<td className="text-center">
																		{request.genericName}
																	</td>
																	<td className="text-center">
																		{request.drugName}
																	</td>
																	<td className="text-center">
																		{' '}
																		{request.quantity}
																	</td>
																	<td className="text-center">
																		{' '}
																		{request.refills ? request.refills : '-'}
																	</td>
																	<td className="text-center">
																		{' '}
																		{request.frequency
																			? request.frequency
																			: '-'}
																	</td>
																	<td className="text-center">
																		{' '}
																		{request.duration ? request.duration : '-'}
																	</td>
																	<td className="text-left">
																		{' '}
																		{request.refillNote
																			? request.refillNote
																			: '-'}
																	</td>
																</tr>
															);
														})
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
		// immunization: state.patient.immunization,
		immunization: state.general.immunization,
	};
};

export default connect(mapStateToProps, { closeModals })(
	ModalImmunizationDetail
);
