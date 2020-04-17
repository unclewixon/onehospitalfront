import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import moment from 'moment';

class ModalAntenatalDetail extends Component {
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
			return (
				<div className="element-box">
					<h6 className="element-header text-left text-capitalize">
						{item[0].replace(/([A-Z])/g, ' $1')}
					</h6>

					<table className="table">
						<tbody>{this.loopObject(item[1])}</tbody>
					</table>
				</div>
			);
		});
	};
	render() {
		const { antenatal_id, antennatal } = this.props;
		const ant = antennatal.find(el => el.id === antenatal_id);
		const fathersInfo = JSON.parse(ant.fathersInfo);
		const previousPregnancy = JSON.parse(ant.previousPregnancy);

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
											Antenatal Enrolment Detail
										</h5>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-4">
									<div className="user-profile compact">
										<div
											className="up-head-w"
											style={{
												backgroundImage: require('../../assets/images/b3.jpeg'),
											}}>
											<div className="up-main-info">
												<h2
													className="up-header text-capitalize"
													style={{ color: '#334152' }}>
													{ant.surname} {ant.other_names}
												</h2>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-8">
									<div className="element-wrapper">
										<div className="element-box">
											<h6 className="element-header text-left">General</h6>
											<table className="table ">
												<tbody>
													<tr>
														<td className="font-weight-bold text-left">
															Enrolment Date
														</td>
														<td className="text-right">
															{moment(ant.createdAt).format('DD-MM-YYYY')}
														</td>
													</tr>

													<tr>
														<td className="font-weight-bold text-left">LMP</td>
														<td className="text-right">{ant.l_m_p}</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">EOD</td>
														<td className="text-right">{ant.e_o_d}</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Booking Period
														</td>
														<td className="text-right">{ant.bookingPeriod}</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															LMP SOURCE
														</td>
														<td className="text-right">{ant.lmpSource}</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Enrolment Package
														</td>
														<td className="text-right">
															{' '}
															{ant.enrollmentPackage}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold text-left">
															Required Care
														</td>
														<td className="text-right">
															{' '}
															{Array.isArray(ant.requiredCare)
																? ant.requiredCare.join(',')
																: ant.requiredCare}
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="element-box">
											<h6 className="element-header text-left">Father Info</h6>

											<table className="table">
												<tbody>{this.loopObject(fathersInfo)}</tbody>
											</table>
										</div>
										<div className="element-box">
											<h6 className="element-header text-left">
												Previous Pregnancy
											</h6>

											<table className="table">
												<tbody>{this.loopObject(previousPregnancy)}</tbody>
											</table>
										</div>

										{this.loopHistory(ant.obstericsHistory)}
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
		antenatal_id: state.general.antenatal_id,
	};
};

export default connect(mapStateToProps, { closeModals })(ModalAntenatalDetail);
