/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import capitalize from 'lodash.capitalize';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import { request, itemRender } from '../../services/utilities';
import { APP_NAME, hmoAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import ModalHmoCompany from '../../components/Modals/ModalHmoCompany';

const HmoCompany = () => {
	const [companies, setCompanies] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState(null);
	const [company, setCompany] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [{ edit, add }, setSubmitButton] = useState({ edit: false, add: true });

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

	const newCompany = () => {
		setShowModal(true);
		document.body.classList.add('modal-open');
		setCompany(null);
	};

	const editCompany = data => {
		setCompany(data);
		document.body.classList.add('modal-open');
		setSubmitButton({ edit: true, add: false });
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setSubmitButton({ add: true, edit: false });
		setCompany(null);
	};

	const updateCompany = items => {
		setCompanies(items);
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
								onClick={onClose}
							>
								No
							</button>
							<button
								className="btn btn-danger"
								style={{ margin: 10 }}
								onClick={() => {
									onDeleteHmo(data);
									onClose();
								}}
							>
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
			<div className="element-actions">
				<a
					onClick={() => newCompany()}
					className="btn btn-primary btn-sm btn-outline-primary"
				>
					Create Company
				</a>
			</div>
			<h6 className="element-header">HMO Companies</h6>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-12">
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
																		<a onClick={() => editCompany(hmo)}>
																			<i className="os-icon os-icon-edit-1" />
																		</a>
																	</Tooltip>
																	{hmo.name !== APP_NAME && (
																		<Tooltip title="Delete">
																			<a
																				className="danger"
																				onClick={() => confirmDelete(hmo)}
																			>
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
														showSizeChanger={false}
													/>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<ModalHmoCompany
					company={company}
					companies={companies}
					closeModal={closeModal}
					updateCompany={updateCompany}
					buttonState={{ edit, add }}
				/>
			)}
		</>
	);
};

export default HmoCompany;
