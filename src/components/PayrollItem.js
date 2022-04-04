/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { formatCurrency, staffname } from '../services/utilities';
import {
	viewPayrollHistory,
	viewCurrentPayroll,
	viewEditPayroll,
} from '../actions/general';

class PayrollItem extends Component {
	doViewPayroll = e => {
		e.preventDefault();
		const { item } = this.props;
		const staff = { id: item.staff.id };
		this.props.viewPayrollHistory(true, staff);
	};

	doViewCurrentPayroll = e => {
		e.preventDefault();
		const { modal, item } = this.props;
		this.props.viewCurrentPayroll(true, modal, item.id);
	};

	doEditPayroll = e => {
		e.preventDefault();
		const { item } = this.props;
		this.props.viewEditPayroll(true, true, item.id);
	};

	onCheckbox = ({ target }) => {
		this.props.setChecked(target.checked, target.name);
	};

	render() {
		const { item, modal, is_new, index, isChecked } = this.props;
		const date = moment(item.payment_month, 'YYYY-MM');
		return (
			<tr>
				{is_new && (
					<td>
						<input
							name={item.emp_code}
							checked={!!isChecked}
							type="checkbox"
							onChange={this.onCheckbox}
						/>
					</td>
				)}
				<td>{index}</td>
				{!modal && <td>{staffname(item.staff)}</td>}
				<td>{formatCurrency(item.total_allowance)}</td>
				<td>{formatCurrency(item.total_deduction)}</td>
				<td>{formatCurrency(item.total_allowance - item.total_deduction)}</td>
				{!modal && <td>{item.department.name}</td>}
				{!is_new && <td>{date.format('MMMM')}</td>}
				{!is_new && <td>{date.format('YYYY')}</td>}
				{!is_new && <td>{moment(item.createdAt).format('D MMM, YYYY')}</td>}
				<td className="row-actions">
					{is_new ? (
						<a
							onClick={this.doEditPayroll}
							className="primary"
							title="View Current Payslip"
						>
							<i className="os-icon os-icon-edit-1" />
						</a>
					) : (
						<a
							onClick={this.doViewCurrentPayroll}
							className="primary"
							title="View Current Payslip"
						>
							<i className="os-icon os-icon-credit-card" />
						</a>
					)}
					{!modal && !is_new && (
						<a
							onClick={this.doViewPayroll}
							className="secondary"
							title="View Payment History"
						>
							<i className="os-icon os-icon-ui-83" />
						</a>
					)}
				</td>
			</tr>
		);
	}
}

export default connect(null, {
	viewPayrollHistory,
	viewCurrentPayroll,
	viewEditPayroll,
})(PayrollItem);
