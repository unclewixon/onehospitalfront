/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';

import TableLoading from './TableLoading';
import ModalEditService from './Modals/ModalEditService';
import {
	request,
	confirmAction,
	formatCurrency,
	itemRender,
} from '../services/utilities';
import { notifyError, notifySuccess } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import { deleteService, loadServices } from '../actions/settings';
import useSearchInputState from '../services/search-hook';

const ConsultingTypes = ({ hmo, toggle, doToggle, category }) => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [keyword, setKeyword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [service, setService] = useState(null);
	const [searchCategory, setSearchCategory] = useState(null);

	const services = useSelector(state =>
		state.settings.services.find(s => s.hmo.id === hmo.id)
	);

	const dispatch = useDispatch();

	const fetchServices = useCallback(
		async (page, q, category) => {
			try {
				const p = page || 1;
				const url = `services?page=${p}&limit=10&q=${q ||
					''}&category_id=${category || ''}&hmo_id=${hmo.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				dispatch(loadServices({ hmo, result: [...result] }));
				setMeta(meta);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch services');
			}
		},
		[dispatch, hmo, setLoaded]
	);

	useEffect(() => {
		if (toggle && toggle.id === hmo.id) {
			setSearchCategory(category);
			fetchServices(1, '', category?.id || '');
		}
	}, [category, fetchServices, hmo, searchCategory, toggle]);

	const onDeleteService = async data => {
		try {
			dispatch(startBlock());
			const rs = await request(`services/${data.id}`, 'DELETE', true);
			dispatch(deleteService(rs));
			notifySuccess('Service deleted');
			dispatch(stopBlock());
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error deleting service');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteService, data);
	};

	const onNavigatePage = nextPage => {
		fetchServices(nextPage, keyword, searchCategory?.id || '');
	};

	const onClickEdit = data => {
		setService(data);
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		document.body.classList.remove('modal-open');
		setService(null);
	};

	const onSearchChange = item => {
		setSearchValue(item);
	};

	const [searchValue, setSearchValue] = useSearchInputState(() => {
		doSearch(searchValue ?? '');
	});

	const doSearch = async q => {
		dispatch(startBlock());
		await fetchServices(1, q, searchCategory?.id || '');
		dispatch(stopBlock());
	};

	return (
		<div className="filter-side mb-2" style={{ flex: '0 0 100%' }}>
			<div className={`filter-w ${toggle ? '' : 'collapsed'}`}>
				<div
					className="filter-toggle"
					onClick={() => {
						setMeta({
							currentPage: 1,
							itemsPerPage: 24,
							totalPages: 0,
						});
						doToggle(hmo.id);
						setLoaded(false);
					}}>
					<i className={`os-icon os-icon-${toggle ? 'minus' : 'common-03'}`} />
				</div>
				<h6 className="filter-header">{hmo.name}</h6>
				{!loaded && toggle && toggle.id === hmo.id ? (
					<TableLoading />
				) : (
					<div
						className="filter-body"
						style={{ display: toggle ? 'block' : 'none' }}>
						<div className="row">
							<div className="col-lg-12">
								<div className="element-search">
									<input
										placeholder="Search services..."
										value={keyword}
										onChange={e => {
											setKeyword(e.target.value);
											onSearchChange(e.target.value);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="pipelines-w mt-4">
							<div className="row">
								<div className="table-responsive">
									<>
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Name</th>
													<th>Tarrif</th>
													{hmo.name === 'Private' && <th></th>}
												</tr>
											</thead>
											<tbody>
												{services &&
													services.result.map((item, i) => {
														return (
															<tr key={i}>
																<td>{item.name}</td>
																<td nowrap="nowrap">
																	{formatCurrency(item.service?.tariff || 0)}
																</td>
																{hmo.name === 'Private' && (
																	<td nowrap="nowrap" className="row-actions">
																		<Tooltip title="Edit Service">
																			<a onClick={() => onClickEdit(item)}>
																				<i className="os-icon os-icon-ui-49 mr-1" />
																			</a>
																		</Tooltip>
																		<Tooltip title="Delete Service">
																			<a onClick={() => confirmDelete(item)}>
																				<i className="os-icon os-icon-ui-15 text-danger" />
																			</a>
																		</Tooltip>
																	</td>
																)}
															</tr>
														);
													})}
												{services && services.result.length === 0 && (
													<tr>
														<td colSpan="4" className="text-center">
															<div
																className="alert alert-info text-center"
																style={{ width: '100%' }}>
																No services found!
															</div>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										{meta && (
											<div className="pagination pagination-center mt-4">
												<Pagination
													current={parseInt(meta.currentPage, 10)}
													pageSize={parseInt(meta.itemsPerPage, 10)}
													total={parseInt(meta.totalPages, 10)}
													showTotal={total => `Total ${total} services`}
													itemRender={itemRender}
													onChange={current => onNavigatePage(current)}
													showSizeChanger={false}
												/>
											</div>
										)}
									</>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{showModal && service && (
				<ModalEditService
					closeModal={() => closeModal()}
					service={service}
					hmo={hmo}
				/>
			)}
		</div>
	);
};

export default ConsultingTypes;
