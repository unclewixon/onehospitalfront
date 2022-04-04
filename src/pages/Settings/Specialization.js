/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import TableLoading from '../../components/TableLoading';
import {
	addSpecialization,
	loadSpecializations,
	updateSpecialization,
	deleteSpecialization,
} from '../../actions/settings';

const Specialization = () => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const specializations = useSelector(state => state.settings.specializations);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddSpecialization = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name };
			const rs = await request('specializations', 'POST', true, data);
			dispatch(addSpecialization(rs));
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Specialization created');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating Specialization');
		}
	};

	const onEditSpecialization = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name };
			const url = `specializations/${payload.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			dispatch(updateSpecialization(rs));
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Specialization updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error updating Specialization');
		}
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

	const onDeleteSpecialization = async data => {
		try {
			const rs = await request(`specializations/${data.id}`, 'DELETE', true);
			dispatch(deleteSpecialization(rs));
			setLoading(false);
			notifySuccess('Specialization deleted');
		} catch (error) {
			setLoading(false);
			notifyError('Error deleting Specialization');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteSpecialization, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	useEffect(() => {
		const fetchSpecialization = async () => {
			try {
				const rs = await request('specializations', 'GET', true);
				dispatch(loadSpecializations(rs));
			} catch (error) {
				notifyError(error.message || 'could not fetch specializations!');
			}
		};

		if (!dataLoaded) {
			fetchSpecialization();
			setDataLoaded(true);
		}
	}, [dataLoaded, dispatch]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Specialization</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-8">
							{!dataLoaded ? (
								<TableLoading />
							) : (
								<>
									<div className="row">
										{specializations.map((item, i) => {
											return (
												<div className="col-lg-4" key={i}>
													<div className="pt-3">
														<div className="pipeline-item">
															<div className="pi-controls">
																<div className="pi-settings os-dropdown-trigger">
																	<i
																		className="os-icon os-icon-ui-49"
																		onClick={() => onClickEdit(item)}
																	></i>
																</div>
																<div className="pi-settings os-dropdown-trigger text-danger">
																	<i
																		className="os-icon os-icon-ui-15"
																		onClick={() => confirmDelete(item)}
																	></i>
																</div>
															</div>
															<div className="pi-body custom-padd">
																<div className="pi-info">
																	<div className="h6 pi-name">{item.name}</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
									{specializations.length === 0 && (
										<div
											className="alert alert-info text-center"
											style={{ width: '100%' }}
										>
											No specializations
										</div>
									)}
								</>
							)}
						</div>
						<div className="col-lg-4">
							<div className="element-wrapper">
								<div className="element-box">
									<form
										onSubmit={edit ? onEditSpecialization : onAddSpecialization}
									>
										<h5 className="element-box-header">
											{edit ? 'Edit Specialization' : 'Add New'}
										</h5>
										<div className="form-group">
											<label className="lighter">Name</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter specialization"
													type="text"
													name="name"
													value={name}
													onChange={handleInputChange}
												/>
											</div>
										</div>

										<div className="form-buttons-w text-right compact">
											{save && (
												<button className="btn btn-primary" disabled={loading}>
													{loading ? (
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
														onClick={cancelEditButton}
													>
														<span>cancel</span>
													</button>
													<button
														className="btn btn-primary"
														disabled={loading}
													>
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
	);
};

export default Specialization;
