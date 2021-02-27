/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loadAntennatal } from '../../actions/patient';
import { viewAntenatalDetail } from '../../actions/general';
import { formatPatientId } from '../../services/utilities';

class IVFDetails extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		status: '',
	};

	componentDidMount() {}

	calculateAmount = arr => {
		let sum = 0;
		arr &&
			arr.forEach(val => {
				let amt = val.price;
				if (amt === undefined) {
					amt = 0;
				}
				try {
					sum += parseInt(amt);
				} catch (e) {
					sum += 0;
				}
			});
		return sum;
	};

	render() {
		const { location, ivfDetails } = this.props;
		console.log(ivfDetails);
		const page = location.pathname.split('/').pop();
		return (
			<div className="col-sm-12">
				<br />
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								page === '' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf">
							Dashboard
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'reg-chart' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/reg-chart">
							Down Regulation Chart
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'hcg-admin' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/hcg-admin">
							HCG Administration
						</Link>
						<Link
							className={`btn btn-primary ${
								page === 'reg' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/reg">
							PatientTreatMentSheet
						</Link>
					</div>
					<h6 className="element-header">IVF Details</h6>
					<div className="row">
						<div className="col-md-12">
							<div className="element-box">
								<h6 className="element-header text-left">Treatment Details</h6>
								<div className="row">
									<div className="col-md-3 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Patient Name:{' '}
													</td>

													<td className="text-right">
														{ivfDetails?.wife?.other_names}{' '}
														{ivfDetails?.wife?.surname}
													</td>
												</tr>
												<tr>
													<td className="font-weight-bold text-left">
														Patient ID:
													</td>
													<td className="text-right">
														{formatPatientId(ivfDetails?.wife?.id)}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Other Comments:
													</td>
													<td className="text-right">
														{ivfDetails?.otherComments}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Pregnancy Test Date:
													</td>
													<td className="text-right">
														{moment(ivfDetails?.pregnancyTestDate).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Meducation Used:
													</td>
													<td className="text-right">
														{ivfDetails?.meducationUsed}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														indication:
													</td>
													<td className="text-right">
														{ivfDetails?.indication}
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="col-md-1 col-sm-12"></div>

									<div className="col-md-3 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Treatment Plan:
													</td>
													<td className="text-right">
														{ivfDetails?.treatmentPlan}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Prognosis:
													</td>
													<td className="text-right">
														{ivfDetails?.prognosis}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Result:
													</td>
													<td className="text-right">{ivfDetails?.result}</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														No Of Embryo Transfer:
													</td>
													<td className="text-right">
														{ivfDetails?.noOfEmbryoTransfer}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														No Of Oocyte Retrieved:
													</td>
													<td className="text-right">
														{ivfDetails?.noOfOocyteRetrieved}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Assessment Comments:
													</td>
													<td className="text-right">
														{ivfDetails?.assessmentComments}
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="col-md-1 col-sm-12"></div>

									<div className="col-md-3 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Endometric Thickness:
													</td>
													<td className="text-right">
														{ivfDetails?.endometricThickness}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Treatment Date:
													</td>
													<td className="text-right">
														{moment(ivfDetails?.dateOfTreatment).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Transfer Date:
													</td>
													<td className="text-right">
														{moment(ivfDetails?.embryoTransferDate).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Commencement Date:
													</td>
													<td className="text-right">
														{moment(ivfDetails?.dateOfCommencement).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Stimulation Date:
													</td>
													<td className="text-right">
														{moment(ivfDetails?.dateOfStimulation).format(
															'DD-MM-YYYY H:mma'
														)}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<h6 className="element-header text-left">
									IVF Lab Tests Requested
								</h6>
								<div className="row">
									<div className="col-md-12 col-sm-12">
										Total Lab tests amount:{' '}
										{this.calculateAmount(ivfDetails?.labTests)}
									</div>
									<div className="col-md-6 col-sm-12">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Name</th>
													<th>Price</th>
													<th>Test Type</th>
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												{ivfDetails?.labTests?.map(lbt => {
													return (
														<tr>
															<td>{lbt?.name}</td>

															<td>{lbt?.price}</td>

															<td>{lbt?.test_type}</td>

															<td>{lbt?.description}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>

								<br />
								<br />

								<h6 className="element-header text-left">
									Wife's Labs Details
								</h6>
								<div className="row">
									<div className="col-md-4 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Blood Group
													</td>
													<td className="text-right">
														{ivfDetails?.wifeLabDetails?.bloodGroup}
													</td>
												</tr>
												<tr>
													<td className="font-weight-bold text-left">
														Chlamyda
													</td>
													<td className="text-right">
														{ivfDetails?.wifeLabDetails?.chlamyda}
													</td>
												</tr>
												<tr>
													<td className="font-weight-bold text-left">
														Genotype
													</td>
													<td className="text-right">
														{ivfDetails?.wifeLabDetails?.genotype}
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="col-md-1 col-sm-12"></div>

									<div className="col-md-6 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Hormonals
													</td>
													<td className="text-right">
														<table className="table table-striped">
															<thead>
																<tr>
																	<th>LH</th>
																	<th>AMH</th>
																	<th>FSH</th>
																	<th>PROL</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		{ivfDetails?.wifeLabDetails?.hormonals?.lh}
																	</td>

																	<td>
																		{ivfDetails?.wifeLabDetails?.hormonals?.amh}
																	</td>

																	<td>
																		{ivfDetails?.wifeLabDetails?.hormonals?.fsh}
																	</td>

																	<td>
																		{
																			ivfDetails?.wifeLabDetails?.hormonals
																				?.prol
																		}
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Serology
													</td>
													<td className="text-right">
														<table className="table table-striped">
															<thead>
																<tr>
																	<th>HIV</th>
																	<th>HEPB</th>
																	<th>HEPC</th>
																	<th>VDRL</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		{ivfDetails?.wifeLabDetails?.serology?.hiv}
																	</td>

																	<td>
																		{ivfDetails?.wifeLabDetails?.serology?.hepb}
																	</td>

																	<td>
																		{ivfDetails?.wifeLabDetails?.serology?.hepc}
																	</td>

																	<td>
																		{ivfDetails?.wifeLabDetails?.serology?.vdrl}
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<br />
								<br />
								<h6 className="element-header text-left">
									Husband's Labs Details
								</h6>
								<div className="row">
									<div className="col-md-4 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Blood Group
													</td>
													<td className="text-right">
														{ivfDetails?.husbandLabDetails?.bloodGroup}
													</td>
												</tr>
												<tr>
													<td className="font-weight-bold text-left">
														Fasting Blood Sugar
													</td>
													<td className="text-right">
														{ivfDetails?.husbandLabDetails?.fastingBloodSugar}
													</td>
												</tr>
												<tr>
													<td className="font-weight-bold text-left">
														Genotype
													</td>
													<td className="text-right">
														{ivfDetails?.husbandLabDetails?.genotype}
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Random Blood Sugar
													</td>
													<td className="text-right">
														{ivfDetails?.husbandLabDetails?.randomBloodSugar}
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="col-md-1 col-sm-12"></div>

									<div className="col-md-6 col-sm-12">
										<table className="table table-striped">
											<tbody>
												<tr>
													<td className="font-weight-bold text-left">
														Hormonals
													</td>
													<td className="text-right">
														<table className="table table-striped">
															<thead>
																<tr>
																	<th>LH</th>
																	<th>PROL</th>
																	<th>FSH</th>
																	<th>Testosterone</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.hormonals
																				?.lh
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.hormonals
																				?.prol
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.hormonals
																				?.fsh
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.hormonals
																				?.testosterone
																		}
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														Serology
													</td>
													<td className="text-right">
														<table className="table table-striped">
															<thead>
																<tr>
																	<th>HIV</th>
																	<th>HEPB</th>
																	<th>HEPC</th>
																	<th>VDRL</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.serology
																				?.hiv
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.serology
																				?.hepb
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.serology
																				?.hepc
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails?.serology
																				?.vdrl
																		}
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>

												<tr>
													<td className="font-weight-bold text-left">
														SFA Andrology
													</td>
													<td className="text-right">
														<table className="table table-striped">
															<thead>
																<tr>
																	<th>COUNT</th>
																	<th>MORPHILITY</th>
																	<th>MORTILITY</th>
																	<th> SUMMARY</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		{
																			ivfDetails?.husbandLabDetails
																				?.sfaAndrology?.count
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails
																				?.sfaAndrology?.morphility
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails
																				?.sfaAndrology?.mortility
																		}
																	</td>

																	<td>
																		{
																			ivfDetails?.husbandLabDetails
																				?.sfaAndrology?.summary
																		}
																	</td>
																</tr>
															</tbody>
														</table>
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
		);
	}
}

const mapStateToProps = state => {
	return {
		antennatal: state.patient.antennatal,
		ivfDetails: state.patient.ivfDetails,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadAntennatal, viewAntenatalDetail })(IVFDetails)
);
