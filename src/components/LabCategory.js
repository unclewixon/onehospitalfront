import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction, request } from '../services/utilities';
import {
	addLabCategory,
	getAllLabTestCategories,
	updateLabCategory,
	deleteLabCategory,
} from '../actions/settings';

const LabCategory = props => {
	const initialState = {
		name: '',
		edit: false,
		create: true,
	};
	const [{ name }, setState] = useState(initialState);
	const [submitting, setSubmitting] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabCategory = async e => {
		e.preventDefault();
		try {
			setSubmitting(true);
			const rs = await request(`lab-tests/categories`, 'POST', true, { name });
			dispatch(addLabCategory(rs));
			setSubmitting(false);
			setState({ ...initialState });
			notifySuccess('Lab Category created');
		} catch (error) {
			setSubmitting(false);
			notifyError('Error adding lab category');
		}
	};

	const onEditLabCategories = async e => {
		e.preventDefault();
		try {
			setSubmitting(true);
			const url = `lab-tests/categories/${data.id}/update`;
			const rs = await request(url, 'PUT', true, { name });
			dispatch(updateLabCategory(rs));
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			setSubmitting(false);
			notifySuccess('Lab Category updated');
		} catch (error) {
			setSubmitting(false);
			notifyError('Error updating lab category');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
	};

	const onDeleteLabCategory = async data => {
		try {
			const url = `lab-tests/categories/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			dispatch(deleteLabCategory(rs));
			setDataLoaded(false);
			notifySuccess('Lab Category deleted');
		} catch (error) {
			console.log(error);
			notifyError('Error deleting lab category');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLabCategory, data);
	};

	useEffect(() => {
		if (!dataLoaded) {
			props
				.getAllLabTestCategories()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch lab categories');
				});
		}
	}, [props, dataLoaded]);

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="pipelines-w">
					<div className="row">
						{!dataLoaded ? (
							<table>
								<tbody>
									<tr>
										<td colSpan="4" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								</tbody>
							</table>
						) : (
							<>
								{props.categories.map((item, i) => {
									return (
										<div className="col-lg-4 mb-2" key={i}>
											<div className="pipeline white p-1 mb-2">
												<div className="pipeline-body h-auto">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<Tooltip title="Edit Test">
																	<i
																		className="os-icon os-icon-ui-49 mr-1"
																		onClick={() => onClickEdit(item)}
																	/>
																</Tooltip>
																<Tooltip title="Delete Test">
																	<i
																		className="os-icon os-icon-ui-15 text-danger"
																		onClick={() => confirmDelete(item)}
																	/>
																</Tooltip>
															</div>
														</div>
														<div className="pi-body mt-2">
															<div className="pi-info">
																<div className="h6 pi-name h7">{item.name}</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
								{props.categories.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}>
										No categories
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4 col-xxl-3 d-xxl-block">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditLabCategories : onAddLabCategory}>
						<h6 className="form-header">Create category</h6>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Category name"
								type="text"
								name="name"
								onChange={handleInputChange}
								value={name}
							/>
						</div>

						<div className="form-buttons-w">
							{create && (
								<button className="btn btn-primary" disabled={submitting}>
									{submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> create</span>
									)}
								</button>
							)}
							{edit && (
								<>
									<button
										className="btn btn-secondary ml-3"
										disabled={submitting}
										onClick={cancelEditButton}>
										<span>{submitting ? 'cancel' : 'cancel'}</span>
									</button>
									<button className="btn btn-primary" disabled={submitting}>
										{submitting ? (
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
	);
};

const mapStateToProps = state => {
	return {
		categories: state.settings.lab_categories,
	};
};

export default connect(mapStateToProps, { getAllLabTestCategories })(
	LabCategory
);
