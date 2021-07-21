/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';

import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	request,
	itemRender,
	patientname,
	formatCurrency,
	updateImmutable,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { getAllPendingTransactions } from '../../actions/paypoint';
import { loadTransactions } from '../../actions/transaction';

const ModalShowTransactions = ({ patient, closeModal }) => {
	const [loading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 12,
		totalPages: 0,
	});
	const [checked, setChecked] = useState([]);
	const [total, setTotal] = useState(0);
	const [allChecked, setAllChecked] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [paymentType, setPaymentType] = useState('');

	const dispatch = useDispatch();

	const paymentMethods = useSelector(state => state.utility.methods);
	const pendingTransactions = useSelector(
		state => state.paypoint.pendingTransactions
	);
	const allTransactions = useSelector(state => state.transaction.transactions);

	const fetchTransactions = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `transactions/pending?page=${p}&limit=12&patient_id=${patient.id}&startDate=&endDate=`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				setTransactions([...result]);
				setLoading(false);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch transactions');
				setLoading(false);
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (loading) {
			fetchTransactions();
		}
	}, [fetchTransactions, loading]);

	const onNavigatePage = nextPage => {
		fetchTransactions(nextPage);
	};

	const checkAll = e => {
		setAllChecked(false);

		let value = false;

		if (e.target.checked) {
			value = true;
			setAllChecked(true);
		}

		let checks = [];

		Array.from(document.querySelectorAll('input[name="select"]')).forEach(
			checkbox => {
				const item = document.getElementById(checkbox.id);
				item.checked = value;
				const transaction = transactions.find(
					t => t.id === parseInt(item.value, 10)
				);
				checks = e.target.checked
					? [...checks, { id: item.value, amount: transaction.amount }]
					: [];
			}
		);

		setChecked(checks);
		setTotal(
			checks.reduce((total, item) => total + parseFloat(item.amount), 0)
		);
	};

	const onChecked = e => {
		let selected = [];
		if (e.target.checked) {
			const transaction = transactions.find(
				t => t.id === parseInt(e.target.value, 10)
			);
			selected = [
				...checked,
				{ id: e.target.value, amount: transaction.amount },
			];
		} else {
			selected = checked.filter(
				c => parseInt(c.id, 10) !== parseInt(e.target.value, 10)
			);
		}

		setChecked(selected);
		setTotal(
			selected.reduce((total, item) => total + parseFloat(item.amount), 0)
		);

		if (selected.length === transactions.length) {
			setAllChecked(true);
		} else {
			setAllChecked(false);
		}
	};

	const processPayment = async () => {
		try {
			if (checked.length === 0) {
				notifyError('select transactions');
				return;
			}

			if (paymentType === '') {
				notifyError('select payment method');
				return;
			}

			setSubmitting(true);
			dispatch(startBlock());
			const data = {
				items: checked,
				patient_id: patient.id,
				payment_type: paymentType,
				amount_paid: total,
			};
			const url = 'transactions/process-bulk';
			const rs = await request(url, 'POST', true, data);
			let newTransactions = pendingTransactions;
			for (const item of rs.transactions) {
				newTransactions = [...newTransactions.filter(t => t.id !== item.id)];
			}
			dispatch(getAllPendingTransactions(newTransactions));
			let transactionsList = allTransactions;
			for (const item of rs.transactions) {
				transactionsList = updateImmutable(transactionsList, item);
			}
			dispatch(loadTransactions(transactionsList));
			setSubmitting(false);
			closeModal();
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not process transactions');
			setSubmitting(false);
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '720px' }}>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h6 className="onboarding-title">{`Transactions for ${patientname(
							patient,
							true
						)}`}</h6>
						<div className="element-box p-2">
							<div className="table-responsive">
								<div className="row">
									<div className="col-sm-12">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>
														<input
															type="checkbox"
															checked={allChecked}
															onChange={checkAll}
														/>
													</th>
													<th>DATE</th>
													<th>DEPARTMENT</th>
													<th>AMOUNT (&#x20A6;)</th>
												</tr>
											</thead>
											<tbody>
												{transactions.map((item, i) => {
													return (
														<tr key={i}>
															<td>
																<input
																	type="checkbox"
																	name="select"
																	id={`select${i}`}
																	value={item.id}
																	onChange={onChecked}
																/>
															</td>
															<td>
																{moment(item.createdAt).format(
																	'DD-MMM-YYYY h:mm a'
																)}
															</td>
															<td className="flex">
																<span className="text-capitalize">
																	{item.bill_source}
																</span>
															</td>
															<td>{formatCurrency(item.amount || 0)}</td>
														</tr>
													);
												})}
												<tr>
													<td colSpan="3" className="text-right">
														Total:
													</td>
													<td>{formatCurrency(total)}</td>
												</tr>
											</tbody>
										</table>
										{meta && (
											<div className="pagination pagination-center mt-4">
												<Pagination
													current={parseInt(meta.currentPage, 10)}
													pageSize={parseInt(meta.itemsPerPage, 10)}
													total={parseInt(meta.totalPages, 10)}
													showTotal={total => `Total ${total} transactions`}
													itemRender={itemRender}
													onChange={current => onNavigatePage(current)}
												/>
											</div>
										)}
									</div>
									<div className="col-md-12 mt-4">
										<div className="form-inline">
											<div className="form-group mr-3">
												<select
													placeholder="Select Payment Method"
													className="form-control"
													onChange={e => setPaymentType(e.target.value)}>
													<option value="">Select Payment Method</option>
													{paymentMethods.map((d, i) => (
														<option key={i} value={d.name}>
															{d.name}
														</option>
													))}
												</select>
											</div>
											<button
												onClick={() => processPayment()}
												className="btn btn-primary">
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Approve Payment'
												)}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalShowTransactions;
