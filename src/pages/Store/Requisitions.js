/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';
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
import { staffname } from '../../services/utilities';

const Requisitions = ({ category }) => {
	const [requisitions, setRequisitions] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	const loadItems = useCallback(
		async (page, q, staffId) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `inventory/requisitions?page=${p}&q=${q ||
					''}&staff_id=${staffId || ''}&category=${category || 'store'}`;
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
		[category, dispatch]
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

	const onApprove = async data => {
		try {
			dispatch(startBlock());
			const url = `inventory/requisitions/${data.id}/approve`;
			const rs = await request(url, 'PUT', true);
			updateRequisition(rs.item);
			dispatch(stopBlock());
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error, could not approve requisition');
		}
	};

	const approve = data => {
		confirmAction(
			onApprove,
			data,
			'Do you want to approve requisition?',
			'Are you sure?'
		);
	};

	const onDecline = async data => {
		try {
			dispatch(startBlock());
			const url = `inventory/requisitions/${data.id}/decline`;
			const rs = await request(url, 'PUT', true);
			updateRequisition(rs.item);
			dispatch(stopBlock());
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error, could not decline requisition');
		}
	};

	const decline = data => {
		confirmAction(
			onDecline,
			data,
			'Do you want to decline requisition?',
			'Are you sure?'
		);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<div className="table table-responsive">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Staff</th>
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
												<td>{staffname(item.staff)}</td>
												{item.category === 'store' && (
													<td>{item.store.name}</td>
												)}
												{item.category === 'cafeteria' && (
													<td>{item.cafeteria.name}</td>
												)}
												<td>{item.quantity}</td>
												<td>
													{item.deleted_at ? (
														<span className="badge badge-danger">
															cancelled
														</span>
													) : (
														<>
															{item.approved === 0 && item.declined === 0 && (
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
													{!item.deleted_at &&
														item.approved === 0 &&
														item.declined === 0 && (
															<>
																<Tooltip title="Approve Request">
																	<a
																		className="info"
																		onClick={() => approve(item)}>
																		<i className="os-icon os-icon-check-square" />
																	</a>
																</Tooltip>
																<Tooltip title="Decline Request">
																	<a
																		className="danger"
																		onClick={() => decline(item)}>
																		<i className="os-icon os-icon-x-square" />
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
											<td colSpan="6" className="text-center">
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
		</>
	);
};

export default Requisitions;
