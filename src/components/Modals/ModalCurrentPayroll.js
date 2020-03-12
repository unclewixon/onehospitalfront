import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { closeCurrentPayRoll } from '../../actions/general';
import { formatCurrency } from '../../services/utilities';

class ModalCurrentPayroll extends Component {
	state = {
		payroll: null,
		fetching: false,
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
		this.setState({ fetching: true });
		const { payrolls, history_payrolls, payroll_id, payroll_staff } = this.props;
		const _payrolls = payroll_staff ? history_payrolls : payrolls;
		const payroll = _payrolls.find(p => p.id === payroll_id);
		this.setState({ payroll, fetching: false });
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { is_modal } = this.props;
		const { payroll, fetching } = this.state;
		return !fetching && (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeCurrentPayRoll(is_modal)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						{payroll && (
							<div className="onboarding-content with-gradient">
								<h6 className="onboarding-title">{`Payslip for Period Ended: ${moment(payroll.createdAt).format('Do MMMM, YYYY')}`}</h6>
								<div className="table-responsive mt-4">
									<table className="table table-striped table-sm">
										<tbody>
											<tr>
												<th className="text-left">EMP Code:</th>
												<td className="text-right">{payroll.emp_code}</td>
											</tr>
											<tr>
												<th className="text-left">Staff Name:</th>
												<td className="text-right">{payroll.staff_name}</td>
											</tr>
											<tr>
												<th className="text-left">Designation:</th>
												<td className="text-right">{payroll.designation || '-'}</td>
											</tr>
											<tr>
												<th className="text-left">Bank A/c No:</th>
												<td className="text-right">{payroll.bank_account || '-'}</td>
											</tr>
										</tbody>
									</table>
									<h6 className="mt-3">Payment Details</h6>
									<div className="payroll-details">
										<table className="table table-striped table-sm">
											<tbody>
												<tr>
													<th className="text-left">Earnings</th>
													<th className="text-right">Amount</th>
												</tr>
												{payroll.allowances && payroll.allowances.map((_, i) => {
													return (
														<tr key={i}>
															<td className="text-left">Basic:</td>
															<td className="text-right">{formatCurrency(10000)}</td>
														</tr>
													)
												})}
											</tbody>
											<tfoot>
												<tr>
													<td className="text-right" colSpan="2">
														<strong>Gross Pay:</strong>
														<span className="ml-4 text-bold">{formatCurrency(payroll.total_allowance)}</span>
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<h6 className="mt-3">Deductions</h6>
									<div className="payroll-details deductions">
										<table className="table tabl-striped table-sm">
											<tbody>
												<tr>
													<th className="text-left">Deductions</th>
													<th className="text-right">Amount</th>
												</tr>
												{payroll.deductions && payroll.deductions.map((_, i) => {
													return (
														<tr key={i}>
															<td className="text-left">Pension Contribution:</td>
															<td className="text-right">{formatCurrency(10000)}</td>
														</tr>
													)
												})}
											</tbody>
											<tfoot>
												<tr>
													<td className="text-right" colSpan="2">
														<strong>Total Deductions:</strong>
														<span className="ml-4 text-bold">{formatCurrency(payroll.total_deduction)}</span>
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<table className="table table-striped table-sm table-lightfont mt-4">
										<tbody>
											<tr>
												<th className="text-left">Prepared By:</th>
												<td className="text-right">Staff Name</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		is_modal: state.general.is_modal,
		payrolls: state.hr.payrolls,
		history_payrolls: state.hr.history_payrolls,
		payroll_id: state.general.payroll_id,
		payroll_staff: state.general.payroll_staff,
	}
};

export default connect(mapStateToProps, { closeCurrentPayRoll })(ModalCurrentPayroll);
