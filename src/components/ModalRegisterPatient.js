import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { closeModals } from '../actions/general';

class ModalRegisterNewPatient extends Component {
	state = {
		index: 0,
	};
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	handleSelect = (selectedIndex, e) => {
		this.setState({ index: selectedIndex });
	};

	render() {
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}
			>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content text-center">
						<div className="modal-header faded smaller">
							<div className="modal-title">
								<span>Registrar:</span>
								<img
									alt=""
									className="avatar"
									src={require('../assets/images/avatar1.jpg')}
								/>
								<span>Date: </span>
								<strong>Sep 12th, 2017</strong>
							</div>
							<button
								aria-label="Close"
								className="close"
								data-dismiss="modal"
								type="button"
								onClick={() => this.props.closeModals(false)}
							>
								<span aria-hidden="true"> ×</span>
							</button>
						</div>
						<Carousel
							activeIndex={this.state.index}
							onSelect={this.handleSelect}
							controls={false}
						>
							<Carousel.Item>
								<h5 className="form-header">New patient registration</h5>
								<div className="form-desc"></div>
								<div className="onboarding-content with-gradient">
									<div className="modal-body">
										<form>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label for="">First Name</label>
														<input
															className="form-control"
															placeholder="Enter first name"
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Last Name</label>
														<input
															className="form-control"
															placeholder="Enter last name"
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Other Name</label>
														<input
															className="form-control"
															placeholder="Enter other names here"
															type="text"
															value=""
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label for="">Date of birth</label>
														<input
															className="form-control"
															placeholder="04/12/1978"
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Gender</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Male</option>
															<option>Female</option>
														</select>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Marital Status</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Single</option>
															<option>Married</option>
														</select>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label for="">HMO</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Hmo list</option>
														</select>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Occupation</label>
														<input
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Ethnicity</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Igbo</option>
															<option>Hausa</option>
															<option>Kanuri</option>
															<option>Other</option>
														</select>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-8">
													<div className="form-group">
														<label for="">Address</label>
														<input
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Email</label>
														<input
															className="form-control"
															placeholder="example@email.com"
															type="text"
															value=""
														/>
													</div>
												</div>
											</div>
										</form>
									</div>

									<div className="modal-footer buttons-on-right">
										<button
											className="btn btn-teal"
											type="button"
											onClick={() => this.props.closeModals(false)}
										>
											{' '}
											Cancel
										</button>
										<button
											className="btn btn-link"
											data-dismiss="modal"
											type="button"
											onClick={() => this.setState({ index: 1 })}
										>
											{' '}
											Next
										</button>
									</div>
								</div>
							</Carousel.Item>
							<Carousel.Item>
								<h6 className="form-header">Partner/Next of Kin</h6>
								<div className="form-desc"></div>
								<div className="onboarding-content with-gradient">
									<div className="modal-body">
										<form>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label for="">First Name</label>
														<input
															className="form-control"
															placeholder="Enter first name"
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Last Name</label>
														<input
															className="form-control"
															placeholder="Enter last name"
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Other Name</label>
														<input
															className="form-control"
															placeholder="Enter other names here"
															type="text"
															value=""
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label for="">Date of birth</label>
														<input
															className="form-control"
															placeholder="04/12/1978"
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Gender</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Male</option>
															<option>Female</option>
														</select>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Marital Status</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Single</option>
															<option>Married</option>
														</select>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label for="">HMO</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Hmo list</option>
														</select>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Occupation</label>
														<input
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Ethnicity</label>
														<select
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														>
															<option>Igbo</option>
															<option>Hausa</option>
															<option>Kanuri</option>
															<option>Other</option>
														</select>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-8">
													<div className="form-group">
														<label for="">Address</label>
														<input
															className="form-control"
															placeholder="Enter your full name..."
															type="text"
															value=""
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label for="">Email</label>
														<input
															className="form-control"
															placeholder="example@email.com"
															type="text"
															value=""
														/>
													</div>
												</div>
											</div>
										</form>
									</div>

									<div className="modal-footer ">
										<button
											className="btn btn-teal buttons-on-left"
											type="button"
											onClick={() => this.setState({ index: 0 })}
										>
											{' '}
											Previous
										</button>
										<button
											className="btn btn-teal buttons-on-right"
											type="button"
											onClick={() => this.setState({ index: 0 })}
										>
											{' '}
											Submit
										</button>
									</div>
								</div>
							</Carousel.Item>
						</Carousel>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { closeModals })(ModalRegisterNewPatient);
