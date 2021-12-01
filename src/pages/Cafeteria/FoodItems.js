/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';

import {
	request,
	itemRender,
	updateImmutable,
	confirmAction,
} from '../../services/utilities';
import { cafeteriaAPI, paginate } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

const FoodItems = () => {
	const initialState = {
		name: '',
		description: '',
		edit: false,
		create: true,
	};
	const [{ name, description }, setState] = useState(initialState);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });

	const dispatch = useDispatch();

	const fetchItems = useCallback(async page => {
		try {
			const p = page || 1;
			const url = `${cafeteriaAPI}/food-items?page=${p}&limit=20`;
			const rs = await request(url, 'GET', true);
			const { result, ...pagination } = rs;
			setMeta(pagination);
			setItems(result);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchItems();
			setLoaded(true);
		}
	}, [fetchItems, loaded]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onCreateItem = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const info = { name, description };
			const rs = await request(
				`${cafeteriaAPI}/food-items`,
				'POST',
				true,
				info
			);
			setItems([rs, ...items]);
			dispatch(stopBlock());
			setState({ ...initialState });
			notifySuccess('Food item added');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error creating food item');
		}
	};

	const onEditItem = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const info = { name, description };
			const url = `${cafeteriaAPI}/food-items/${data.id}`;
			const rs = await request(url, 'PUT', true, info);
			setItems([...updateImmutable(items, rs)]);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			dispatch(stopBlock());
			notifySuccess('Food item updated');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error updating food item');
		}
	};

	// eslint-disable-next-line no-unused-vars
	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			description: data.description,
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
			const url = `${cafeteriaAPI}/food-items/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			setItems([...items.filter(i => i.id !== rs.id)]);
			dispatch(stopBlock());
			notifySuccess('Food item deleted');
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error deleting food item');
		}
	};

	// eslint-disable-next-line no-unused-vars
	const confirmDelete = data => {
		confirmAction(onDeleteItem, data);
	};

	const onNavigatePage = async pageNumber => {
		await fetchItems(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="row">
			<div className="col-lg-9">
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
											<th>Description</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{items.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.name}</td>
													<td>{item.description}</td>
												</tr>
											);
										})}
										{loaded && items.length === 0 && (
											<tr>
												<td colSpan="5" className="text-center">
													No Items
												</td>
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
			<div className="col-lg-3">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditItem : onCreateItem}>
						<h6 className="form-header">
							{edit ? 'Edit Food Item' : 'Add Food Item'}
						</h6>
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

export default FoodItems;
