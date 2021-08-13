/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import capitalize from 'lodash.capitalize';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import { request, itemRender, updateImmutable } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';

const HmoCompany = () => {
	const initialState = {
		name: '',
		address: '',
		email: '',
		phoneNumber: '',
		add: true,
		edit: false,
	};
	const [companies, setCompanies] = useState([]);
	const [{ name, email, phoneNumber, address }, setState] = useState(
		initialState
	);
	const [loading, setLoading] = useState(false);
	const [{ edit, add }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [adding, setAdding] = useState(false);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const fetchHmos = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${hmoAPI}/owners?page=${p}&limit=12`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setCompanies([...result]);
				setMeta(meta);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				console.log(e);
				notifyError('could not fetch hmo companies');
				setLoaded(true);
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			fetchHmos();
		}
	}, [loaded, fetchHmos]);

	const onNavigatePage = nextPage => {
		fetchHmos(nextPage);
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddHmo = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const data = {
				name,
				email,
				phoneNumber,
				address,
			};
			setAdding(true);
			const rs = await request(`${hmoAPI}/owners`, 'POST', true, data);
			setCompanies([...companies, rs]);
			setState({ ...initialState });
			setAdding(false);
			dispatch(stopBlock());
		} catch (e) {
			console.log(e);
			let message = '';
			try {
				message = e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ');
			} catch (e) {
				message = 'could not save hmo company';
			}
			notifyError(message);
			dispatch(stopBlock());
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
			};
			dispatch(startBlock());
			setLoading(true);
			const url = `${hmoAPI}/owners/${data.id}`;
			const rs = await request(url, 'PATCH', true, info);
			const list = updateImmutable(companies, rs);
			setCompanies([...list]);
			setState({ ...initialState });
			setSubmitButton({ add: true, edit: false });
			setLoading(false);
			dispatch(stopBlock());
		} catch (e) {
			console.log(e);
			let message = '';
			try {
				message = e.message
					?.map(m => Object.values(m.constraints).join(', '))
					?.join(', ');
			} catch (e) {
				message = 'could not save hmo company';
			}
			notifyError(message);
			setState({ ...initialState });
			setLoading(false);
			dispatch(stopBlock());
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
		}));
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ add: true, edit: false });
		setState({ ...initialState });
	};

	const onDeleteHmo = async data => {
		try {
			dispatch(startBlock());
			const url = `${hmoAPI}/owners/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			setCompanies([...companies.filter(c => c.id !== rs.id)]);
			dispatch(stopBlock());
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError(e.message || 'could not delete company');
		}
	};

	const confirmDelete = data => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<h1>Are you sure?</h1>
						<p>You want to delete this remove?</p>
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

	return (
		<>
			<h6 className="element-header">HMO Companies</h6>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-8">
						<div className="element-wrapper">
							<div className="element-box p-3 m-0">
								<div className="table-responsive">
									{!loaded ? (
										<TableLoading />
									) : (
										<>
											<table className="table table-striped">
												<thead>
													<tr>
														<th>Name</th>
														<th>Phone</th>
														<th>Address</th>
														<th>Email</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{companies.map((hmo, i) => {
														return (
															<tr key={i}>
																<td>
																	<span>{capitalize(hmo.name || '--')}</span>
																</td>
																<td>
																	<span>{hmo.phoneNumber || '--'}</span>
																</td>
																<td>
																	<span>{hmo.address || '--'}</span>
																</td>
																<td>
																	<span>{hmo.email || '--'}</span>
																</td>
																<td className="row-actions">
																	<Tooltip title="Edit">
																		<a onClick={() => onClickEdit(hmo)}>
																			<i className="os-icon os-icon-edit-1" />
																		</a>
																	</Tooltip>
																	{hmo.name !== 'Deda Hospital' && (
																		<Tooltip title="Delete">
																			<a
																				className="danger"
																				onClick={() => confirmDelete(hmo)}>
																				<i className="os-icon os-icon-ui-15" />
																			</a>
																		</Tooltip>
																	)}
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
											{meta && (
												<div className="pagination pagination-center mt-4">
													<Pagination
														current={parseInt(meta.currentPage, 10)}
														pageSize={parseInt(meta.itemsPerPage, 10)}
														total={parseInt(meta.totalPages, 10)}
														showTotal={total => `Total ${total} HMOs`}
														itemRender={itemRender}
														onChange={current => onNavigatePage(current)}
													/>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="pipeline white lined-warning">
							<form onSubmit={edit ? onEditHmo : onAddHmo}>
								<h6 className="form-header">{`${
									edit ? 'Edit' : 'Add New'
								} HMO Company`}</h6>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Name"
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

export default HmoCompany;
