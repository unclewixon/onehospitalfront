/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import {
	request,
	staffname,
	confirmAction,
	formatCurrency,
	patientname,
} from '../../services/utilities';
import { deleteTransaction } from '../../actions/transaction';
import { notifyError, notifySuccess } from '../../services/notify';
import { Can } from '../common/Can';
import ModalServiceDetails from '../Modals/ModalServiceDetails';
import ModalShowTransactions from '../Modals/ModalShowTransactions';
import ModalApproveTransaction from '../Modals/ModalApproveTransaction';
import ModalPrintTransaction from '../Modals/ModalPrintTransaction';

const TransactionTable = ({
	transactions,
	showActionBtns,
	showPrint = false,
	queue,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [showPrintModal, setShowPrintModal] = useState(false);
	const [showTransactions, setShowTransactions] = useState(false);
	const [transaction, setTransaction] = useState(null);
	const [patient, setPatient] = useState(null);
	const [processTransaction, setProcessTransaction] = useState(false);

	const dispatch = useDispatch();

	const doApproveTransaction = item => {
		document.body.classList.add('modal-open');
		setTransaction(item);
		setProcessTransaction(true);
	};

	const deleteTask = async data => {
		try {
			const url = `transactions/${data.id}`;
			await request(url, 'DELETE', true);
			dispatch(deleteTransaction(data));
			notifySuccess(`Transaction deleted!`);
		} catch (err) {
			console.log(err);
			notifyError(`${err.message}`);
		}
	};

	const confirmDelete = data => {
		confirmAction(deleteTask, data);
	};

	const viewDetails = transaction => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setTransaction(transaction);
	};

	const showList = patient => {
		document.body.classList.add('modal-open');
		setShowTransactions(true);
		setPatient(patient);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setProcessTransaction(false);
		setShowTransactions(false);
		setTransaction(null);
		setPatient(null);
		setShowPrintModal(false);
	};

	const handlePrint = item => {
		setTransaction(item);
		document.body.classList.add('modal-open');
		setShowPrintModal(true);
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
						<th>PAYMENT STATUS</th>
						{!queue && <th>TYPE</th>}
						{!queue && <th>RECEIVED By</th>}
						<th className="text-center">ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => {
						return (
							<tr key={index}>
								<td>
									{moment(transaction.createdAt).format('DD-MM-YYYY h:mm a')}
								</td>
								<td>
									<a onClick={() => showList(transaction.patient)}>
										{patientname(transaction.patient, true)}
										{(transaction.patient?.admission_id ||
											transaction.patient?.nicu_id) && (
											<Tooltip title="Admitted">
												<i className="fa fa-hospital-o text-danger ml-1" />
											</Tooltip>
										)}
									</a>
								</td>
								<td>
									<div className="flex">
										<span className="text-capitalize">
											{transaction.bill_source === 'ward'
												? 'Room'
												: transaction.bill_source}
										</span>
										{transaction.bill_source !== 'registration' && (
											<a
												className="item-title text-info ml-2"
												onClick={() => viewDetails(transaction)}
											>
												<i className="os-icon os-icon-alert-circle" />
											</a>
										)}
									</div>
								</td>
								<td>{formatCurrency(transaction.amount || 0, true)}</td>
								<td>
									{transaction.payment_method || ''}
									{transaction.payment_method && <br />}
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
								{!queue && <td>{transaction.transaction_type || '--'}</td>}
								{!queue && (
									<>
										{transaction.transaction_type === 'debit' ? (
											<td>
												{transaction.staff
													? staffname(transaction.staff)
													: '--'}
											</td>
										) : (
											<td>
												{transaction.cashier
													? staffname(transaction.cashier)
													: '--'}
											</td>
										)}
									</>
								)}
								<td className="text-center row-actions">
									{showActionBtns && (
										<>
											{transaction.payment_type !== 'HMO' &&
												(transaction.status === 0 ||
													transaction.status === -1) && (
													<Tooltip title="Approve Transactions">
														<a
															className="secondary"
															onClick={() => doApproveTransaction(transaction)}
														>
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
															onClick={() => confirmDelete(transaction)}
														>
															<i className="os-icon os-icon-ui-15" />
														</a>
													</Tooltip>
												</Can>
											)}
										</>
									)}
									{showPrint &&
										transaction.status === 1 &&
										transaction.transaction_type === 'credit' && (
											<Tooltip title="Print">
												<a
													className="text-info"
													onClick={() => handlePrint(transaction)}
												>
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
							<td colSpan={!queue ? '9' : '7'}>No transactions</td>
						</tr>
					)}
				</tbody>
			</table>
			{showModal && transaction && (
				<ModalServiceDetails
					transaction={transaction}
					closeModal={() => closeModal()}
				/>
			)}
			{showTransactions && patient && (
				<ModalShowTransactions
					patient={patient}
					closeModal={() => closeModal()}
				/>
			)}
			{processTransaction && transaction && (
				<ModalApproveTransaction
					transaction={transaction}
					closeModal={() => closeModal()}
				/>
			)}
			{showPrintModal && transaction && (
				<ModalPrintTransaction
					transaction={transaction}
					closeModal={() => closeModal()}
				/>
			)}
		</>
	);
};

export default TransactionTable;
