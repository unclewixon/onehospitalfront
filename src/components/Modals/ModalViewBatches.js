/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError } from '../../services/notify';
import {
	formatDate,
	request,
	formatCurrency,
	itemRender,
	updateImmutable,
} from '../../services/utilities';
import ModalEditBatch from './ModalEditBatch';
import ModalUpdateQty from './ModalUpdateQty';
import ModalNewBatch from './ModalNewBatch';

const ModalViewBatches = ({ closeModal, drug }) => {
	const [loaded, setLoaded] = useState(false);
	const [batches, setBatches] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [batch, setBatch] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [newBatch, setNewBatch] = useState(false);
	const [showQuantity, setShowQuantity] = useState(false);

	const dispatch = useDispatch();

	const fetchBatches = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `inventory/batches?page=${p}&limit=10&drug_id=${drug.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				setBatches(result);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('Error fetching batches');
				dispatch(stopBlock());
			}
		},
		[dispatch, drug]
	);

	useEffect(() => {
		if (!loaded) {
			fetchBatches();
			setLoaded(true);
		}
	}, [fetchBatches, loaded]);

	const updateBatch = data => {
		const items = updateImmutable(batches, data);
		setBatches(items);
	};

	const onNavigatePage = async nextPage => {
		await fetchBatches(nextPage);
	};

	const edit = item => {
		setBatch(item);
		setShowModal(true);
	};

	const updateQuantity = item => {
		setBatch(item);
		setShowQuantity(true);
	};

	const addBatch = () => {
		setNewBatch(true);
	};

	const closeBatchModal = () => {
		setNewBatch(false);
		setShowModal(false);
		setShowQuantity(false);
		setBatch(null);
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-lg modal-centered">
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Drug Batch</h4>
						<div className="onboarding-text alert-custom mb-3">
							<div className="text-center">{drug.name}</div>
							<div>
								<Tooltip title="Update Quantity">
									<a className="primary" onClick={() => addBatch()}>
										<i className="os-icon os-icon-plus-circle" /> Add Batch
									</a>
								</Tooltip>
							</div>
						</div>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>Name</th>
												<th>Quantity</th>
												<th>Unit Price</th>
												<th>Expiration</th>
												<th>Vendor</th>
												<th>Date Added</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{batches.map((item, i) => {
												const low =
													item.quantity === 0 ? 'out of stock' : 'low';
												const lowBadge =
													item.quantity === 0
														? 'badge-danger'
														: 'badge-warning';
												return (
													<tr key={i}>
														<td>{item.name || '--'}</td>
														<td>{item.quantity}</td>
														<td>{formatCurrency(item.unitPrice)}</td>
														<td>
															{formatDate(item.expirationDate, 'DD-MMM-YYYY')}
														</td>
														<td>{item.vendor?.name || '--'}</td>
														<td>
															{formatDate(item.createdAt, 'DD-MMM-YYYY h:mma')}
														</td>
														<td>
															<span
																className={`badge ${
																	item.quantity < 10
																		? lowBadge
																		: 'badge-success'
																}`}>
																{item.quantity < 10 ? low : 'good'}
															</span>
														</td>
														<td className="row-actions">
															<Tooltip title="Edit Batch">
																<a
																	className="secondary"
																	onClick={() => edit(item)}>
																	<i className="os-icon os-icon-ui-49" />
																</a>
															</Tooltip>
															<Tooltip title="Update Quantity">
																<a
																	className="info"
																	onClick={() => updateQuantity(item)}>
																	<i className="os-icon os-icon-plus-circle" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>

									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} batches`}
												itemRender={itemRender}
												onChange={current => onNavigatePage(current)}
												showSizeChanger={false}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && batch && (
				<ModalEditBatch
					closeModal={() => closeBatchModal()}
					updateBatch={updateBatch}
					batch={batch}
				/>
			)}
			{showQuantity && batch && (
				<ModalUpdateQty
					item={batch}
					category="batches"
					closeModal={() => closeBatchModal()}
					updateItem={updateBatch}
				/>
			)}
			{newBatch && (
				<ModalNewBatch
					closeModal={() => closeBatchModal()}
					addBatch={batch => setBatches([...batches, batch])}
					drug={drug}
				/>
			)}
		</div>
	);
};

export default ModalViewBatches;
