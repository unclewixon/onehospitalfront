/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { formatNumber, confirmAction } from '../../services/utilities';

import searchingGIF from '../../assets/images/searching.gif';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteTransaction } from '../../actions/transaction';
import Tooltip from 'antd/lib/tooltip';
import { applyVoucher, approveTransaction } from '../../actions/general';
import { notifyError, notifySuccess } from '../../services/notify';
import truncate from 'lodash.truncate';

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
								{transaction.serviceType ? (
									<Tooltip title={transaction.serviceType.name} trigger="hover">
										{transaction.serviceType?.name
											? truncate(transaction.serviceType.name, {
													length: 20,
													omission: '...',
											  })
											: 'No service yet'}
									</Tooltip>
								) : transaction.service ? (
									<Tooltip
										title={transaction.service.name}
										trigger="hover"
										mouseEnterDelay={0.1}>
										{transaction.service?.name
											? truncate(transaction.service.name, {
													length: 20,
													omission: '...',
											  })
											: 'No service yet'}
									</Tooltip>
								) : null}
							</td>
							<td className="">
								{transaction.amount ? formatNumber(transaction.amount) : 0}
							</td>

							<td className="">
								{transaction?.balance ? transaction.balance : '0'}
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
										<a
											className="text-danger"
											onClick={e => handlePrint(e, transaction)}>
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
