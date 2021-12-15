/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

class ModalAddTask extends Component {
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
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<div className="modal-header faded smaller">
							<div className="modal-title">
								<span>Assigned to:</span>
								<img
									alt=""
									className="avatar"
									src={require('../../assets/images/avatar1.jpg')}
								/>
								<span>Due Date: </span>
								<strong>Sep 12th, 2017</strong>
							</div>
							<button
								aria-label="Close"
								className="close"
								type="button"
								onClick={() => this.props.closeModals(false)}>
								<span aria-hidden="true"> ×</span>
							</button>
						</div>

						<div className="onboarding-content with-gradient">
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label>Name</label>
										<input
											className="form-control"
											placeholder="Enter task name"
											type="text"
											value="Visit Home Depot to find out what is needed to rebuild backyard patio"
										/>
									</div>
									<div className="form-group">
										<label>Description</label>
										<textarea className="form-control" name="" rows="3">
											The similar diesel only tell deference and likewise,
											thought, nonetheless, for ahead school. The were
											organization.
										</textarea>
									</div>
									<div className="form-group">
										<label>Media Attached</label>
										<div className="attached-media-w">
											<img
												src={require('../../assets/images/portfolio9.jpg')}
												alt=""
											/>
											<img
												src={require('../../assets/images/portfolio2.jpg')}
												alt=""
											/>
											<img
												src={require('../../assets/images/portfolio12.jpg')}
												alt=""
											/>
											<a className="attach-media-btn" href="#">
												<i className="os-icon os-icon-ui-22"></i>
												<span>Add Photos</span>
											</a>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label> Due Date</label>
												<div className="date-input">
													<input
														className="single-daterange form-control"
														placeholder="Date of birth"
														type="text"
														value="04/12/1978"
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>Priority</label>
												<select className="form-control">
													<option>High Priority</option>
													<option>Normal Priority</option>
													<option>Low Priority</option>
												</select>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div className="modal-footer buttons-on-left">
								<button className="btn btn-teal" type="button">
									Save changes
								</button>
								<button
									className="btn btn-link"
									type="button"
									onClick={() => this.props.closeModals(false)}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { closeModals })(ModalAddTask);
