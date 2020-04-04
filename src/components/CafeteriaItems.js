/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction } from '../services/utilities';

import {
	getAllCafeteriaCategory,
	addCafeteriaItem,
	getAllCafeteriaItem,
	updateCafeteriaItem,
	deleteCafeteriaItem,
	filterCafeteriaItem,
} from '../actions/inventory';
import { addCafeteriaFile } from '../actions/general';
import { v4 as uuidv4 } from 'uuid';

const CafeteriaItems = props => {
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
			item,
			item_code,
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

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddCafeteriaItem = e => {
		e.preventDefault();
		setLoading(true);
		console.log({ name, price, category_id, description, discount_price });
		item_code = `RC-${uuidv4().substring(0, 4)}`;
		props
			.addCafeteriaItem({
				name,
				price,
				category_id,
				description,
				discount_price,
				item_code,
			})
			.then(response => {
				setLoading(false);
				setState({ ...initialState });
				notifySuccess('Cafeteria item added');
			})
			.catch(error => {
				setLoading(false);
				notifyError('Error creating cafeteria item');
			});
	};

	const onEditCafeteriaItem = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateCafeteriaItem({
				id: data.id,
				name,
				price,
				discount_price,
				description,
				category_id,
				item_code,
			})
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifySuccess(' Cafeteria item updated');
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifyError('Error editing cafeteria category');
			});
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.q_name,
			price: data.q_price,
			id: data.q_id,
			category_id: data.q_categoryId,
			description: data.q_description,
			discount_price: data.q_discount_price,
			item_code: data.q_item_code,
		}));
		getDataToEdit(data);
	};

	const onDeleteCafeteriaItem = data => {
		props
			.deleteCafeteriaItem(data)
			.then(data => {
				setLoading(false);
				notifySuccess(' Cafeteria item deleted');
			})
			.catch(error => {
				setLoading(false);
				notifyError('Error deleting cafeteria item ');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteCafeteriaItem, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};
	const doFilter = () => {
		setFiltering(true);
		setFiltering(false);
	};

	useEffect(() => {
		if (!loaded) {
			props
				.getAllCafeteriaCategory()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch cafeterian category');
				});
		}
		setLoaded(true);
		console.log(props.cafeteriaCategory);
	}, [edit, loaded, props, save]);

	useEffect(() => {
		if (!loaded) {
			props
				.getAllCafeteriaItem()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch cafeterian category');
				});
		}
		setLoaded(true);
		setItems(props.cafeteriaItems);
		console.log(props.cafeteriaItems);
	}, [edit, loaded, props, save]);

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
										<label className="" htmlFor="patient_id">
											ID
										</label>
										<select
											style={{ height: '32px' }}
											id="patient_id"
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

									<div className="form-group col-md-3">
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
									</div>
									<div className="form-group col-md-4 mt-4 ">
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
												{!dataLoaded ? (
													<tr>
														<td colSpan="4" className="text-center">
															<img alt="searching" src={searchingGIF} />
														</td>
													</tr>
												) : (
													<>
														{items &&
															items.map(item => {
																return (
																	<tr key={item.q_item_code}>
																		<th className="text-center">
																			{item.q_item_code}
																		</th>
																		{/* <th className="text-center">
																			{item.category.name}
																		</th> */}
																		<th className="text-center">
																			{item.q_name}
																		</th>
																		<th className="text-center">
																			{item.q_price}
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
		cafeteriaCategory: state.inventory.cafeteriaCategory,
		cafeteriaItems: state.inventory.cafeteriaItems,
		filteredCafeteriaItems: state.inventory.filteredCafeteriaItems,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		getAllCafeteriaCategory,
		addCafeteriaItem,
		getAllCafeteriaItem,
		updateCafeteriaItem,
		deleteCafeteriaItem,
		filterCafeteriaItem,
		addCafeteriaFile,
	})(CafeteriaItems)
);
