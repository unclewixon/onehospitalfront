import React, { useState, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';

import TableLoading from '../TableLoading';
import ModalEditService from '../Modals/ModalEditService';
import {
	request,
	confirmAction,
	formatCurrency,
	itemRender,
} from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { deleteService, loadServices } from '../../actions/settings';
import useSearchInputState from '../../services/search-hook';

const HmoData = ({ hmo, index, toggle, doToggle, loaded, setLoaded }) => {
	const [meta, setMeta] = useState(null);
	const [keyword, setKeyword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [service, setService] = useState(null);

	const services = useSelector(state =>
		state.settings.services.find(s => s.hmo.id === hmo.id)
	);

	const dispatch = useDispatch();

	const fetchServices = async (page, q) => {
		try {
			const p = page || 1;
			const url = `services?page=${p}&limit=24&q=${q || ''}&hmo_id=${hmo.id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			dispatch(loadServices({ hmo, result: [...result] }));
			setMeta(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setLoaded(true);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not fetch services');
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetchServices();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded]);

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
		fetchServices(nextPage, keyword);
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
		await fetchServices(1, q);
		dispatch(stopBlock());
	};

	return (
		<div className="filter-side mb-2" style={{ flex: '0 0 100%' }}>
			{!loaded && !services ? (
				<TableLoading />
			) : (
				<div className={`filter-w ${toggle ? '' : 'collapsed'}`}>
					<div className="filter-toggle" onClick={() => doToggle(index)}>
						<i className="os-icon-minus os-icon" />
					</div>
					<h6 className="filter-header">{hmo.name}</h6>
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
								{services.result.map((item, i) => {
									return (
										<div className="col-lg-4 mb-2" key={i}>
											<div className="pipeline white p-1 mb-2">
												<div className="pipeline-body">
													<div className="pipeline-item">
														<div className="pi-controls">
															<div className="pi-settings os-dropdown-trigger">
																<Tooltip title="Edit Service">
																	<i
																		className="os-icon os-icon-ui-49 mr-1"
																		onClick={() => onClickEdit(item)}
																	/>
																</Tooltip>
																<Tooltip title="Delete Service">
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
																<div className="pi-sub">
																	{item.category.name}
																</div>
															</div>
														</div>
														<div className="pi-foot">
															<div className="tags">
																{formatCurrency(item.hmoTarrif)}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
								{services.result.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}>
										No services found!
									</div>
								)}
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} services`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			{showModal && service && (
				<ModalEditService closeModal={() => closeModal()} service={service} />
			)}
		</div>
	);
};

export default HmoData;
