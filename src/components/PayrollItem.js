/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from '../services/utilities';
import { viewPayrollHistory, viewCurrentPayroll } from '../actions/general';

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

	render() {
		const { modal } = this.props;
		return (
			<tr>
				<td>1</td>
				{!modal && <td>My Name</td>}
				<td>{formatCurrency(1200000)}</td>
				<td>{formatCurrency(2000000)}</td>
				<td>January</td>
				<td>2020</td>
				<td>12 Jan, 2020</td>
				<td className="text-right row-actions">
					<a href="#" onClick={this.doViewCurrentPayroll} className="primary" title="View Current Payslip">
						<i className="os-icon os-icon-credit-card" />
					</a>
					{!modal && (
						<a href="#" onClick={this.doViewPayroll} className="secondary" title="View Payment History">
							<i className="os-icon os-icon-ui-83" />
						</a>
					)}
				</td>
			</tr>
		);
	}
}

export default connect(null, { viewPayrollHistory, viewCurrentPayroll })(PayrollItem);
