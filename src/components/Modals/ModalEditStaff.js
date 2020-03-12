import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

class ModalEditStaff extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
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
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Edit Staff</h4>
							<div className="onboarding-text">edit staff profile</div>
							<div className="form-block">
								<form>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Username</label>
												<input
													className="form-control"
													placeholder="Enter username"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Password</label>
												<input
													className="form-control"
													placeholder="Enter password"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Role</label>
												<select className="form-control">
													<option>Nurse</option>
													<option>Doctor</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>First name</label>
												<input
													className="form-control"
													placeholder="Enter first name"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Surname</label>
												<input
													className="form-control"
													placeholder="Enter surname"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Other name</label>
												<input
													className="form-control"
													placeholder="Enter other names"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Department</label>
												<select className="form-control">
													<option>Nurse</option>
													<option>IVF</option>
													<option>OPD</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Date of Birth</label>
												<div className="date-input">
													<input
														className="single-daterange form-control"
														placeholder="Enter date of birth"
														type="text"
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Religion</label>
												<select className="form-control">
													<option>Christianity</option>
													<option>Islam</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Email address</label>
												<input
													className="form-control"
													placeholder="Enter email address"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Phone number</label>
												<input
													className="form-control"
													placeholder="Enter phone number"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Gender</label>
												<select className="form-control">
													<option>Male</option>
													<option>Female</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Nationality</label>
												<select className="form-control">
													<option>Nigeria</option>
													<option>Canada</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>State of Origin</label>
												<select className="form-control">
													<option>Abia State</option>
													<option>Imo State</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>LGA</label>
												<select className="form-control">
													<option>Amak</option>
													<option>Lugbe</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Contact Address</label>
												<input
													className="form-control"
													placeholder="Enter contact address"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Profession</label>
												<select className="form-control">
													<option>Doctor</option>
													<option>Lab Scientist</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Specialization</label>
												<select className="form-control">
													<option>Consultant Gnyae</option>
													<option>Consulant Pediatrics</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Folio number</label>
												<input
													className="form-control"
													placeholder="Enter folio number"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Marital Status</label>
												<select className="form-control">
													<option>Single</option>
													<option>Married</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Number of Children</label>
												<input
													className="form-control"
													placeholder="Enter number of children"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Bank</label>
												<select className="form-control">
													<option>GTB</option>
													<option>First Bank</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Account number</label>
												<input
													className="form-control"
													placeholder="Enter account number"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Employment start date</label>
												<div className="date-input">
													<input
														className="single-daterange form-control"
														placeholder="Enter date of employment"
														type="text"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Contract type</label>
												<select className="form-control">
													<option>Part time</option>
													<option>Full time</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Gross salary (Monthly)</label>
												<input
													className="form-control"
													placeholder="Enter gross salary (monthly)"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Gross salary (Annual)</label>
												<input
													className="form-control"
													placeholder="Enter gross salary (annual)"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Next of Kin name</label>
												<input
													className="form-control"
													placeholder="Enter nok name"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Next of Kin relationship</label>
												<input
													className="form-control"
													placeholder="Enter nok relationship"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Next of Kin phone number</label>
												<input
													className="form-control"
													placeholder="Enter nok phone number"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-8">
											<div className="form-group">
												<label>Next of Kin address</label>
												<input
													className="form-control"
													placeholder="Enter nok address"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Next of Kin Date of Birth</label>
												<div className="date-input">
													<input
														className="single-daterange form-control"
														placeholder="Enter nok date of birth"
														type="text"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label>Is Consultant?</label>
												<input
													className="form-control ml-2"
													type="checkbox"
													value="1"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary">
												Create Profile
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { closeModals })(ModalEditStaff);
