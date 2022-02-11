/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { paginate } from '../../services/constants';
import {
	itemRender,
	updateImmutable,
	formatCurrency,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import ModalEditItem from '../../components/Modals/ModalEditItem';
import ModalUpdateQty from '../../components/Modals/ModalUpdateQty';
import { messageService } from '../../services/message';

const Inventory = () => {
	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState('');
	const [hasSearched, setHasSearched] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [qtyModal, setQtyModal] = useState(false);
	const [item, setItem] = useState(null);

	const dispatch = useDispatch();

	const loadItems = useCallback(
		async (page, q) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `inventory/stores?page=${p}&q=${q || ''}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setItems(result);
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError('Error while fetching items');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			loadItems();
		}
	}, [loadItems, loaded]);

	const onNavigatePage = async nextPage => {
		await loadItems(nextPage);
	};

	const filterEntries = async () => {
		await loadItems(1, search);
	};

	const updateItem = item => {
		const data = updateImmutable(items, item);
		setItems(data);
	};

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			setItems([...items, message.text]);
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const editItem = item => {
		document.body.classList.add('modal-open');
		setItem(item);
		setEditModal(true);
	};

	const updateQuantity = item => {
		document.body.classList.add('modal-open');
		setItem(item);
		setQtyModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setEditModal(false);
		setQtyModal(false);
		setItem(null);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-4">
						<label className="mr-2">Search</label>
						<input
							style={{ height: '32px' }}
							id="search"
							className="form-control"
							name="search"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<div className="form-group col-md-4 mt-4">
						<a
							className="btn btn-sm btn-primary btn-upper text-white"
							onClick={() => {
								setHasSearched(true);
								filterEntries();
							}}>
							<i className="os-icon os-icon-ui-37" />
							<span>Filter</span>
						</a>
						{hasSearched && (
							<a
								className="btn btn-sm btn-secondary btn-upper text-white"
								onClick={async () => {
									setHasSearched(false);
									setSearch('');
									await loadItems(1, '');
								}}>
								<i className="os-icon os-icon-close" />
							</a>
						)}
					</div>
				</form>
			</div>
			<div className="element-box m-0 mb-4 p-3">
				<div className="table table-responsive">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Name</th>
										<th>Quantity</th>
										<th>Unit Of Measure</th>
										<th>Unit Cost</th>
										<th>Stock Level</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, index) => {
										const low = item.quantity === 0 ? 'out of stock' : 'low';
										const lowBadge =
											item.quantity === 0 ? 'badge-danger' : 'badge-warning';
										return (
											<tr key={index}>
												<td>{item.name}</td>
												<td>{item.quantity}</td>
												<td>{item.unitOfMeasure}</td>
												<td>{formatCurrency(item.unitPrice)}</td>
												<td>
													<span
														className={`badge ${
															item.quantity < 10 ? lowBadge : 'badge-success'
														}`}>
														{item.quantity < 10 ? low : 'good'}
													</span>
												</td>
												<td className="row-actions">
													<Tooltip title="Edit Item">
														<a className="info" onClick={() => editItem(item)}>
															<i className="os-icon os-icon-ui-49" />
														</a>
													</Tooltip>
													<Tooltip title="Update Quantity">
														<a
															className="secondary"
															onClick={() => updateQuantity(item)}>
															<i className="os-icon os-icon-plus-circle" />
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})}
									{items.length === 0 && (
										<tr>
											<td colSpan="5" className="text-center">
												No items found
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
										showTotal={total => `Total ${total} items`}
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
			{editModal && item && (
				<ModalEditItem
					item={item}
					category="stores"
					closeModal={() => closeModal()}
					updateItem={updateItem}
				/>
			)}
			{qtyModal && item && (
				<ModalUpdateQty
					item={item}
					category="stores"
					closeModal={() => closeModal()}
					updateItem={updateItem}
				/>
			)}
		</>
	);
};

export default Inventory;
