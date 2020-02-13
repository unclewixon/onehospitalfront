/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeEditPayRoll } from '../actions/general';
import { formatCurrency } from '../services/utilities';

class ModalEditPayroll extends Component {
	state = {
		new_deductions: [],
		deductions: [],
	};

	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	addDeduction = () => {
		console.log('add deduction');
		const { new_deductions } = this.state;
		this.setState({ new_deductions: [...new_deductions, new_deductions.length + 1] });
	};

	removeDeduction = id => () => {
		console.log(`remove deduction: ${id}`);
		const { new_deductions } = this.state;
		this.setState({ new_deductions: [...new_deductions.filter(i => i !== id)] });
	};

	saveDeductions = e => {
		e.preventDefault();
		const { deductions } = this.state;
		console.log(`save deductions: ${JSON.stringify(deductions)}`);
	};

	render() {
		const { is_modal } = this.props;
		const { new_deductions } = this.state;
		return (
			<div className="onboarding-modal modal fade animated show" role="dialog" style={{ display: 'block' }}>
				<div className="modal-dialog modal-centered" role="document">
					<div className="modal-content text-center">
						<button aria-label="Close" className="close" type="button" onClick={() => this.props.closeEditPayRoll(is_modal)}>
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
								<form>
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
													<td>
														<div className="input-group col-8 float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Basic"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Transport:</td>
													<td>
														<div className="input-group col-8 float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Transport"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Housing:</td>
													<td>
														<div className="input-group col-8 float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Housing"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Feeding:</td>
													<td>
														<div className="input-group col-8 float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Feeding"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Medicals:</td>
													<td>
														<div className="input-group col-8 float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Medical"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Wardrobe:</td>
													<td>
														<div className="input-group col-8 float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Wardrobe"/>
														</div>
													</td>
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
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Pension Contribution"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">PAYE:</td>
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="PAYE"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Drugs:</td>
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Drugs"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Cafeteria:</td>
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Cafeteria"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Cooperative Deductions:</td>
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Cooperative Deductions"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Penalties/Vernacular:</td>
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Penalties/Vernacular"/>
														</div>
													</td>
												</tr>
												<tr>
													<td className="text-left">Overtime/Leave Allowance:</td>
													<td>
														<div className="input-group float-right pr-0">
															<div className="input-group-prepend">
																<div className="input-group-text">₦</div>
															</div>
															<input className="form-control" placeholder="Overtime/Leave Allowance"/>
														</div>
													</td>
												</tr>
												{new_deductions.map(d => {
													return (
														<tr key={d}>
															<td className="text-left">
																<div className="form-group text-rightfloat-left pl-0 mb-0">
																	<input className="form-control" placeholder="Deduction"/>
																</div>
															</td>
															<td>
																<div className="row no-gutters">
																	<div className="input-group col-11">
																		<div className="input-group-prepend">
																			<div className="input-group-text">₦</div>
																		</div>
																		<input className="form-control" placeholder="Amount"/>
																	</div>
																	<div className="col-1 text-right">
																		<a className="text-danger" href="#" onClick={this.removeDeduction(d)} style={{lineHeight: '37px'}}><i className="os-icon os-icon-cancel-circle"/></a>
																	</div>
																</div>
															</td>
														</tr>
													)
												})}
												<tr>
													<td className="text-right mb-3" colSpan="2">
														<div className="text-right mt-2">
															<a className="btn btn-success btn-sm" href="#" onClick={this.addDeduction}>
																<i className="os-icon os-icon-plus-circle"/>
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
														<span className="ml-4 text-bold">{formatCurrency(10000)}</span>
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<div className="row">
										<div className="col-sm-12 text-center mt-4">
											<button className="btn btn-primary" onClick={this.saveDeductions}>Save</button>
											<button className="btn btn-secondary ml-3" onClick={() => this.props.closeEditPayRoll(is_modal)}>Close</button>
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

const mapStateToProps = (state, ownProps) => {
	return {
		is_modal: state.general.is_modal,
	}
};

export default connect(mapStateToProps, { closeEditPayRoll })(ModalEditPayroll);
