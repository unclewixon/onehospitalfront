/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import capitalize from 'lodash.capitalize';
import { Link } from 'react-router-dom';

import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { fetchHmo, addHmo, updateHmo, deleteHmo } from '../../actions/hmo';
import TableLoading from '../../components/TableLoading';
import { request } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';

const HmoList = () => {
	const initialState = {
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		cacNumber: '',
		add: true,
		edit: false,
	};
	const [{ name, email, phoneNumber, address, cacNumber }, setState] = useState(
		initialState
	);
	const [loading, setLoading] = useState(false);
	const [{ edit, add }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	// const [logo, setLogo] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [adding, setAdding] = useState(false);

	const hmoList = useSelector(state => state.hmo.hmo_list);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddHmo = async e => {
		try {
			e.preventDefault();

			const data = {
				name,
				email,
				phoneNumber,
				address,
				cacNumber,
			};

			setAdding(true);
			const rs = await request(hmoAPI, 'POST', true, data);
			dispatch(addHmo(rs));
			setState({ ...initialState });
			setAdding(false);
		} catch (e) {
			console.log(e);
			const message =
				e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ') || 'could not save hmo';
			notifyError(message);

			setAdding(false);
		}
	};

	const onEditHmo = async e => {
		try {
			e.preventDefault();
			const info = {
				id: data.id,
				name,
				email,
				phoneNumber,
				address,
				cacNumber,
			};

			setLoading(true);
			const url = `${hmoAPI}/${data.id}/update`;
			const rs = await request(url, 'PATCH', true, info);
			dispatch(updateHmo(rs));
			setState({ ...initialState });
			setSubmitButton({ add: true, edit: false });
			setLoading(false);
		} catch (e) {
			console.log(e);
			const message =
				e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ') || 'could not save hmo';
			notifyError(message);

			setState({ ...initialState });
			setLoading(false);
		}
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
			cacNumber: data.cacNumber,
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ add: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteHmo = async data => {
		try {
			const url = `${hmoAPI}/${data.id}`;
			await request(url, 'DELETE', true);
			dispatch(deleteHmo(data));
		} catch (e) {
			console.log(e);
		}
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

	const fetchHmos = useCallback(async () => {
		try {
			const rs = await request(hmoAPI, 'GET', true);
			dispatch(fetchHmo(rs));
			setDataLoaded(true);
		} catch (e) {
			console.log(e);
			notifyError('could not fetch hmos');
		}
	}, [dispatch]);

	useEffect(() => {
		if (!dataLoaded) {
			fetchHmos();
		}
	}, [dataLoaded, fetchHmos]);

	return (
		<>
			<h6 className="element-header">Health Management Organization</h6>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-8">
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
													<th>CAC Number</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{hmoList.map((hmo, i) => {
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
															<td className="nowrap">
																<span>{hmo.cacNumber || '-'}</span>
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
					<div className="col-lg-4">
						<div className="pipeline white lined-warning">
							<form onSubmit={edit ? onEditHmo : onAddHmo}>
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
								<div className="form-group">
									<input
										className="form-control"
										placeholder="CAC Number"
										type="text"
										name="cacNumber"
										onChange={handleInputChange}
										value={cacNumber || ''}
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
														'save'
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

export default HmoList;
