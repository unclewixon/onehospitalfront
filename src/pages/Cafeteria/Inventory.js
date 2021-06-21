/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import {
	request,
	itemRender,
	formatCurrency,
	updateImmutable,
	confirmAction,
} from '../../services/utilities';
import { cafeteriaAPI, paginate } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

const Inventory = () => {
	const initialState = {
		name: '',
		description: '',
		price: '',
		quantity: '',
		edit: false,
		create: true,
	};
	const [{ name, description, price, quantity }, setState] = useState(
		initialState
	);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });

	const dispatch = useDispatch();

	const fetchInventories = useCallback(async page => {
		try {
			const p = page || 1;
			const url = `${cafeteriaAPI}/items?page=${p}&limit=20`;
			const rs = await request(url, 'GET', true);
			const { result, ...paginattion } = rs;
			setMeta(paginattion);
			setItems(result);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchInventories();
			setLoaded(true);
		}
	}, [fetchInventories, loaded]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onCreateItem = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const info = { name, description, price, quantity };
			const rs = await request(`${cafeteriaAPI}/items`, 'POST', true, info);
			setItems([rs, ...items]);
			dispatch(stopBlock());
			setState({ ...initialState });
			notifySuccess('Inventory item created');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error creating inventory item');
		}
	};

	const onEditItem = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const info = { name, description, price, quantity };
			const url = `${cafeteriaAPI}/items/${data.id}`;
			const rs = await request(url, 'PUT', true, info);
			setItems([...updateImmutable(items, rs)]);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			dispatch(stopBlock());
			notifySuccess('Inventory item updated');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error updating inventory item');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			description: data.description,
			price: data.price,
			quantity: data.quantity,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
	};

	const onDeleteItem = async data => {
		try {
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/items/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			setItems([...items.filter(i => i.id !== rs.id)]);
			dispatch(stopBlock());
			notifySuccess('Inventory item deleted');
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error deleting inventory item');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteItem, data);
	};

	const onNavigatePage = async pageNumber => {
		await fetchInventories(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="element-box p-3 m-0">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<div className="table-responsive">
								<table className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>Name</th>
											<th>Amount</th>
											<th>Description</th>
											<th>Quantity</th>
											<th>Date</th>
											<th>
												<div></div>
											</th>
										</tr>
									</thead>
									<tbody>
										{items.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.name}</td>
													<td>{formatCurrency(item.price)}</td>
													<td>{item.description}</td>
													<td>{item.quantity}</td>
													<td>
														{moment(item.createdAt).format('DD-MM-YYYY h:mm a')}
													</td>
													<td className="row-actions">
														<Tooltip title="Edit Item">
															<a
																className="secondary"
																onClick={() => onClickEdit(item)}>
																<i className="os-icon os-icon-edit-32" />
															</a>
														</Tooltip>
														<Tooltip title="Delete Item">
															<a
																className="danger"
																onClick={() => confirmDelete(item)}>
																<i className="os-icon os-icon-ui-15" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
										{loaded && items.length === 0 && (
											<tr>
												<td colSpan="6">No Items</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} items`}
									itemRender={itemRender}
									onChange={onNavigatePage}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<div className="col-lg-4">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditItem : onCreateItem}>
						<h6 className="form-header">Create Item</h6>
						<div className="form-group mt-2">
							<input
								className="form-control"
								placeholder="Item name"
								type="text"
								name="name"
								onChange={handleInputChange}
								value={name}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Item description"
								type="text"
								name="description"
								onChange={handleInputChange}
								value={description}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Item price"
								type="text"
								name="price"
								onChange={handleInputChange}
								value={price}
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Item quantity"
								type="text"
								name="quantity"
								onChange={handleInputChange}
								value={quantity}
							/>
						</div>

						<div className="form-buttons-w">
							{create && (
								<button className="btn btn-primary">
									<span>create</span>
								</button>
							)}
							{edit && (
								<>
									<button
										className="btn btn-secondary ml-3"
										onClick={cancelEditButton}>
										<span>cancel</span>
									</button>
									<button className="btn btn-primary">
										<span>edit</span>
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Inventory;
