/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction } from '../services/utilities';
import {
	getAllCafeteriaInvCategory,
	addCafeteriaInventory,
	getAllCafeteriaInventory,
	updateCafeteriaInventory,
	deleteCafeteriaInventory,
} from '../actions/inventory';
import { createAccount, editAccount } from '../actions/general';

const ManageAccount = props => {
	const initialState = {
		name: '',
		category: '',
		category_id: '',
		subCategory: '',
		subCategory_id: '',
		status: '',
		save: true,
		edit: false,
		id: '',
		code: '',
	};
	const [
		{ name, status, category, category_id, code, subCategory, subCategory_id },
		setState,
	] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	// const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [items, setItems] = useState([]);
	// const [catName, setCatName] = useState('');

	const handleInputChange = e => {
		const { name, value } = e.target;
		if (name === 'category') {
			setItems(props.cafeteriaInventory);
		}
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	// const onAddCafeteriaInventory = e => {
	// 	e.preventDefault();
	// 	setLoading(true);

	// 	// props
	// 	// 	.addCafeteriaInventory({
	// 	// 		name,
	// 	// 		cost_price,
	// 	// 		category_id,
	// 	// 		description,
	// 	// 		quantity,
	// 	// 		stock_code,
	// 	// 	})
	// 	// 	.then(response => {
	// 	// 		setLoading(false);
	// 	// 		setState({ ...initialState });
	// 	// 		notifySuccess('Cafeteria inventory added');
	// 	// 	})
	// 	// 	.catch(error => {
	// 	// 		setLoading(false);
	// 	// 		notifyError('Error creating cafeteria inventory');
	// 	// 	});
	// };

	// const onEditCafeteriaInventory = e => {
	// 	setLoading(true);
	// 	e.preventDefault();
	// 	// props
	// 	// 	.updateCafeteriaInventory({
	// 	// 		id: data.id,
	// 	// 		name,
	// 	// 		cost_price,
	// 	// 		quantity,
	// 	// 		description,
	// 	// 		category_id,
	// 	// 		stock_code,
	// 	// 	})
	// 	// 	.then(response => {
	// 	// 		setState({ ...initialState });
	// 	// 		setSubmitButton({ save: true, edit: false });
	// 	// 		setLoading(false);
	// 	// 		notifySuccess(' Cafeteria inventory updated');
	// 	// 	})
	// 	// 	.catch(error => {
	// 	// 		setState({ ...initialState });
	// 	// 		setSubmitButton({ save: true, edit: false });
	// 	// 		setLoading(false);
	// 	// 		notifyError('Error editing cafeteria inventory');
	// 	// 	});
	// };

	const onClickEdit = data => {
		// setSubmitButton({ edit: true, save: false });
		// setState(prevState => ({
		// 	...prevState,
		// 	name: data.name,
		// 	cost_price: data.cost_price,
		// 	id: data.id,
		// 	category_id: category ? category : data.category.id,
		// 	description: data.description,
		// 	quantity: data.quantity,
		// 	stock_code: data.stock_code,
		// }));
		// getDataToEdit(data);
		//call the action

		props.editAccount(true, data);
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

	// const cancelEditButton = () => {
	// 	setSubmitButton({ save: true, edit: false });
	// 	setState({ ...initialState });
	// };

	const doFilter = async () => {
		// setFiltering(true);
		// try {
		// 	const rs = await request(
		// 		`cafeteria/inventories-by-category/${category}`
		// 	);
		// 	console.log(rs);
		// 	let cat = props.cafeteriaInvCategory.find(el => el.id === category);
		// 	console.log(cat);
		// 	await setCatName(cat.name);
		// 	await setItems(rs);
		// 	setFiltering(false);
		// } catch (e) {
		// 	notifyError('Filtering not successful');
		// 	setFiltering(false);
		// }
		// setFiltering(false);
	};

	const addAccountChart = () => {
		props.createAccount(true);
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
			<div className="content-box p-0">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						{/* <Link
							className="btn btn-primary btn-sm"
							to={`/account/setup/coa/category`}>
							COA Category
						</Link> */}
						<button
							className="btn btn-primary btn-sm"
							onClick={() => {
								addAccountChart();
							}}
							to={`/account/setup/coa/subcategory`}>
							Add Chart of Accounts
						</button>
					</div>

					<div className="element-box-tp">
						<h6 className="element-header">Manage Accounts</h6>
						<div className="row">
							<div className="col-md-12">
								<form className="row">
									<div className="form-group col-md-3">
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

									<div className="form-group col-md-3">
										<label className="mr-2 " htmlFor="item">
											Subcategory
										</label>
										<select
											style={{ height: '32px' }}
											id="subcategory"
											className="form-control"
											name="item"
											onChange={handleInputChange}>
											<option value="">Choose subcategory</option>
											{props.cafeteriaInventory.map((status, i) => {
												return (
													<option key={i} value={status.name}>
														{status.name}
													</option>
												);
											})}
										</select>
									</div>
									<div className="form-group col-md-3">
										<label className="mr-2 " htmlFor="item">
											Type
										</label>
										<select
											style={{ height: '32px' }}
											id="type"
											className="form-control"
											name="type"
											onChange={handleInputChange}>
											<option value="">Choose Type</option>

											<option value="debit">Debit</option>
											<option value="credit">Credit</option>
										</select>
									</div>

									<div className="form-group col-md-2 mt-4 text-right">
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
								<div className="row element-box p-0">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th className="text-center">GL Code </th>
													<th className="text-center">Name</th>
													<th className="text-center">Type</th>
													<th className="text-center">Status</th>
													<th className="text-right">ACTIONS</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th className="text-center">WW-780</th>

													<th className="text-center">Balance</th>
													<th className="text-center">Debit</th>
													<th className="text-center">processing</th>
													<th className="text-right">
														<a className="pi-settings os-dropdown-trigger">
															<i
																className="os-icon os-icon-ui-49"
																onClick={() =>
																	onClickEdit({
																		code: 'WW-780',
																		name: 'balance',
																		type: 'debit',
																		category_id: 'asssdd',
																		subCategory_id: 'ddjjfkf',
																		status: 'processing',
																	})
																}></i>
														</a>
														<a className="pi-settings os-dropdown-trigger text-danger">
															<i
																className="os-icon os-icon-ui-15"
																onClick={() =>
																	confirmDelete({
																		code: 'WW-780',
																		name: 'balance',
																		type: 'debit',
																		category_id: 'asssdd',
																		subCategory_id: 'ddjjfkf',
																		status: 'processing',
																	})
																}></i>
														</a>
													</th>
												</tr>
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
																	<tr key={item.code}>
																		<th className="text-center">{item.code}</th>

																		<th className="text-center">{item.name}</th>
																		<th className="text-center">{item.type}</th>
																		<th className="text-center">
																			{item.status}
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
							{/* <div className="col-md-12">
								<div className="element-wrapper">
									<div className="element-box">
										<form
											onSubmit={
												edit
													? onEditCafeteriaInventory
													: onAddCafeteriaInventory
											}>
											<h5 className="element-box-header">
												{edit ? 'Edit' : 'Add'} Chart of Accounts
											</h5>
											<div className="form-group">
												<label className="lighter">Category</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<select
														className="form-control"
														name="category_id"
														value={category_id}
														onChange={handleInputChange}>
														<option>Select COA Category</option>
														{props.cafeteriaInvCategory &&
															props.cafeteriaInvCategory.map(cat => (
																<option key={cat.id} value={cat.id}>
																	{cat.name}
																</option>
															))}
													</select>
												</div>
											</div>

											<div className="form-group">
												<label className="lighter">Sub Category</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<select
														className="form-control"
														name="subCategory_id"
														value={category_id}
														onChange={handleInputChange}>
														<option>Select COA Subcategory</option>
														{props.cafeteriaInvCategory &&
															props.cafeteriaInvCategory.map(cat => (
																<option key={cat.id} value={cat.id}>
																	{cat.name}
																</option>
															))}
													</select>
												</div>
											</div>
											<div className="form-group">
												<label className="lighter">GL Code</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<input
														className="form-control"
														placeholder="Code"
														type="text"
														name="code"
														value={code}
														onChange={handleInputChange}
														required
													/>
												</div>
											</div>

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
												<label className="lighter">Type</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<select
														className="form-control"
														name="type"
														value={category}
														onChange={handleInputChange}>
														<option>Select Type</option>
														<option value="Debit">Debit</option>
														<option value="Credit">Credit</option>
													</select>
												</div>
											</div>

											<div className="form-group">
												<label className="lighter">Status</label>
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
													<select
														className="form-control"
														name="status"
														value={status}
														onChange={handleInputChange}>
														<option>Select status</option>
														<option value="active">active</option>
														<option value="inactive">inactive</option>
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
							</div> */}
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
		createAccount,
		editAccount,
	})(ManageAccount)
);
