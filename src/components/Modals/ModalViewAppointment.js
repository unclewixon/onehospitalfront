/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import patientProfilePic from '../../assets/images/patientprofile.jpg';

import { closeModals } from '../../actions/general';

class ModalViewAppointment extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { view_appointment_detail } = this.props;
		return (
			<div
				className="modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								<div className="element-inner-header pl-md-3">
									Appointment Detail
									{/* appointment_date
														department.name
														consultingRoom.name
														specialization.name
														department.staff.first_name */}
								</div>
							</h5>
							<button
								aria-label="Close"
								className="close"
								type="button"
								onClick={() => this.props.closeModals(false)}>
								<span aria-hidden="true"> ×</span>
							</button>
						</div>
						<div class="modal-body">
							<div className="modal-body pb-0">
								<div class="d-flex">
									<div class="post-media">
										<div class="pt-avatar-w">
											<img
												alt=""
												style={{
													display: 'inlineBlock',
													verticalAlign: 'middle',
													width: '100px',
													height: '100px',
													borderRadius: '50%',
												}}
												src={patientProfilePic}
											/>
										</div>
									</div>
									<div class="post-content w-100">
										<div class="profile-tile pb-0">
											<div class="profile-tile-meta">
												<h6 class="post-title">
													{view_appointment_detail?.patient?.surname}{' '}
													{view_appointment_detail?.patient?.other_names}
												</h6>
												<div className="row p-sm-2  flex-nowrap">
													<ul className="col-md-6">
														<li>
															File Number:{' '}
															<strong>
																{view_appointment_detail?.patient?.fileNumber}
															</strong>
														</li>
														<li>
															Appointment Date:{' '}
															<strong>
																{view_appointment_detail?.appointment_date}
															</strong>
														</li>
														<li>
															Department:{' '}
															<strong>
																<a href="apps_support_index.html">
																	{view_appointment_detail?.department?.name}
																</a>
															</strong>
														</li>
													</ul>
													<ul className="col-md-6 ml-2">
														{/* <li>
															Whom To See:{' '}
															<strong>
																{view_appointment_detail?.whomToSee}
															</strong>
														</li> */}
														<li>
															Consulting Room:{' '}
															<strong>
																{view_appointment_detail?.consultingRoom?.name}
															</strong>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div class="post-foot"></div>
									</div>
								</div>
								{/*<div className="row">
									<div className="col-sm-12">
										<div className="element-wrapper">
											<div className="element-info">
												<div className="element-info-with-icon">
													<div className="element-info-icon">
														<div className="os-icon os-icon-wallet-loaded"></div>
													</div>
													<div className="element-info-text">
														<h5 className="element-inner-header">
															Appointment Detail
														</h5>
														appointment_date
														department.name
														consultingRoom.name
														specialization.name
														department.staff.first_name
													</div>
												</div>
											</div>
											<div class="profile-tile profile-tile-inlined">
												<div class="pt-avatar-w">
													<img alt="" src={patientProfilePic} />
												</div>
											</div>
											<div className="value text-success">
												{view_appointment_detail?.patient?.fileNumber}
											</div>
											<table className="table table-padded">
												<tbody>
													<tr>
														<td className="font-weight-bold">
															Appointment Date
														</td>
														<td>{view_appointment_detail?.appointment_date}</td>
													</tr>

													<tr>
														<td className="font-weight-bold">Department</td>
														<td>{view_appointment_detail?.department?.name}</td>
													</tr>
													<tr>
														<td className="font-weight-bold">Specialization</td>
														<td>
															{view_appointment_detail?.specialization?.name}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold">Whom to See</td>
														<td>
															{`${view_appointment_detail.whomToSee?.first_name} ${view_appointment_detail.whomToSee?.last_name} ${view_appointment_detail.whomToSee?.other_names}`}
														</td>
													</tr>
													<tr>
														<td className="font-weight-bold">
															Consultation Room
														</td>
														<td>
															{view_appointment_detail?.consultingRoom?.name}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>*/}
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
		view_appointment_detail: state.general.view_appointment_detail,
	};
};
export default connect(mapStateToProps, { closeModals })(ModalViewAppointment);
