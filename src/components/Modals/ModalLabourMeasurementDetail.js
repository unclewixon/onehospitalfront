import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import { formatPatientId } from '../../services/utilities';

class ModalLabourMeasurementDetail extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	calculateAmount = arr => {
		return arr.reduce((total, item) => total + parseFloat(item.price || 0), 0);
	};

	render() {
		const { labourDetail, labour } = this.props;

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
											Labour Measurement Detail
										</h5>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<div className="element-wrapper pb-0">
										<div className="element-bo mb-0">
											<h6 className="element-header text-left">Patient</h6>
											<div className="table table-clean table-sm mb-4">
												<tr>
													<td>
														<div className="text-left">Patient Name: </div>
													</td>
													<td className="text-left text-capitalize">
														<div className="value ml-1 text-success">
															{labourDetail.patient_name}
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className="text-left">Patient ID: </div>
													</td>
													<td className="text-left">
														<div className="value ml-1 text-success">
															{formatPatientId(labourDetail?.patient)}
														</div>
													</td>
												</tr>
											</div>

											<h6 className="element-header text-left">Measurement</h6>
											<div className="row">
												<div className="col-md-6 col-sm-12">
													<table className="table w-100 table-clean table-sm">
														<tbody>
															<tr>
																<td className="font-weight-bold text-left">
																	Date of Measurement
																</td>
																<td className="text-right">
																	{labour.dateOfMeasurement}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Time of Measurement
																</td>
																<td className="text-right">
																	{labour.timeOfMeasurement}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	False Labour
																</td>
																<td className="text-right">
																	{!labour.isFalseLabour ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Presentation
																</td>
																<td className="text-right">
																	{labour.presentation
																		? labour.presentation
																		: ''}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Position Of Fetus
																</td>
																<td className="text-right">
																	{labour.positionOfFetus
																		? labour.positionOfFetus
																		: ' - '}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Fetal Lies
																</td>
																<td className="text-right">
																	{labour.fetalLies ? labour.fetalLies : '-'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Descent
																</td>
																<td className="text-right">
																	{' '}
																	{labour.descent ? labour.descent : '-'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Cervical Length
																</td>
																<td className="text-right">
																	{labour.cervicalLength
																		? labour.cervicalLength
																		: '-'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Cervical Length
																</td>
																<td className="text-right">
																	{labour.cervicalLength
																		? labour.cervicalLength
																		: '-'}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
												<div className="col-md-6 col-sm-12">
													<table className="table w-100 table-clean table-sm">
														<tbody>
															<tr>
																<td className="font-weight-bold text-left">
																	Cervical Effacement
																</td>
																<td className="text-right">
																	{labour.cervicalEffacement
																		? labour.cervicalEffacement
																		: '-'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Cervical Position
																</td>
																<td className="text-right">
																	{labour.cervicalPosition
																		? labour.cervicalPosition
																		: '-'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Membrances
																</td>
																<td className="text-right">
																	{labour.membrances ? labour.membrances : '-'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Passed Urine
																</td>
																<td className="text-right">
																	{!labour.hasPassedUrine ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Administered Cyatacin
																</td>
																<td className="text-right">
																	{labour.administeredCyatacin ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Administered Drugs
																</td>
																<td className="text-right">
																	{labour.administeredDrugs ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Lab Tests
																</td>
																<td className="text-right">
																	Total Lab tests amount:{' '}
																	{this.calculateAmount(labour?.labTests)}
																	<br />
																	<div className="table-responsive">
																		<table className="table table-striped">
																			<thead>
																				<tr>
																					<th>Name</th>
																					<th colSpan="3">Price</th>
																					<th>Test Type</th>
																				</tr>
																			</thead>
																			<tbody>
																				{labour?.labTests?.map(lbt => {
																					return (
																						<tr>
																							<td>{lbt?.name}</td>

																							<td
																								className="text-right"
																								colSpan="3">
																								{lbt?.price}
																							</td>

																							<td className="text-right">
																								{lbt?.test_type}
																							</td>
																						</tr>
																					);
																				})}
																			</tbody>
																		</table>
																	</div>
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Measurements
																</td>
																<td className="text-right">
																	{labour.measurements &&
																	labour.measurements.length > 0
																		? labour.measurements.join(',')
																		: '-'}
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		labour: state.general.labourMeasurementDetail,
		patient: state.user.patient,
		labourDetail: state.patient.labourDetail,
	};
};

export default connect(mapStateToProps, { closeModals })(
	ModalLabourMeasurementDetail
);
