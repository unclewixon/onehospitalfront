/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import capitalize from 'lodash.capitalize';
import { Link } from 'react-router-dom';

import { uploadHmo } from '../../actions/general';
import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { addHmo, getAllHmos, updateHmo, deleteHmo } from '../../actions/hmo';
import TableLoading from '../../components/TableLoading';

const HmoList = props => {
	const initialState = {
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		add: true,
		edit: false,
	};
	const [{ name, email, phoneNumber, address }, setState] = useState(
		initialState
	);
	const [loading, setLoading] = useState(false);
	const [{ edit, add }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	// const [logo, setLogo] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [adding, setAdding] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddHmo = e => {
		e.preventDefault();
		const data = {
			name,
			email,
			phoneNumber,
			address,
		};

		setAdding(true);
		props.addHmo(data).then(response => {
			setState({ ...initialState });
			setAdding(false);
		});
	};

	const onEdiHmo = e => {
		setLoading(true);
		e.preventDefault();
		const editedData = {
			id: data.id,
			name,
			email,
			phoneNumber,
			address,
		};
		console.log(editedData);
		props
			.updateHmo(editedData, data)
			.then(response => {
				setState({ ...initialState });
				setSubmitButton({ add: true, edit: false });
				setLoading(false);
			})
			.catch(error => {
				setState({ ...initialState });
				setSubmitButton({ add: true, edit: false });
				setLoading(false);
			});
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, add: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
			address: data.address,
			logo: data.logo,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ add: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteHmo = data => {
		props
			.deleteHmo(data)
			.then(data => {})
			.catch(error => {
				console.log(error);
			});
	};

	const confirmDelete = data => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<h1>Are you sure?</h1>
						<p>You want to delete this remove ?</p>
						<div style={{}}>
							<button
								className="btn btn-primary"
								style={{ margin: 10 }}
								onClick={onClose}>
								No
							</button>
							<button
								className="btn btn-danger"
								style={{ margin: 10 }}
								onClick={() => {
									onDeleteHmo(data);
									onClose();
								}}>
								Yes, Delete it!
							</button>
						</div>
					</div>
				);
			},
		});
	};

	useEffect(() => {
		if (!dataLoaded) {
			props
				.getAllHmos()
				.then(response => {
					setDataLoaded(true);
				})
				.catch(e => {
					setDataLoaded(true);
					notifyError(e.message || 'could not fetch lab tests');
				});
		}
	}, [dataLoaded, props]);

	return (
		<>
			<h6 className="element-header">Health Management Organization</h6>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-8 col-xxl-8">
						<div className="element-wrapper">
							<div className="element-box-tp">
								{!dataLoaded ? (
									<TableLoading />
								) : (
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Name</th>
													<th>Phone</th>
													<th>Email</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{props.hmoList.map((hmo, i) => {
													return (
														<tr key={i}>
															<td>
																<span>{capitalize(hmo.name || '')}</span>
															</td>
															<td>
																<span>{hmo.phoneNumber || '-'}</span>
															</td>

															<td className="nowrap">
																<span>{hmo.email || '-'}</span>
															</td>
															<td className="row-actions">
																{hmo.name !== 'Private' && (
																	<>
																		<Tooltip title="Edit">
																			<a onClick={() => onClickEdit(hmo)}>
																				<i className="os-icon os-icon-edit-1" />
																			</a>
																		</Tooltip>
																		<Tooltip title="HMO Tariffs">
																			<Link to={`/hmo/tariffs?id=${hmo.id}`}>
																				<i className="os-icon os-icon-documents-03" />
																			</Link>
																		</Tooltip>
																		<Tooltip title="Delete">
																			<a
																				className="danger"
																				onClick={() => confirmDelete(hmo)}>
																				<i className="os-icon os-icon-ui-15" />
																			</a>
																		</Tooltip>
																	</>
																)}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-xxl-3  d-xxl-block">
						<div className="pipeline white lined-warning">
							<form onSubmit={edit ? onEdiHmo : onAddHmo}>
								<h6 className="form-header">Add New HMO</h6>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="HMO Name"
										type="text"
										name="name"
										value={name || ''}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="E-mail"
										type="email"
										name="email"
										onChange={handleInputChange}
										value={email || ''}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Phone Number"
										type="Phone"
										name="phoneNumber"
										onChange={handleInputChange}
										value={phoneNumber || ''}
									/>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Address"
										name="address"
										type="text"
										onChange={handleInputChange}
										value={address || ''}
									/>
								</div>
								<div className="form-buttons-w">
									{add && (
										<button
											className={`btn btn-primary ${adding ? 'disabled' : ''}`}>
											<span>
												{adding ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Add'
												)}
											</span>
										</button>
									)}
									{edit && (
										<>
											<button
												className={`btn btn-secondary ${
													loading ? 'disabled' : ''
												}`}
												onClick={cancelEditButton}>
												<span>cancel</span>
											</button>
											<button
												className={`btn btn-primary ${
													loading ? 'disabled' : ''
												}`}>
												<span>
													{loading ? (
														<img src={waiting} alt="submitting" />
													) : (
														'edit'
													)}
												</span>
											</button>
										</>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = state => {
	return {
		hmoList: state.hmo.hmo_list,
	};
};

export default connect(mapStateToProps, {
	addHmo,
	getAllHmos,
	updateHmo,
	uploadHmo,
	deleteHmo,
})(HmoList);
