/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useEffect, useState } from 'react';

import { API_URI, socket, transactionsAPI } from '../../services/constants';
import { request, formatNumber, confirmAction } from '../../services/utilities';

import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { connect } from 'react-redux';
import {
	loadTodayTransaction,
	deleteTransaction,
} from '../../actions/transaction';
import Tooltip from 'antd/lib/tooltip';
import { applyVoucher, approveTransaction } from '../../actions/general';
import { notifyError, notifySuccess } from '../../services/notify';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import Reading from '../Patient/Reading';

const TransactionTable = ({
	approveTransaction,
	applyVoucher,
	deleteTransaction,
	handlePrint,
	transactions,
	loading,
	today,
	show = false,
}) => {
	const doApproveTransaction = item => {
		approveTransaction(item);
	};
	const doApplyVoucher = item => {
		applyVoucher(item);
	};
	const onDeleteTransaction = data => {
		deleteTransaction(data)
			.then(response => {
				notifySuccess('Transaction deleted');
			})
			.catch(error => {
				notifyError('Error deleting  transaction ');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteTransaction, data);
	};

	return (
		<tbody>
			{loading ? (
				<tr>
					<td colSpan="6" className="text-center">
						<img alt="searching" src={searchingGIF} />
					</td>
				</tr>
			) : transactions.length > 0 ? (
				transactions.map((transaction, index) => {
					return (
						<tr key={index}>
							<td className="text-center" hidden={today}>
								{moment(transaction.createdAt).format('YYYY/MM/DD')}
							</td>
							<td className="">
								{`${transaction.patient?.surname} ${transaction.patient?.other_names}`}
							</td>
							<td className="">
								{transaction.department?.name
									? transaction.department?.name
									: 'No Department'}
							</td>
							<td className="">
								{transaction.serviceType?.name
									? transaction.serviceType.name
									: 'No service yet'}
							</td>
							<td className="">
								{transaction.amount ? formatNumber(transaction.amount) : 0}
							</td>
							<td className="">
								{transaction.payment_type
									? transaction.payment_type
									: 'Not specified'}
							</td>
							<td className="text-center row-actions">
								<Tooltip title="Apply Voucher">
									<a
										className="secondary"
										onClick={() => doApplyVoucher(transaction)}>
										<i className="os-icon os-icon-thumbs-up" />
									</a>
								</Tooltip>

								<Tooltip title="Approve Transactions">
									<a
										className="secondary"
										onClick={() => doApproveTransaction(transaction)}>
										<i className="os-icon os-icon-folder-plus" />
									</a>
								</Tooltip>

								<Tooltip title="Delete Transactions">
									<a
										className="text-danger"
										onClick={() => confirmDelete(transaction)}>
										<i className="os-icon os-icon-ui-15"></i>
									</a>
								</Tooltip>

								{show ? (
									<Tooltip title="Print">
										<a className="text-danger" onClick={e => handlePrint(e)}>
											<i className="os-icon os-icon-printer"></i>
										</a>
									</Tooltip>
								) : null}
							</td>
						</tr>
					);
				})
			) : (
				<tr className="text-center">
					<td colSpan="7">No transaction</td>
				</tr>
			)}
		</tbody>
	);
};

export default connect(null, {
	applyVoucher,
	approveTransaction,
	deleteTransaction,
})(TransactionTable);
