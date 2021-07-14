/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import capitalize from 'lodash.capitalize';
import { Link } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';
import { fetchHmo, addHmo, updateHmo, deleteHmo } from '../../actions/hmo';
import TableLoading from '../../components/TableLoading';
import { request, itemRender } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';

const HmoList = () => {
	const initialState = {
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		cacNumber: '',
		coverageType: '',
		coverage: '100',
		add: true,
		edit: false,
	};
	const [
		{ name, email, phoneNumber, address, cacNumber, coverageType, coverage },
		setState,
	] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, add }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	// const [logo, setLogo] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [adding, setAdding] = useState(false);
	const [meta, setMeta] = useState(null);

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
				coverageType,
				coverage,
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
				coverageType,
				coverage,
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
			coverageType: data.coverageType,
			coverage: data.coverage,
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

	const fetchHmos = useCallback(
		async page => {
			try {
				const p = page || 1;
				const rs = await request(`${hmoAPI}?page=${p}`, 'GET', true);
				const { result, ...meta } = rs;
				dispatch(fetchHmo([...result]));
				setMeta(meta);
				setDataLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				console.log(e);
				notifyError('could not fetch hmos');
				setDataLoaded(true);
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!dataLoaded) {
			fetchHmos();
		}
	}, [dataLoaded, fetchHmos]);

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		this.fetchHmoTransaction(nextPage);
	};

	return (
		<>
			<h6 className="element-header">Health Management Organization</h6>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-9">
						<div className="element-wrapper">
							<div className="element-box p-3 m-0">
								<div className="table-responsive">
									{!dataLoaded ? (
										<TableLoading />
									) : (
										<>
											<table className="table table-striped">
												<thead>
													<tr>
														<th>Name</th>
														<th>Phone</th>
														<th>Email</th>
														<th>CAC Number</th>
														<th>Coverage</th>
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

																<td>
																	<span>{hmo.email || '-'}</span>
																</td>
																<td className="nowrap">
																	<span>{hmo.cacNumber || '-'}</span>
																</td>
																<td className="nowrap">
																	<span>{`${capitalize(hmo.coverageType)} ${
																		hmo.coverageType === 'partial'
																			? `(${hmo.coverage}%)`
																			: ''
																	}`}</span>
																</td>
																<td className="row-actions">
																	<Tooltip title="Edit">
																		<a onClick={() => onClickEdit(hmo)}>
																			<i className="os-icon os-icon-edit-1" />
																		</a>
																	</Tooltip>
																	{hmo.name !== 'Private' && (
																		<>
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
								<div className="form-group">
									<select
										name="coverageType"
										className="form-control"
										placeholder="Select coverage type"
										onChange={handleInputChange}
										defaultValue={coverageType}>
										<option>Select coverage Type</option>
										<option value="partial">Partial</option>
										<option value="full">Full</option>
									</select>
								</div>
								<div className="form-group">
									<input
										className="form-control"
										placeholder="Coverage (%)"
										type="text"
										name="coverage"
										onChange={handleInputChange}
										value={coverage || ''}
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
