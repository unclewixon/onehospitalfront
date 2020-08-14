/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { closeEditPayRoll } from '../../actions/general';
import { formatCurrency, request } from '../../services/utilities';
import { payrollAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';

const allowances = {
	Basic: 0.4,
	Transport: 0.1,
	Housing: 0.1,
	Feeding: 0.2,
	Medicals: 0.1,
	Wardrobe: 0.1,
};

class ModalEditPayroll extends Component {
	state = {
		new_deductions: [],
		payroll: null,
		fetching: false,
		saving: false,
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
		this.setState({ fetching: true });
		const { payrolls, payroll_id } = this.props;
		const payroll = payrolls.find(p => p.id === payroll_id);
		this.setState({ payroll, fetching: false });
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	addDeduction = () => {
		const { new_deductions } = this.state;
		this.setState({
			new_deductions: [
				...new_deductions,
				{ id: new_deductions.length, deleted: 0, name: '', value: '' },
			],
		});
	};

	updateDeduction = (id, type, value) => {
		const { new_deductions } = this.state;
		const deduction = new_deductions.find(d => d.id === id);
		if (deduction) {
			const idx = new_deductions.findIndex(d => d.id === id);
			const deductions = [
				...new_deductions.slice(0, idx),
				{ ...deduction, [type]: value },
				...new_deductions.slice(idx + 1),
			];
			return deductions;
		}
		return [];
	};

	deductions = (e, type, id) => {
		const value = e.target.value;
		const deductions = this.updateDeduction(id, type, value);
		this.setState({ new_deductions: [...deductions] });
	};

	removeDeduction = id => () => {
		const deductions = this.updateDeduction(id, 'deleted', 1);
		this.setState({ new_deductions: [...deductions] });
	};

	saveDeductions = async e => {
		e.preventDefault();
		const { payroll_id } = this.props;
		const { new_deductions } = this.state;
		const deductions = new_deductions
			.filter(nd => nd.deleted !== 1)
			.map(p => ({ label: p.name, value: p.value }));
		const data = { payslip_id: payroll_id, comment: '', deductions };
		this.setState({ saving: true });
		try {
			console.log(JSON.stringify(data));
			const rs = await request(
				`${payrollAPI}/update-payslip`,
				'PATCH',
				true,
				data
			);
			console.log(rs);
			// this.props.loadUnpaidPayroll(rs);
			this.setState({ saving: false });
			notifySuccess('payslip saved!');
		} catch (error) {
			notifyError(error.message || 'could not save payslip');
			this.setState({ saving: false });
		}
	};

	render() {
		const { is_modal } = this.props;
		const { new_deductions, payroll, fetching, saving } = this.state;
		console.log(payroll);
		return (
			!fetching && (
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
								onClick={() => this.props.closeEditPayRoll(is_modal)}>
								<span className="os-icon os-icon-close"></span>
							</button>
							{payroll ? (
								<div className="onboarding-content with-gradient">
									<h6 className="onboarding-title">{`Payslip for Period Ended: ${moment(
										payroll.createdAt
									).format('Do MMMM, YYYY')}`}</h6>
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
													<td className="text-right">
														{payroll.designation || '-'}
													</td>
												</tr>
												<tr>
													<th className="text-left">Bank A/c No:</th>
													<td className="text-right">
														{payroll.bank_account || '-'}
													</td>
												</tr>
											</tbody>
										</table>
										<form>
											<h6 className="mt-3">Payment Details</h6>
											<div className="payroll-details">
												<table className="table table-striped table-sm">
													<tbody>
														<tr>
															<th className="text-left">Earnings</th>
															<th className="text-right">Amount</th>
														</tr>
														{allowances &&
															Object.keys(allowances).map((el, i) => {
																return (
																	<tr key={i}>
																		<td className="text-left">{el}:</td>
																		<td className="text-right">
																			{formatCurrency(
																				allowances[el] * payroll.total_allowance
																			)}
																		</td>
																	</tr>
																);
															})}
													</tbody>
													<tfoot>
														<tr>
															<td className="text-right" colSpan="2">
																<strong>Gross Pay:</strong>
																<span className="ml-4 text-bold">
																	{formatCurrency(payroll.total_allowance)}
																</span>
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
														{payroll.deductions &&
															payroll.deductions.map((_, i) => {
																return (
																	<tr key={i}>
																		<td className="text-left">
																			Pension Contribution:
																		</td>
																		<td className="text-right">
																			{formatCurrency(10000)}
																		</td>
																	</tr>
																);
															})}
														{new_deductions.map((d, i) => {
															return (
																d.deleted === 0 && (
																	<tr key={i}>
																		<td className="text-left">
																			<div className="form-group text-rightfloat-left pl-0 mb-0">
																				<input
																					className="form-control"
																					placeholder="Deduction"
																					onChange={e =>
																						this.deductions(e, 'name', d.id)
																					}
																				/>
																			</div>
																		</td>
																		<td>
																			<div className="row no-gutters">
																				<div className="input-group col-11">
																					<div className="input-group-prepend">
																						<div className="input-group-text">
																							₦
																						</div>
																					</div>
																					<input
																						className="form-control"
																						type="number"
																						placeholder="Amount"
																						onChange={e =>
																							this.deductions(e, 'value', d.id)
																						}
																					/>
																				</div>
																				<div className="col-1 text-right">
																					<a
																						className="text-danger"
																						onClick={this.removeDeduction(d.id)}
																						style={{ lineHeight: '37px' }}>
																						<i className="os-icon os-icon-cancel-circle" />
																					</a>
																				</div>
																			</div>
																		</td>
																	</tr>
																)
															);
														})}
														<tr>
															<td className="text-right mb-3" colSpan="2">
																<div className="text-right mt-2">
																	<a
																		className="btn btn-success btn-sm text-white"
																		onClick={this.addDeduction}>
																		<i className="os-icon os-icon-plus-circle" />
																		<span>Add Deduction</span>
																	</a>
																</div>
															</td>
														</tr>
													</tbody>
													<tfoot>
														<tr>
															<td className="text-right" colSpan="2">
																<strong>Total Deductions:</strong>
																<span className="ml-4 text-bold">
																	{formatCurrency(payroll.total_deduction)}
																</span>
															</td>
														</tr>
													</tfoot>
												</table>
											</div>
											<div className="row">
												<div className="col-sm-12 text-center mt-4">
													{new_deductions.length > 0 && (
														<button
															className="btn btn-primary"
															onClick={this.saveDeductions}>
															{saving ? (
																<img src={waiting} alt="submitting" />
															) : (
																'Save'
															)}
														</button>
													)}
													<button
														className="btn btn-secondary ml-3"
														onClick={() =>
															this.props.closeEditPayRoll(is_modal)
														}>
														Close
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							) : (
								<div className="onboarding-content with-gradient">
									No Payslip Found!
								</div>
							)}
						</div>
					</div>
				</div>
			)
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		is_modal: state.general.is_modal,
		payrolls: state.hr.unpaid_payrolls,
		payroll_id: state.general.payroll_id,
	};
};

export default connect(mapStateToProps, { closeEditPayRoll })(ModalEditPayroll);
