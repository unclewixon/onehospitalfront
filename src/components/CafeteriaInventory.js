/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction, request } from '../services/utilities';

import {
	getAllCafeteriaInvCategory,
	addCafeteriaInventory,
	getAllCafeteriaInventory,
	updateCafeteriaInventory,
	deleteCafeteriaInventory,
} from '../actions/inventory';
import { addCafeteriaFile } from '../actions/general';

const CafeteriaInventory = props => {
	const initialState = {
		name: '',
		cost_price: 0,
		quantity: 0,
		description: '',
		category: '',
		category_id: '',
		item: '',
		save: true,
		edit: false,
		id: '',
		stock_code: '',
	};
	const [
		{
			name,
			cost_price,
			quantity,
			description,
			category_id,
			category,
			item,
			stock_code,
		},
		setState,
	] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [items, setItems] = useState([]);
	const [catName, setCatName] = useState('');

	const handleInputChange = e => {
		const { name, value } = e.target;
		if (name === 'category') {
			setItems(props.cafeteriaInventory);
		}
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddCafeteriaInventory = e => {
		e.preventDefault();
		setLoading(true);

		props
			.addCafeteriaInventory({
				name,
				cost_price,
				category_id,
				description,
				quantity,
				stock_code,
			})
			.then(response => {
				setLoading(false);
				setState({ ...initialState });
				notifySuccess('Cafeteria inventory added');
			})
			.catch(error => {
				setLoading(false);
				notifyError('Error creating cafeteria inventory');
			});
	};

	const onEditCafeteriaInventory = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateCafeteriaInventory({
				id: data.id,
				name,
				cost_price,
				quantity,
				description,
				category_id,
				stock_code,
			})
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifySuccess(' Cafeteria inventory updated');
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifyError('Error editing cafeteria inventory');
			});
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			cost_price: data.cost_price,
			id: data.id,
			category_id: category ? category : data.category.id,
			description: data.description,
			quantity: data.quantity,
			stock_code: data.stock_code,
		}));
		getDataToEdit(data);
	};

	const onDeleteCafeteriaInventory = data => {
		props
			.deleteCafeteriaInventory(data)
			.then(data => {
				setLoading(false);
				notifySuccess(' Cafeteria inventory deleted');
			})
			.catch(error => {
				setLoading(false);
				notifyError('Error deleting cafeteria inventory');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteCafeteriaInventory, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};
	const doFilter = async () => {
		setFiltering(true);
		try {
			const rs = await request(`cafeteria/inventories-by-category/${category}`);
			console.log(rs);
			let cat = props.cafeteriaInvCategory.find(el => el.id === category);
			console.log(cat);
			await setCatName(cat.name);
			await setItems(rs);

			setFiltering(false);
		} catch (e) {
			notifyError('Filtering not successful');
			setFiltering(false);
		}
		setFiltering(false);
	};

	useEffect(() => {
		if (!loaded) {
			props
				.getAllCafeteriaInvCategory()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(
						e.message || 'could not fetch cafeteria inventory category'
					);
				});
		}
		setLoaded(true);
		// console.log(props.cafeteriaInventory);
	}, [edit, loaded, props, save]);

	useEffect(() => {
		if (!loaded) {
			props
				.getAllCafeteriaInventory()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch cafeteria inventory');
				});
		}
		setLoaded(true);
		setItems(props.cafeteriaInventory);
	}, [edit, loaded, props, save]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						<Link
							className="btn btn-primary btn-sm"
							to={`/cafeteria/inventory/category`}>
							<i className="os-icon os-icon-ui-22"></i>
							Inventory Category
						</Link>
						<Link
							className="btn btn-success btn-sm"
							to={`/cafeteria/inventory/`}>
							<i className="os-icon os-icon-grid-10"></i>
							Inventory
						</Link>
					</div>

					<div className="element-box-tp">
						<h6 className="element-header">Inventory</h6>
						<div className="row">
							<div className="col-md-7">
								<form className="row">
									<div className="form-group col-md-4">
										<label className="" htmlFor="category">
											Category
										</label>
										<select
											style={{ height: '32px' }}
											id="category"
											className="form-control"
											name="category"
											onChange={handleInputChange}>
											<option value="">Category</option>
											{props.cafeteriaInvCategory &&
												props.cafeteriaInvCategory.map((pat, i) => {
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
											Name
										</label>
										<select
											style={{ height: '32px' }}
											id="item"
											className="form-control"
											name="item"
											onChange={handleInputChange}>
											<option value="">Choose status</option>
											{props.cafeteriaInventory.map((status, i) => {
												return (
													<option key={i} value={status.name}>
														{status.name}
													</option>
												);
											})}
										</select>
									</div> */}
									<div className="form-group col-md-4"></div>
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
													<th className="text-center">Stock code </th>
													<th className="text-center">Category</th>
													<th className="text-center">Name</th>
													<th className="text-center">Cost Price(&#x20A6;)</th>
													<th className="text-center">Quantity</th>
													<th className="text-right">ACTIONS</th>
												</tr>
											</thead>
											<tbody>
												{!dataLoaded ? (
													<tr>
														<td colSpan="6" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : (
													<>
														{items &&
															items.map(item => {
																return (
																	<tr key={item.stock_code}>
																		<th className="text-center">
																			{item.stock_code}
																		</th>
																		<th className="text-center">
																			{item.category
																				? item.category.name
																				: catName}
																		</th>
																		<th className="text-center">{item.name}</th>
																		<th className="text-center">
																			{item.cost_price}
																		</th>
																		<th className="text-center">
																			{item.quantity}
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
																					onClick={() =>
																						confirmDelete(item)
																					}></i>
																			</a>
																		</th>
																	</tr>
																);
															})}
													</>
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
												edit
													? onEditCafeteriaInventory
													: onAddCafeteriaInventory
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
												<label className="lighter">Cost Price</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Cost Price"
														type="number"
														name="cost_price"
														value={cost_price}
														min="0"
														onChange={handleInputChange}
														required
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">Quantity</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Quantity"
														type="number"
														name="quantity"
														value={quantity}
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
														value={category_id}
														onChange={handleInputChange}>
														<option>Select Item Category</option>
														{props.cafeteriaInvCategory &&
															props.cafeteriaInvCategory.map(cat => (
																<option key={cat.id} value={cat.id}>
																	{cat.name}
																</option>
															))}
													</select>
												</div>
											</div>

											<div className="form-buttons-w text-right compact">
												{save && (
													<>
														<button
															className={
																Loading
																	? 'btn btn-primary disabled'
																	: 'btn btn-primary'
															}>
															{Loading ? (
																<img src={waiting} alt="submitting" />
															) : (
																<span> save</span>
															)}
														</button>
													</>
												)}
												{edit && (
													<>
														<button
															className={
																Loading
																	? 'btn btn-secondary ml-3 disabled'
																	: 'btn btn-secondary ml-3'
															}
															onClick={cancelEditButton}>
															<span>{Loading ? 'cancel' : 'cancel'}</span>
														</button>
														<button
															className={
																Loading
																	? 'btn btn-primary disabled'
																	: 'btn btn-primary'
															}>
															{Loading ? (
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
	return {
		cafeteriaInvCategory: state.inventory.cafeteriaInvCategory,
		cafeteriaInventory: state.inventory.cafeteriaInventory,
	};
};
export default withRouter(
	connect(mapStateToProps, {
		getAllCafeteriaInvCategory,
		addCafeteriaInventory,
		getAllCafeteriaInventory,
		updateCafeteriaInventory,
		deleteCafeteriaInventory,
	})(CafeteriaInventory)
);
