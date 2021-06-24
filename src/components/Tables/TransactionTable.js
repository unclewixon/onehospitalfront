/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import {
	request,
	staffname,
	confirmAction,
	formatCurrency,
	patientName,
} from '../../services/utilities';
import { delete_transaction } from '../../actions/transaction';
import { applyVoucher, approveTransaction } from '../../actions/general';
import { notifyError, notifySuccess } from '../../services/notify';
import { Can } from '../common/Can';
import ModalServiceDetails from '../Modals/ModalServiceDetails';

const TransactionTable = ({
	approveTransaction,
	applyVoucher,
	handlePrint,
	transactions,
	delete_transaction,
	showPrint = false,
	showActionBtns,
	columns,
	queue,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [details, setDetails] = useState([]);

	const doApproveTransaction = item => {
		approveTransaction(item);
	};

	const deleteTask = async data => {
		try {
			const url = `transactions/${data.id}`;
			await request(url, 'DELETE', true);
			delete_transaction(data);
			notifySuccess(`Transaction deleted!`);
		} catch (err) {
			console.log(err);
			notifyError(`${err.message}`);
		}
	};

	const confirmDelete = data => {
		confirmAction(deleteTask, data);
	};

	const viewDetails = (transaction_type, data) => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setDetails({ transaction_type, data });
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setDetails([]);
	};

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>DATE</th>
						<th>PATIENT NAME</th>
						<th>DEPARTMENT</th>
						<th>AMOUNT (&#x20A6;)</th>
						{!queue && <th>BALANCE (&#x20A6;)</th>}
						{!queue && <th>PAYMENT TYPE</th>}
						<th>PAYMENT STATUS</th>
						<th>RECEIVED By</th>
						<th className="text-center">ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => {
						return (
							<tr key={index}>
								<td>
									{moment(transaction.createdAt).format('DD-MM-YYYY H:mma')}
								</td>
								<td>
									{transaction.patient ? patientName(transaction.patient) : ''}
								</td>
								<td className="flex">
									<span className="text-capitalize">
										{transaction.transaction_type}
									</span>
									{transaction.transaction_type !== 'registration' && (
										<a
											className="item-title text-primary text-underline ml-2"
											onClick={() =>
												viewDetails(
													transaction.transaction_type,
													transaction.transaction_details
												)
											}>
											details
										</a>
									)}
								</td>
								<td>{formatCurrency(transaction.amount || 0)}</td>
								{!queue && <td>{formatCurrency(transaction.balance || 0)}</td>}
								{!queue && <td>{transaction.payment_type || '-'}</td>}
								<td>
									{transaction.status === 0 && (
										<span className="badge badge-secondary text-white">
											pending
										</span>
									)}
									{transaction.status === -1 && (
										<span className="badge badge-info text-white">
											pay later
										</span>
									)}
									{transaction.status === 1 && (
										<span className="badge badge-success">paid</span>
									)}
								</td>
								<td>
									{transaction.staff ? staffname(transaction.staff) : '--'}
								</td>
								<td className="text-center row-actions">
									{showActionBtns && (
										<>
											{transaction.payment_type !== 'HMO' &&
												(transaction.status === 0 ||
													transaction.status === -1) && (
													<Tooltip title="Approve Transactions">
														<a
															className="secondary"
															onClick={() => doApproveTransaction(transaction)}>
															<i className="os-icon os-icon-thumbs-up" />
														</a>
													</Tooltip>
												)}
											{(transaction.status === 0 ||
												transaction.status === -1) && (
												<Can I="delete-transaction" on="all">
													<Tooltip title="Delete Transactions">
														<a
															className="text-danger"
															onClick={() => confirmDelete(transaction)}>
															<i className="os-icon os-icon-ui-15" />
														</a>
													</Tooltip>
												</Can>
											)}
										</>
									)}
									{showPrint && transaction.status === 1 && (
										<Tooltip title="Print">
											<a
												className="text-info"
												onClick={e => handlePrint(e, transaction)}>
												<i className="os-icon os-icon-printer" />
											</a>
										</Tooltip>
									)}
								</td>
							</tr>
						);
					})}
					{transactions.length === 0 && (
						<tr className="text-center">
							<td colSpan="7">No transactions</td>
						</tr>
					)}
				</tbody>
			</table>
			{showModal && (
				<ModalServiceDetails
					details={details}
					closeModal={() => closeModal()}
				/>
			)}
		</>
	);
};

export default connect(null, {
	applyVoucher,
	approveTransaction,
	delete_transaction,
})(TransactionTable);
