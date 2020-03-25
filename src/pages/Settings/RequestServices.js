/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmAction } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import searchingGIF from '../../assets/images/searching.gif';
import {
	addRequestService,
	getAllRequestServices,
	updateRequestService,
	deleteRequestService,
} from '../../actions/settings';

import { requestTypes } from '../../services/constants';
const RequestServices = props => {
	const initialState = {
		name: '',
		group: '',
		edit: false,
		create: true,
	};

	const [{ name, group }, setState] = useState(initialState);
	const [loaded, setLoaded] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const cancelEditButton = () => {
		setSubmitButton({ create: true, edit: false });
		setState({ ...initialState });
	};
	const onAddRequestService = e => {
		setLoading(true);
		e.preventDefault();

		props
			.addRequestService({ name, group })
			.then(response => {
				setLoading(false);
				setState({ ...initialState });
				notifySuccess('Request Service successfully  created');
			})
			.catch(error => {
				setLoading(false);
				setState({ ...initialState });
				notifyError('Error creating request service ');
			});
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			group: data.group,
			id: data.id,
		}));
		getDataToEdit(data);
	};
	const onEditRequestService = e => {
		setLoading(true);
		e.preventDefault();
		props
			.updateRequestService({ id: data.id, name, group }, data)
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ create: true, edit: false });
				setLoading(false);
				notifySuccess('Service Category updated');
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ create: true, edit: false });
				setLoading(false);
				notifyError('Error updating service category');
			});
	};

	const onDeleteRequestService = data => {
		props
			.deleteRequestService(data)
			.then(response => {
				notifySuccess('Request Service  deleted');
			})
			.catch(error => {
				notifyError('Error deleting  request service ');
			});
	};

	const confirmDelete = data => {
		confirmAction(onDeleteRequestService, data);
	};
	useEffect(() => {
		if (!loaded) {
			props
				.getAllRequestServices()
				.then(response => {
					console.log(response);
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch request services');
				});
		}
		setLoaded(true);
	}, [props, loaded]);
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a
												aria-expanded="true"
												className="nav-link active"
												data-toggle="tab">
												Request Services
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8">
						<div className="element-wrapper">
							<div className="element-box">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>S/N</th>
												<th>Name</th>
												<th>Request Type</th>
												<th className="text-right">Actions</th>
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
													{props.requestServices &&
														props.requestServices.map((req, i) => {
															return (
																<tr key={i}>
																	<td>{i + 1}</td>
																	<td>
																		<div className="value">{req.name}</div>
																	</td>
																	<td>
																		<div className="value">{req.group}</div>
																	</td>
																	<td className="row-actions text-right">
																		<a onClick={() => onClickEdit(req)}>
																			<i className="os-icon os-icon-ui-49"></i>
																		</a>

																		<a
																			className="danger"
																			onClick={() => confirmDelete(req)}>
																			<i className="os-icon os-icon-ui-15"></i>
																		</a>
																	</td>
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
					</div>
					<div className="col-lg-4 col-xxl-3">
						<div className="pipeline white lined-warning">
							<form
								onSubmit={edit ? onEditRequestService : onAddRequestService}>
								<h6 className="form-header">Manage Request Service</h6>

								<div className="form-group my-2">
									<label>Request Type</label>
									<select
										id="group"
										name="group"
										className="form-control"
										required
										onChange={e => handleInputChange(e)}>
										<option disabled>Choose ...</option>
										{requestTypes.map((req, i) => {
											return (
												<option
													key={i}
													value={req.value}
													selected={req.value === group}>
													{req.label}
												</option>
											);
										})}
									</select>
								</div>
								<div className="form-group my-2">
									<label>Name</label>
									<input
										className="form-control"
										placeholder="Name"
										type="text"
										name="name"
										onChange={e => handleInputChange(e)}
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
												<span> Save</span>
											)}
										</button>
									)}
									{edit && (
										<>
											<button
												className={
													Loading
														? 'btn btn-primary disabled'
														: 'btn btn-primary'
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
	);
};

const mapStateToProps = state => {
	return {
		requestServices: state.settings.request_services,
	};
};

export default connect(mapStateToProps, {
	addRequestService,
	getAllRequestServices,
	updateRequestService,
	deleteRequestService,
})(RequestServices);
