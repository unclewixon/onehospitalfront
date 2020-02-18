/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from '../services/utilities';
import { viewPayrollHistory, viewCurrentPayroll, viewEditPayroll } from '../actions/general';

class PayrollItem extends Component {
	doViewPayroll = e => {
		e.preventDefault();
		console.log('view payroll');
		this.props.viewPayrollHistory(true);
	};
	
	doViewCurrentPayroll = e => {
		e.preventDefault();
		console.log('current payroll');
		const { modal } = this.props;
		this.props.viewCurrentPayroll(true, modal);
	};
	
	doEditPayroll = e => {
		e.preventDefault();
		console.log('edit payroll');
		this.props.viewEditPayroll(true, true);
	};

	render() {
		const { modal, is_new } = this.props;
		return (
			<tr>
				{is_new && <td><input type="checkbox"/></td>}
				<td>1</td>
				{!modal && <td>My Name</td>}
				<td>{formatCurrency(1200000)}</td>
				<td>{formatCurrency(2000000)}</td>
				{!modal && <td>My Department</td>}
				{!is_new && <td>January</td>}
				{!is_new && <td>2020</td>}
				{!is_new && <td>12 Jan, 2020</td>}
				<td className="text-right row-actions">
					{is_new ? (
						<a href="#" onClick={this.doEditPayroll} className="primary" title="View Current Payslip">
							<i className="os-icon os-icon-edit-1" />
						</a>
					) : (
						<a href="#" onClick={this.doViewCurrentPayroll} className="primary" title="View Current Payslip">
							<i className="os-icon os-icon-credit-card" />
						</a>
					)}
					{!modal && !is_new && (
						<a href="#" onClick={this.doViewPayroll} className="secondary" title="View Payment History">
							<i className="os-icon os-icon-ui-83" />
						</a>
					)}
				</td>
			</tr>
		);
	}
}

export default connect(null, { viewPayrollHistory, viewCurrentPayroll, viewEditPayroll })(PayrollItem);
