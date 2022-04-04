/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { paginate } from '../../services/constants';
import {
	itemRender,
	updateImmutable,
	confirmAction,
	formatDate,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import ModalMakeRequisition from '../../components/Modals/ModalMakeRequisition';
import ModalEditRequisition from '../../components/Modals/ModalEditRequisition';

const Requisitions = () => {
	const [requisitions, setRequisitions] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [loaded, setLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [item, setItem] = useState(null);

	const staff = useSelector(state => state.user.profile.details);

	const dispatch = useDispatch();

	const loadItems = useCallback(
		async (page, q) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `inventory/requisitions?page=${p}&q=${q || ''}&staff_id=${
					staff.id
				}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setRequisitions(result);
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError('Error while fetching requisitions');
			}
		},
		[dispatch, staff]
	);

	const updateRequisition = item => {
		const data = updateImmutable(requisitions, item);
		setRequisitions(data);
	};

	useEffect(() => {
		if (!loaded) {
			loadItems();
		}
	}, [loadItems, loaded]);

	const onNavigatePage = async nextPage => {
		await loadItems(nextPage);
	};

	const makeRequest = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const edit = item => {
		document.body.classList.add('modal-open');
		setItem(item);
		setShowEditModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowEditModal(false);
		setItem(null);
	};

	const onCancel = async data => {
		try {
			dispatch(startBlock());
			const url = `inventory/requisitions/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			updateRequisition(rs);
			dispatch(stopBlock());
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error, could not cancel requisition');
		}
	};

	const cancel = data => {
		confirmAction(
			onCancel,
			data,
			'Do you want to cancel requisition?',
			'Are you sure?'
		);
	};

	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<a
							className="btn btn-primary btn-sm text-white"
							onClick={() => makeRequest()}
						>
							<i className="os-icon os-icon-ui-22" />
							<span>Make Requisition</span>
						</a>
					</div>
					<h6 className="element-header">Requisitions</h6>
					<div className="element-box m-0 p-3">
						<div className="table-responsive">
							{!loaded ? (
								<TableLoading />
							) : (
								<>
									<table className="table table-striped">
										<thead>
											<tr>
												<th>Date</th>
												<th>Name</th>
												<th>Quantity</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{requisitions.map((item, i) => {
												return (
													<tr key={i}>
														<td>
															{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}
														</td>
														{item.category === 'store' && (
															<td>{item.store.name}</td>
														)}
														{item.category === 'cafeteria' && (
															<td>{item.cafeteria.name}</td>
														)}
														<td>{item.quantity}</td>
														<td>
															{item.deletedBy ? (
																<span className="badge badge-danger">
																	cancelled
																</span>
															) : (
																<>
																	{item.approved === 0 &&
																		item.declined === 0 && (
																			<span className="badge badge-secondary">
																				pending
																			</span>
																		)}
																	{item.approved === 1 && (
																		<span className="badge badge-success">
																			approved
																		</span>
																	)}
																	{item.declined === 1 && (
																		<span className="badge badge-danger">
																			declined
																		</span>
																	)}
																</>
															)}
														</td>
														<td className="row-actions">
															{!item.deletedBy &&
																item.approved === 0 &&
																item.declined === 0 && (
																	<>
																		<Tooltip title="Edit Request">
																			<a
																				className="info"
																				onClick={() => edit(item)}
																			>
																				<i className="os-icon os-icon-ui-49" />
																			</a>
																		</Tooltip>
																		<Tooltip title="Cancel Request">
																			<a
																				className="danger"
																				onClick={() => cancel(item)}
																			>
																				<i className="os-icon os-icon-ui-15" />
																			</a>
																		</Tooltip>
																	</>
																)}
														</td>
													</tr>
												);
											})}
											{requisitions.length === 0 && (
												<tr>
													<td colSpan="5" className="text-center">
														No requisitions found!
													</td>
												</tr>
											)}
										</tbody>
									</table>
									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} requisitions`}
												itemRender={itemRender}
												onChange={current => onNavigatePage(current)}
												showSizeChanger={false}
											/>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<ModalMakeRequisition
					closeModal={() => closeModal()}
					addRequisition={data => setRequisitions([...requisitions, data])}
				/>
			)}
			{showEditModal && item && (
				<ModalEditRequisition
					requisition={item}
					closeModal={() => closeModal()}
					updateRequisition={updateRequisition}
				/>
			)}
		</div>
	);
};

export default Requisitions;
