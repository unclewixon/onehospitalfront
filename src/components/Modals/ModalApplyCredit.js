import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	request,
	itemRender,
	patientname,
	formatCurrency,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import TableLoading from '../TableLoading';
import PatientBillItem from '../PatientBillItem';

const ModalApplyCredit = ({ closeModal, patient, refresh, depositBalance }) => {
	const [loading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [checked, setChecked] = useState([]);
	const [total, setTotal] = useState(0);
	const [allChecked, setAllChecked] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [items, setItems] = useState([]);

	const dispatch = useDispatch();

	const fetchTransactions = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `transactions/pending?page=${p}&limit=10&patient_id=${patient.id}&startDate=&endDate=&fetch=1`;
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

			setChecked(checks);
			setTotal(
				checks.reduce(
					(total, item) => total + Math.abs(parseFloat(item.amount)),
					0
				)
			);
		} else {
			setChecked(checks);
			setTotal(0);
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

		setChecked(selected);
		setTotal(
			selected.reduce(
				(total, item) => total + Math.abs(parseFloat(item.amount)),
				0
			)
		);

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

			const amount_remaining = depositBalance - total;
			if (amount_remaining < 0) {
				notifyError('insufficient credit!');
				return;
			}

			setSubmitting(true);
			dispatch(startBlock());
			const data = {
				items: checked,
				patient_id: patient.id,
				payment_method: 'Credit',
				amount_paid: total,
			};
			const url = 'transactions/process-credit';
			await request(url, 'POST', true, data);
			setSubmitting(false);
			dispatch(stopBlock());
			refresh();
			closeModal();
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
													<tr>
														<td colSpan="3" className="text-right">
															Credit:
														</td>
														<td>{formatCurrency(depositBalance)}</td>
													</tr>
													<tr>
														<td colSpan="3" className="text-right">
															<strong>Balance:</strong>
														</td>
														<td>
															<strong>
																{formatCurrency(depositBalance - total)}
															</strong>
														</td>
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
														showSizeChanger={false}
													/>
												</div>
											)}
										</div>
										<div className="col-md-12 mt-4">
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

export default ModalApplyCredit;
