/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender, patientname } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { loadTransactions } from '../../actions/transaction';
import TableLoading from '../TableLoading';
import PatientBillItem from '../PatientBillItem';

const ModalShowTransactions = ({ patient, closeModal }) => {
	const [loading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 6,
		totalPages: 0,
	});
	const [checked, setChecked] = useState([]);
	const [total, setTotal] = useState(0);
	const [allChecked, setAllChecked] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('');
	const [items, setItems] = useState([]);
	const [amountPaid, setAmountPaid] = useState(0);

	const dispatch = useDispatch();

	const paymentMethods = useSelector(state => state.utility.methods);
	const allTransactions = useSelector(state => state.transaction.transactions);

	const fetchTransactions = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `transactions/pending?page=${p}&limit=6&patient_id=${patient.id}&startDate=&endDate=&fetch=1`;
				const rs = await request(url, 'GET', true);
				const { result, all, ...meta } = rs;
				setMeta(meta);
				setTransactions([...result]);
				setItems([...all]);
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

		let checks = [];
		if (e.target.checked) {
			setAllChecked(true);

			for (const item of items) {
				checks = [...checks, { id: item.id, amount: item.amount }];
			}

			const total = checks.reduce(
				(total, item) => total + Math.abs(parseFloat(item.amount)),
				0
			);

			setChecked(checks);
			setTotal(total);
			setAmountPaid(total);
		} else {
			setChecked(checks);
			setTotal(0);
			setAmountPaid(0);
		}
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

		const total = selected.reduce(
			(total, item) => total + Math.abs(parseFloat(item.amount)),
			0
		);

		setChecked(selected);
		setTotal(total);
		setAmountPaid(total);

		if (selected.length === items.length) {
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

			if (paymentMethod === '') {
				notifyError('select payment method');
				return;
			}

			if (amountPaid === 0) {
				notifyError('select one transaction to make payment');
				return;
			}

			setSubmitting(true);
			dispatch(startBlock());
			const data = {
				items: checked,
				patient_id: patient.id,
				payment_method: paymentMethod,
				amount_paid: amountPaid,
			};
			const url = 'transactions/process-bulk';
			const rs = await request(url, 'POST', true, data);
			let newTransactions = allTransactions;
			for (const item of rs.transactions) {
				newTransactions = [...newTransactions.filter(t => t.id !== item.id)];
			}
			if (rs.balancePayment) {
				dispatch(loadTransactions([rs.balancePayment, ...newTransactions]));
			} else {
				dispatch(loadTransactions(newTransactions));
			}

			setSubmitting(false);
			closeModal();
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not process transactions');
			setSubmitting(false);
		}
	};

	const printModal = async () => {
		try {
			dispatch(startBlock());
			const uri = `transactions/print?patient_id=${patient.id}&status=pending`;
			const rs = await request(uri, 'GET', true);
			dispatch(stopBlock());
			if (rs.success) {
				setTimeout(() => {
					window.open(rs.url, '_blank').focus();
				}, 200);
			} else {
				notifyError(rs.message || 'could not print transactions');
			}
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not print transactions');
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '720px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h6 className="onboarding-title">{`Transactions for ${patientname(
							patient,
							true
						)}`}</h6>
						<div className="element-box p-2">
							{loading && <TableLoading />}
							{!loading && transactions.length > 0 && (
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
														<th>Service</th>
														<th>AMOUNT (&#x20A6;)</th>
													</tr>
												</thead>
												<tbody>
													<PatientBillItem
														transactions={transactions}
														checked={checked}
														onChecked={onChecked}
														total={total}
														hasChecked={true}
													/>
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
														showSizeChanger={false}
													/>
												</div>
											)}
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-md-12">
											<div
												className="form-inline"
												style={{ justifyContent: 'center' }}
											>
												<label
													className="form-group my-1 mr-2"
													htmlFor="amount"
												>
													Amount
												</label>
												<div className="form-group my-1 mr-sm-2">
													<input
														id="amount"
														type="text"
														className="form-control"
														placeholder="Enter Amount"
														value={amountPaid > 0 ? amountPaid : total}
														onChange={e => setAmountPaid(e.target.value)}
													/>
												</div>
												<div className="form-group mr-3">
													<select
														placeholder="Select Payment Method"
														className="form-control"
														onChange={e => setPaymentMethod(e.target.value)}
													>
														<option value="">Select Payment Method</option>
														{paymentMethods
															.filter(p => p.name !== 'Voucher')
															.map((d, i) => (
																<option key={i} value={d.name}>
																	{d.name}
																</option>
															))}
													</select>
												</div>
												<button
													onClick={() => processPayment()}
													className="btn btn-primary"
												>
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														'Approve Payment'
													)}
												</button>
												<Tooltip title="Print">
													<button
														className="btn btn-success ml-3"
														onClick={printModal}
													>
														<i className="fa fa-print"></i>
													</button>
												</Tooltip>
											</div>
										</div>
									</div>
								</div>
							)}
							{!loading && transactions.length === 0 && (
								<div className="table-responsive">
									<div className="row">
										<div className="col-sm-12">
											<div>No Transactions Pending!</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalShowTransactions;
