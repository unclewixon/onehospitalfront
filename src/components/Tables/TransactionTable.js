/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { request } from '../../services/utilities';
import { confirmAction, formatCurrency } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
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
	loading,
	queue,
	showPrint = false,
	showActionBtns,
	columns,
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
						{!queue && <th>DATE</th>}
						<th>PATIENT NAME</th>
						<th>DEPARTMENT</th>
						<th>AMOUNT</th>
						<th>BALANCE (&#x20A6;)</th>
						<th>PAYMENT TYPE (&#x20A6;)</th>
						<th className="text-center">ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{loading && (
						<tr>
							<td colSpan={columns} className="text-center">
								<img alt="searching" src={searchingGIF} />
							</td>
						</tr>
					)}
					{transactions.map((transaction, index) => {
						return (
							<tr key={index}>
								<td hidden={queue}>
									{moment(transaction.createdAt).format('DD-MM-YYYY H:mma')}
								</td>
								<td>
									{`${transaction.patient?.other_names} ${transaction.patient?.surname}`}
								</td>
								<td className="flex">
									<span className="text-capitalize">
										{transaction.transaction_type}
									</span>
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
								</td>
								<td>
									{formatCurrency(transaction.amount ? transaction.amount : 0)}
								</td>
								<td>
									{formatCurrency(
										transaction?.balance ? transaction.balance : 0
									)}
								</td>
								<td>
									{transaction.payment_type
										? transaction.payment_type
										: 'Not specified'}
								</td>
								<td className="text-center row-actions">
									{showActionBtns && transaction.status === 0 && (
										<>
											{transaction.payment_type !== 'HMO' && (
												<>
													<Tooltip title="Approve Transactions">
														<a
															className="secondary"
															onClick={() => doApproveTransaction(transaction)}>
															<i className="os-icon os-icon-thumbs-up" />
														</a>
													</Tooltip>
												</>
											)}
											<Can I="delete-transaction" on="all">
												<Tooltip title="Delete Transactions">
													<a
														className="text-danger"
														onClick={() => confirmDelete(transaction)}>
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</Can>
										</>
									)}
									{showPrint ? (
										<Tooltip title="Print">
											<a
												className="text-info"
												onClick={e => handlePrint(e, transaction)}>
												<i className="os-icon os-icon-printer" />
											</a>
										</Tooltip>
									) : null}
								</td>
							</tr>
						);
					})}
					{transactions.length === 0 && (
						<tr className="text-center">
							<td colSpan={queue ? 6 : 7}>No transactions</td>
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
