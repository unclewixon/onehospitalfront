import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

class ModalUpdInventoryQty extends Component {
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
				<div className="modal-dialog modal-sm modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Update Quantity</h4>
							<div className="form-block">
								<form>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Name</label>
												<input
													className="form-control"
													placeholder="Enter quantity"
													disabled="disabled"
													value="Surgical Blade"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label>Quantity</label>
												<input
													className="form-control"
													placeholder="Enter quantity"
												/>
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

export default connect(null, { closeModals })(ModalUpdInventoryQty);
