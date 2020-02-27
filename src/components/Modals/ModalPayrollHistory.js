import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import PayrollItem from '../PayrollItem';

class ModalPayrollHistory extends Component {
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
							<h4 className="onboarding-title">Payroll History</h4>
							<div className="onboarding-text">Payroll history for Staff<br/><span className="badge badge-primary-inverted">Emmanuel Nono</span></div>
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
									<tr>
										<th>ID</th>
										<th>Total Allowance</th>
										<th>Total Deduction</th>
										<th>Month</th>
										<th>Year</th>
										<th>Date Created</th>
										<th className="text-right">Actions</th>
									</tr>
									</thead>
									<tbody>
										<PayrollItem modal={true} />
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

export default connect(null, { closeModals })(ModalPayrollHistory);
