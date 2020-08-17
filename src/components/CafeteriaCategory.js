import React, { useState, useEffect } from 'react';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction } from '../services/utilities';
import {
	addCafeteriaCategory,
	getAllCafeteriaCategory,
	updateCafeteriaCategory,
	deleteCafeteriaCategory,
} from '../actions/inventory';

const CafeteriaCategory = props => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddCafeteriaCategory = e => {
		e.preventDefault();
		setLoading(true);
		props
			.addCafeteriaCategory({ name })
			.then(response => {
				setLoading(false);
				setState({ ...initialState });
				notifySuccess('Cafeteria category added');
			})
			.catch(error => {
				setLoading(false);
				notifyError('Error creating cafeteria category');
			});
	};

	const onEditCafeteriaCategory = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateCafeteriaCategory({ id: data.id, name }, data)
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ save: true, edit: false });
				setLoading(false);
				notifySuccess(' Cafeteria category updated');
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
			name: data.name,
			duration: data.duration,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteCafeteriaCategory = data => {
		props
			.deleteCafeteriaCategory(data)
			.then(data => {
				setLoading(false);
				notifySuccess(' Cafeteria category deleted');
			})
			.catch(error => {
				setLoading(false);
				notifyError('Error deleting cafeteria category ');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteCafeteriaCategory, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	useEffect(() => {
		if (!dataLoaded) {
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
	}, [dataLoaded, props]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper compact pt-4">
					<div className="element-actions">
						<Link
							className="btn btn-primary btn-sm"
							to={`${props.location.pathname}/category`}>
							<i className="os-icon os-icon-ui-22"></i>
							Item Category
						</Link>
						<Link className="btn btn-success btn-sm" to={`/cafeteria/items/`}>
							<i className="os-icon os-icon-grid-10"></i>
							Item
						</Link>
					</div>

					<div className="element-box-tp">
						<h6 className="element-header">Item Category</h6>
						<div className="row">
							<div className="col-md-7">
								<div className="row">
									{!dataLoaded ? (
										<div className="d-flex justify-content-center">
											<img alt="searching" src={searchingGIF} />
										</div>
									) : (
										<>
											{props.cafeteriaCategory &&
												props.cafeteriaCategory.map((category, i) => {
													return (
														<div className="col-lg-4 col-xxl-3" key={i}>
															<div className="pt-3">
																<div className="pipeline-item">
																	<div className="pi-controls">
																		<div className="pi-settings os-dropdown-trigger">
																			<i
																				className="os-icon os-icon-ui-49"
																				onClick={() =>
																					onClickEdit(category)
																				}></i>
																		</div>
																		<div className="pi-settings os-dropdown-trigger text-danger">
																			<i
																				className="os-icon os-icon-ui-15"
																				onClick={() =>
																					confirmDelete(category)
																				}></i>
																		</div>
																	</div>
																	<div className="pi-body">
																		<div className="pi-info">
																			<div className="h6 pi-name">
																				{category.name}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													);
												})}
										</>
									)}
								</div>
							</div>
							<div className="col-md-5">
								<div className="element-wrapper">
									<div className="element-box">
										<form
											onSubmit={
												edit ? onEditCafeteriaCategory : onAddCafeteriaCategory
											}>
											<h5 className="element-box-header">
												{edit ? 'Edit' : 'Add'} Category
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

											<div className="form-buttons-w text-right compact">
												{save && (
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
	};
};

export default withRouter(
	connect(mapStateToProps, {
		addCafeteriaCategory,
		getAllCafeteriaCategory,
		updateCafeteriaCategory,
		deleteCafeteriaCategory,
	})(CafeteriaCategory)
);
