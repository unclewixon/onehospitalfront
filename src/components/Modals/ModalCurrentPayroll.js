import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeCurrentPayRoll } from '../../actions/general';
import { formatCurrency } from '../../services/utilities';

class ModalCurrentPayroll extends Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { is_modal } = this.props;
		return (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeCurrentPayRoll(is_modal)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h6 className="onboarding-title">Payslip for Period Ended: 31ST JANUARY, 2020</h6>
							<div className="table-responsive mt-4">
								<table className="table table-striped table-sm">
									<tbody>
										<tr>
											<th className="text-left">File Number:</th>
											<td className="text-right">345</td>
										</tr>
										<tr>
											<th className="text-left">Staff Name:</th>
											<td className="text-right">Ayam Ayam</td>
										</tr>
										<tr>
											<th className="text-left">Designation:</th>
											<td className="text-right">Me</td>
										</tr>
										<tr>
											<th className="text-left">Bank A/c No:</th>
											<td className="text-right">0043570901</td>
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
											<tr>
												<td className="text-left">Basic:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Transport:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Housing:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Feeding:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Medicals:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Wardrobe:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
										</tbody>
										<tfoot>
											<tr>
												<td className="text-right" colSpan="2">
													<strong>Gross Pay:</strong>
													<span className="ml-4 text-bold">{formatCurrency(10000)}</span>
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
											<tr>
												<td className="text-left">Pension Contribution:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">PAYE:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Drugs:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Cafeteria:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Cooperative Deductions:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Penalties/Vernacular:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">Overtime/Leave Allowance:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
											<tr>
												<td className="text-left">13th Month:</td>
												<td className="text-right">{formatCurrency(10000)}</td>
											</tr>
										</tbody>
										<tfoot>
											<tr>
												<td className="text-right" colSpan="2">
													<strong>Total Deductions:</strong>
													<span className="ml-4 text-bold">{formatCurrency(10000)}</span>
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
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		is_modal: state.general.is_modal,
	}
};

export default connect(mapStateToProps, { closeCurrentPayRoll })(ModalCurrentPayroll);
