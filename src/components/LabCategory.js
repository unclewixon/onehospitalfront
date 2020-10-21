import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction } from '../services/utilities';

import {
	addLabTestCategory,
	getAllLabTestCategories,
	updateLabTestCategory,
	deleteLabTestCategory,
} from '../actions/settings';

const LabCategory = props => {
	const initialState = {
		name: '',
		edit: false,
		create: true,
	};
	const [{ name }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLabCategory = e => {
		setLoading(true);
		e.preventDefault();
		props
			.addLabTestCategory({ name })
			.then(response => {
				setLoading(false);
				setState({ ...initialState });
				notifySuccess('Lab Category created');
			})
			.catch(error => {
				setLoading(false);
				setState({ ...initialState });
				notifyError('Error adding lab category');
			});
	};

	const onEditLabCategories = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateLabTestCategory({ id: data.id, name }, data)
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ create: true, edit: false });
				setLoading(false);
				notifySuccess('Lab Category updated');
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ create: true, edit: false });
				setLoading(false);
				notifyError('Error updating lab category');
			});
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

	const onDeleteLabCategory = data => {
		props
			.deleteLabTestCategory(data)
			.then(response => {
				notifySuccess('Lab Category deleted');
			})
			.catch(error => {
				notifyError('Error deleting lab category');
			});
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
				<div>
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
									{props.LabCategories.map((LabCategory, i) => {
										return (
											<div className="col-lg-4 col-xxl-3" key={i + 1}>
												<div className="pt-3">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<i
																	className="os-icon os-icon-ui-49"
																	onClick={() => onClickEdit(LabCategory)}></i>
															</div>
															<div className="pi-settings os-dropdown-trigger">
																<i
																	className="os-icon os-icon-ui-15"
																	onClick={() =>
																		confirmDelete(LabCategory)
																	}></i>
															</div>
														</div>
														<div className="pi-body">
															<div className="pi-info">
																<div className="h6 pi-name">
																	{LabCategory.name}
																</div>
																<div className="pi-sub">{LabCategory.name}</div>
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
				</div>
			</div>
			<div className="col-lg-4 col-xxl-3  d-xxl-block">
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
								<button
									className={
										Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
									}>
									{Loading ? (
										<img src={waiting} alt="submitting" />
									) : (
										<span> create</span>
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
											Loading ? 'btn btn-primary disabled' : 'btn btn-primary'
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
	);
};

const mapStateToProps = state => {
	return {
		LabCategories: state.settings.lab_categories,
	};
};

export default connect(mapStateToProps, {
	addLabTestCategory,
	getAllLabTestCategories,
	updateLabTestCategory,
	deleteLabTestCategory,
})(LabCategory);
