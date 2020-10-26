/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction, request } from '../services/utilities';
import {
	getAllCafeteriaItem,
	addCafeteriaItem,
	updateCafeteriaItem,
	deleteCafeteriaItem,
} from '../actions/cafeteria';
import { addCafeteriaFile } from '../actions/general';
import { v4 as uuidv4 } from 'uuid';

const CafeteriaItems = props => {
	let dispatch = useDispatch();

	const initialState = {
		name: '',
		price: 0,
		discount_price: 0,
		description: '',
		category: '',
		category_id: '',
		item: '',
		save: true,
		edit: false,
		id: '',
		item_code: '',
	};
	let [
		{
			name,
			price,
			discount_price,
			description,
			category_id,
			category,
			item_code,
		},
		setState,
	] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [filtering, setFiltering] = useState(false);
	const [items, setItems] = useState([]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		// if (name === 'category') {
		// 	setItems(props.cafeteriaItems);
		// }
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const getAllCafeteriaItems = async () => {
		try {
			const url = `cafeteria/items`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			dispatch(props.getAllCafeteriaItem(rs));
			setLoading(false);
		} catch (error) {
			dispatch(getAllCafeteriaItem(error));
			notifyError('error fetching items');
			setLoading(false);
		}
	};

	const onAddCafeteriaItem = async e => {
		e.preventDefault();
		setLoading(true);
		item_code = `RC-${uuidv4().substring(0, 4)}`;
		let formData = {
			item_code,
			name,
			price,
			category,
			description,
			discount_price,
		};
		try {
			const url = `cafeteria/items`;
			const rs = await request(url, 'POST', true, formData);
			console.log(rs);
			dispatch(props.addCafeteriaItem(rs));
			notifySuccess('Cafeteria item added successfully');
			clearForm();
			setLoading(false);
		} catch (error) {
			notifyError('error fetching items');
			clearForm();
			setLoading(false);
		}
	};

	const clearForm = () => {
		setState({
			item_code: '',
			name: '',
			price: 0,
			category: '',
			description: '',
			discount_price: 0,
		});
	};

	const onEditCafeteriaItem = async e => {
		e.preventDefault();
		setLoading(true);
		let formData = {
			id: data.q_id,
			item_code,
			name,
			price,
			category,
			description,
			discount_price,
		};
		try {
			const url = `cafeteria/items/${data.id}`;
			const rs = await request(url, 'PATCH', true, formData);
			console.log(rs);
			dispatch(props.updateCafeteriaItem(rs));
			setSubmitButton({ save: true, edit: false });
			clearForm();
			setLoading(false);
			notifySuccess(' Cafeteria item updated');
		} catch (error) {
			setSubmitButton({ save: true, edit: false });
			clearForm();
			setLoading(false);
			notifyError('Error editing cafeteria category');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.q_name ? data.q_name : data.name,
			price: data.q_price ? data.q_price : data.price,
			id: data.q_id ? data.q_id : data.id,
			category_id: data.q_categoryId ? data.q_categoryId : category,
			description: data.q_description ? data.q_description : data.description,
			discount_price: data.q_discount_price
				? data.q_discount_price
				: data.discount_price,
			item_code: data.q_item_code ? data.q_item_code : data.item_code,
		}));
		getDataToEdit(data);
	};

	const onDeleteCafeteriaItem = async data => {
		setLoading(true);
		try {
			const url = `cafeteria/items/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			console.log(rs);
			dispatch(props.deleteCafeteriaItem(rs));
			setLoading(false);
			notifySuccess(' Cafeteria item deleted');
		} catch (error) {
			setLoading(false);
			notifyError('Error deleting cafeteria item ');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteCafeteriaItem, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	const doFilter = async () => {
		setFiltering(true);
		try {
			const rs = await request(`cafeteria/items-by-category/${category}`);
			console.log(rs);
			let filterItems = rs.map(el => {
				return {
					q_categoryId: category,
					q_createdAt: el.createdAt,
					q_createdBy: el.createdBy,
					q_description: el.description,
					q_discount_price: el.discount_price,
					q_id: el.id,
					q_isActive: el.isActive,
					q_item_code: el.item_code,
					q_lastChangedBy: null,
					q_name: el.name,
					q_price: el.price,
					q_updateAt: el.updateAt,
				};
			});

			console.log(rs, filterItems);
			await setItems(filterItems);

			setFiltering(false);
		} catch (e) {
			console.log(e);
			notifyError('Filtering not successful');
			setFiltering(false);
		}
	};

	useEffect(() => {
		console.log(props.cafeteriaItems);
	}, [props.cafeteriaItems]);

	useEffect(() => {
		getAllCafeteriaItems();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						<Link
							className="btn btn-primary btn-sm"
							to={`/cafeteria/items/category`}>
							<i className="os-icon os-icon-ui-22"></i>
							Item Category
						</Link>
						<Link className="btn btn-success btn-sm" to={`/cafeteria/items/`}>
							<i className="os-icon os-icon-grid-10"></i>
							Item
						</Link>
					</div>
					<div className="element-box-tp">
						<h6 className="element-header">Item</h6>
						<div className="row">
							<div className="col-md-7">
								<form className="row">
									<div className="form-group col-md-4">
										<label className="" htmlFor="category">
											ID
										</label>
										<select
											style={{ height: '32px' }}
											id="category"
											className="form-control"
											name="category"
											onChange={handleInputChange}>
											<option value="">Category</option>
											{props.cafeteriaCategory &&
												props.cafeteriaCategory.map((pat, i) => {
													return (
														<option key={i} value={pat.id}>
															{pat.name}
														</option>
													);
												})}
										</select>
									</div>

									{/* <div className="form-group col-md-3">
										<label className="mr-2 " htmlFor="item">
											Status
										</label>
										<select
											style={{ height: '32px' }}
											id="item"
											className="form-control"
											name="item"
											onChange={handleInputChange}>
											<option value="">Choose status</option>
											{props.cafeteriaItems.map((status, i) => {
												return (
													<option key={i} value={status.name}>
														{status.name}
													</option>
												);
											})}
										</select>
									</div> */}
									<div className="form-group col-md-4 mt-4 text-right">
										<div
											className="btn btn-sm btn-primary btn-upper text-white"
											onClick={doFilter}>
											<i className="os-icon os-icon-ui-37" />
											<span>
												{filtering ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Filter'
												)}
											</span>
										</div>
									</div>
								</form>
								<div className="row element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th className="text-center">Item code </th>
													{/* <th className="text-center">Category</th> */}
													<th className="text-center">Name</th>
													<th className="text-center">Price(&#x20A6;)</th>
													<th className="text-right">ACTIONS</th>
												</tr>
											</thead>
											<tbody>
												{props.cafeteriaItems && props.cafeteriaItems.length ? (
													<>
														{props.cafeteriaItems.map(item => {
															return (
																<tr key={item.q_item_code || item.item_code}>
																	<th className="text-center">
																		{item.q_item_code || item.item_code}
																	</th>
																	<th className="text-center">
																		{item.q_name || item.name}
																	</th>
																	<th className="text-center">
																		{item.q_price || item.price}
																	</th>
																	<th className="text-right">
																		<a className="pi-settings os-dropdown-trigger">
																			<i
																				className="os-icon os-icon-ui-49"
																				onClick={() => onClickEdit(item)}></i>
																		</a>
																		<a className="pi-settings os-dropdown-trigger text-danger">
																			<i
																				className="os-icon os-icon-ui-15"
																				onClick={() => confirmDelete(item)}></i>
																		</a>
																	</th>
																</tr>
															);
														})}
													</>
												) : (
													<span className="text-center">No user added</span>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="col-md-5">
								<div className="element-wrapper">
									<div className="element-box">
										<form
											onSubmit={
												// onAddCafeteriaItem
												edit ? onEditCafeteriaItem : onAddCafeteriaItem
											}>
											<h5 className="element-box-header">
												{edit ? 'Edit' : 'Add'} Item
											</h5>

											<div className="form-group">
												<label className="lighter">Name</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Item name"
														type="text"
														name="name"
														value={name}
														onChange={handleInputChange}
														required
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">Price</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Item name"
														type="number"
														name="price"
														value={price}
														min="0"
														onChange={handleInputChange}
														required
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">Discount Price</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Item name"
														type="number"
														name="discount_price"
														value={discount_price}
														min="0"
														onChange={handleInputChange}
														required
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">Description</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<textarea
														className="form-control"
														name="description"
														value={description}
														placeholder="Enter description"
														rows="3"
														required
														onChange={handleInputChange}></textarea>
												</div>
											</div>

											<div className="form-group">
												<label className="lighter">Category</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<select
														className="form-control"
														name="category_id"
														required
														value={category_id}
														onChange={handleInputChange}>
														<option>Select Item Category</option>
														{props.cafeteriaCategory &&
															props.cafeteriaCategory.map(cat => (
																<option key={cat.id} value={cat.id}>
																	{cat.name}
																</option>
															))}
													</select>
												</div>
											</div>

											{/* <div className="form-buttons-w text-right compact">
												<button>{item_code ? 'Edit' : 'Save'}</button>
											</div> */}

											<div className="form-buttons-w text-right compact">
												{save && (
													<>
														<button
															className={
																loading
																	? 'btn btn-primary disabled'
																	: 'btn btn-primary'
															}>
															{loading ? (
																<img src={waiting} alt="submitting" />
															) : (
																<span> save</span>
															)}
														</button>

														<button
															className="btn btn-success btn-sm"
															type="button"
															onClick={() => props.addCafeteriaFile(true)}>
															<i className="os-icon os-icon-upload"></i>
															Upload file
														</button>
													</>
												)}
												{edit && (
													<>
														<button
															className={
																loading
																	? 'btn btn-secondary ml-3 disabled'
																	: 'btn btn-secondary ml-3'
															}
															onClick={cancelEditButton}>
															<span>{loading ? 'cancel' : 'cancel'}</span>
														</button>
														<button
															className={
																loading
																	? 'btn btn-primary disabled'
																	: 'btn btn-primary'
															}>
															{loading ? (
																<img src={waiting} alt="submitting" />
															) : (
																<span> edit</span>
															)}
														</button>
													</>
												)}
											</div>
										</form>
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

const mapStateToProps = state => {
	console.log(state);
	return {
		cafeteriaCategory: state.cafeteria.cafeteriaItemCategory,
		cafeteriaItems: state.cafeteria.cafeteriaItems,
	};
};

const mapDispatchToProps = dispatch => ({
	getAllCafeteriaItem: itemData => dispatch(getAllCafeteriaItem(itemData)),
	addCafeteriaItem: itemData => dispatch(addCafeteriaItem(itemData)),
	updateCafeteriaItem: index => dispatch(updateCafeteriaItem(index)),
	deleteCafeteriaItem: index => dispatch(deleteCafeteriaItem(index)),
	addCafeteriaFile: () => dispatch(addCafeteriaFile()),
});

// export default withRouter(CafeteriaItems);
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CafeteriaItems)
);
