/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender, patientname } from '../../services/utilities';
import TableLoading from '../TableLoading';
import PatientBillItem from '../PatientBillItem';

const DischargeForm = ({ saveNote, doDischarge }) => {
	return (
		<>
			<div className="col-sm-12 mt-2">
				<div className="form-group">
					<label>Discharge note</label>
					<textarea
						className="form-control"
						name="discharge_note"
						rows="3"
						placeholder="Enter discharge note"
						onChange={saveNote}
					></textarea>
				</div>
			</div>
			<div className="col-md-12 mt-4">
				<div className="form-inline" style={{ justifyContent: 'center' }}>
					<button onClick={doDischarge} className="btn btn-primary">
						Discharge Patient
					</button>
				</div>
			</div>
		</>
	);
};

const ModalFinishDischarge = ({
	admissionId,
	nicuId,
	finishDischarge,
	closeModal,
	type,
	patient,
}) => {
	const [loading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 6,
		totalPages: 0,
	});
	const [note, setNote] = useState('');
	const [total, setTotal] = useState(0);

	const dispatch = useDispatch();

	const itemId = type === 'nicu' ? nicuId : admissionId;

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
				setLoading(false);
				dispatch(stopBlock());
				setTotal(
					all.reduce(
						(total, item) => total + Math.abs(parseFloat(item.amount)),
						0
					)
				);
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
														<th>DATE</th>
														<th>Service</th>
														<th>AMOUNT (&#x20A6;)</th>
													</tr>
												</thead>
												<tbody>
													<PatientBillItem
														transactions={transactions}
														total={total}
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
										<DischargeForm
											saveNote={e => setNote(e.target.value)}
											doDischarge={() =>
												finishDischarge(itemId, { note }, type)
											}
										/>
									</div>
								</div>
							)}
							{!loading && transactions.length === 0 && (
								<div className="table-responsive">
									<div className="row">
										<div className="col-sm-12">
											<div>No Transactions Pending!</div>
										</div>
										<DischargeForm
											saveNote={e => setNote(e.target.value)}
											doDischarge={() =>
												finishDischarge(itemId, { note }, type)
											}
										/>
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

export default ModalFinishDischarge;
