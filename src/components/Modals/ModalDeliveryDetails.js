import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import { formatPatientId } from '../../services/utilities';
import DOMPurify from 'dompurify';

export class ModalDeliveryDetail extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	cleanHTML = DOMPurify.sanitize(this.props.detail.comment, {
		USE_PROFILES: { html: true },
	});

	render() {
		const { labourDetail, detail } = this.props;

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
							onClick={() => this.props.closeModal()}>
							<span aria-hidden="true"> ×</span>
						</button>

						<div className="onboarding-content with-gradient">
							<div className="element-info">
								<div className="element-info-with-icon">
									<div className="element-info-text">
										<h5 className="element-inner-header">Delivery Details</h5>
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
															{formatPatientId(labourDetail?.patient_id)}
														</div>
													</td>
												</tr>
											</div>

											<h6 className="element-header text-left">Delivery</h6>
											<div className="row">
												<div className="col-md-6 col-sm-12">
													<table className="table w-100 table-clean table-sm">
														<tbody>
															<tr>
																<td className="font-weight-bold text-left">
																	Delivery Type
																</td>
																<td className="text-right">
																	{detail.deliveryType}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Is Mother Alive
																</td>
																<td className="text-right">
																	{detail.isMotherAlive ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Administered Oxytocin
																</td>
																<td className="text-right">
																	{detail.administeredOxytocin ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Placenta Complete
																</td>
																<td className="text-right">
																	{detail.placentaComplete ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Date Of Birth
																</td>
																<td className="text-right">
																	{detail.dateOfBirth}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Time Of Birth
																</td>
																<td className="text-right">
																	{detail.timeOfBirth}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Baby Cried
																</td>
																<td className="text-right">
																	{detail.babyCried ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Sex of Baby
																</td>
																<td className="text-right">
																	{detail.sexOfBaby}
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
																	APGAR Score
																</td>
																<td className="text-right">
																	{detail.apgarScore}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Weight
																</td>
																<td className="text-right">{detail.weight}</td>
															</tr>

															<tr>
																<td className="font-weight-bold text-left">
																	Administered VitaminK
																</td>
																<td className="text-right">
																	{detail.administeredVitaminK ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Negative RH
																</td>
																<td className="text-right">
																	{detail.negativeRH ? 'Yes' : 'No'}
																</td>
															</tr>

															<tr>
																<td className="font-weight-bold text-left">
																	Drugs Administered
																</td>
																<td className="text-right">
																	{detail.drugsAdministered ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Administered Drugs
																</td>
																<td className="text-right">
																	{detail.administeredDrugs ? 'Yes' : 'No'}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Transferred To
																</td>
																<td className="text-right">
																	{detail.transferredTo}
																</td>
															</tr>
															<tr>
																<td className="font-weight-bold text-left">
																	Comment
																</td>
																<td className="text-right">
																	<div
																		dangerouslySetInnerHTML={{
																			__html: this.cleanHTML,
																		}}
																	/>
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
		patient: state.user.patient,
		labourDetail: state.patient.labourDetail,
	};
};

export default connect(mapStateToProps, { closeModals })(ModalDeliveryDetail);
