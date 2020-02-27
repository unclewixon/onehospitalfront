import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';

class ModalLeaveHistory extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		return (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Leave History</h4>
							<div className="onboarding-text">history of leave of absense for staff</div>
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Type</th>
											<th>Date Left</th>
											<th>Date Returned</th>
											<th>Duration</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Maternity Leave</td>
											<td>20 Apr, 2019</td>
											<td>10 May, 2019</td>
											<td>10days</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { closeModals })(ModalLeaveHistory);
