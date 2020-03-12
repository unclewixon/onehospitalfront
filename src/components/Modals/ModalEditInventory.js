import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

class ModalEditInventory extends Component {
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
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Edit Inventory Item</h4>
							<div className="form-block">
								<form>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>Name</label>
												<input
													className="form-control"
													placeholder="Enter name"
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>Select Category</label>
												<select className="form-control">
													<option>Pharmacy</option>
													<option>Cafeteria</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>Cost Price</label>
												<div className="input-group">
													<div className="input-group-prepend">
														<div className="input-group-text">₦</div>
													</div>
													<input
														className="form-control"
														placeholder="Enter cost price"
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<div className="form-group">
													<label>Selling Price</label>
													<div className="input-group">
														<div className="input-group-prepend">
															<div className="input-group-text">₦</div>
														</div>
														<input
															className="form-control"
															placeholder="Enter selling price"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<div className="form-group">
													<label>Description</label>
													<input
														className="form-control"
														placeholder="Enter description"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary">Save</button>
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

export default connect(null, { closeModals })(ModalEditInventory);
