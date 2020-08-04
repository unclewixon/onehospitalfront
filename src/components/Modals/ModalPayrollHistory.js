import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModals } from '../../actions/general';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { API_URI, payrollAPI } from '../../services/constants';
import PayrollItem from '../PayrollItem';
import { loadPayrollHistory } from '../../actions/hr';

class ModalPayrollHistory extends Component {
	state = {
		fetching: false,
		payrolls: [],
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
		this.fetchHistory();
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	fetchHistory = async () => {
		this.setState({ fetching: true });
		const { staff } = this.props;
		try {
			const rs = await request(
				`${payrollAPI}/${staff.emp_code}/list`,
				'GET',
				true
			);
			const payrolls = rs.filter(p => p.status === 1);
			this.props.loadPayrollHistory([...payrolls]);
			this.setState({ fetching: false });
		} catch (error) {
			notifyError(error.message || 'could not load staff payroll');
			this.setState({ fetching: false });
		}
	};

	render() {
		const { staff, payrolls } = this.props;
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
							<h4 className="onboarding-title">Payroll History</h4>
							{staff && (
								<div className="onboarding-text">
									<span className="badge badge-primary-inverted">
										{staff.name}
									</span>
								</div>
							)}
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
										{payrolls.map((payroll, i) => {
											return (
												<PayrollItem
													key={i}
													index={i + 1}
													modal={true}
													item={payroll}
												/>
											);
										})}
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

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.general.payroll_staff,
		payrolls: state.hr.history_payrolls,
	};
};

export default connect(mapStateToProps, { closeModals, loadPayrollHistory })(
	ModalPayrollHistory
);
