import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import moment from 'moment';
export class ModalLabourMeasurementDetail extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}
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
									<div className="user-profile compact">
										<div className="up-contents mb-3">
											<div className="m-b pt-1">
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
																			{labourDetail.patient_name}
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div className="text-left">File Number</div>
																	</td>
																	<td className="text-right">
																		<div className="value text-success">
																			{labourDetail.fileNumber}
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
											<h6 className="element-header text-left">Measurement</h6>
											<table className="table ">
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
															{labour.presentation ? labour.presentation : ''}
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
															Passed Urine"
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
															{labour.labTests && labour.labTests.length > 0
																? labour.labTests.join(',')
																: '-'}
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
