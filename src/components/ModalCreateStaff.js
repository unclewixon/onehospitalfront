import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../actions/general';

class ModalCreateStaff extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		return (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Create New Staff</h4>
							<div className="onboarding-text"> create new staff profile</div>
							<div className="form-block">
								<form>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Username</label>
												<input className="form-control" placeholder="Enter username" />
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Password</label>
												<input className="form-control" placeholder="Enter password"/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Role</label>
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
												<label htmlFor="">First name</label>
												<input className="form-control" placeholder="Enter first name" />
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Last name</label>
												<input className="form-control" placeholder="Enter last name"/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Department</label>
												<select className="form-control">
													<option>Nurse</option>
													<option>IVF</option>
													<option>OPD</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Email address</label>
												<input className="form-control" placeholder="Enter email address" />
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Phone number</label>
												<input className="form-control" placeholder="Enter phone number"/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Gender</label>
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
												<label htmlFor="">Profession</label>
												<select className="form-control">
													<option>Doctor</option>
													<option>Lab Scientist</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Specialization</label>
												<select className="form-control">
													<option>Consultant Gnyae</option>
													<option>Consulant Pediatrics</option>
												</select>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Folio number</label>
												<input className="form-control" placeholder="Enter folio number"/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Is Consultant?</label>
												<input className="form-control ml-2" type="checkbox" value="1"/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary">Create Profile</button>
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

export default connect(null, { closeModals })(ModalCreateStaff);
