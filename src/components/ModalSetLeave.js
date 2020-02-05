import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { closeModals } from '../actions/general';

class ModalSetLeave extends Component {
	state = {
		start_date: moment().format('DD-MM-YYYY'),
		end_date: moment().format('DD-MM-YYYY'),
	};

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
							<h4 className="onboarding-title">Set Leave</h4>
							<div className="onboarding-text"> create staff leave</div>
							<div className="form-block">
								<form>
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Staff Name</label>
												<input className="form-control" placeholder="Enter name" />
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">Start Date</label>
												<div className="date-input">
													<input className="single-daterange form-control" placeholder="Enter start date" type="text"/>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label htmlFor="">End Date</label>
												<div className="date-input">
													<input className="single-daterange form-control" placeholder="Enter end date" type="text"/>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button className="btn btn-primary">Set Leave</button>
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

export default connect(null, { closeModals })(ModalSetLeave);