/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import TableLoading from '../TableLoading';
import ModalEditService from '../Modals/ModalEditService';
import {
	request,
	formatCurrency,
	itemRender,
	updateImmutable,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import useSearchInputState from '../../services/search-hook';

const ModalHmoTariff = ({ closeModal, hmo, categories }) => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [keyword, setKeyword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [services, setServices] = useState([]);
	const [service, setService] = useState(null);
	const [searchCategory, setSearchCategory] = useState(null);

	const dispatch = useDispatch();

	const fetchServices = useCallback(
		async (page, q, category) => {
			try {
				const p = page || 1;
				const url = `services?page=${p}&limit=10&q=${q ||
					''}&category_id=${category || ''}&hmo_id=${hmo.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setServices([...result]);
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
		if (!loaded) {
			const category = categories[0];
			setSearchCategory(category);
			fetchServices(1, '', category?.id || '');
		}
	}, [categories, fetchServices, loaded]);

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

	const editItem = data => {
		setService(data);
		setShowModal(true);
	};

	const closeMyModal = () => {
		setShowModal(false);
		setService(null);
	};

	const onNavigatePage = nextPage => {
		fetchServices(nextPage, keyword, searchCategory?.id || '');
	};

	const updateTariff = item => {
		const items = updateImmutable(services, item);
		setServices(items);
	};

	const downloadHmo = async () => {
		try {
			dispatch(startBlock());
			const url = `services/download/${searchCategory?.id}?hmo_id=${hmo.id}`;
			const rs = await request(url, 'GET', true);
			dispatch(stopBlock());
			window.open(rs.url, '_blank').focus();
		} catch (e) {
			dispatch(stopBlock());
			notifyError(e.message || 'could not download services');
		}
	};

	const uploadHmo = async () => {
		//
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}>
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title text-center">{hmo.name}</h4>
						<div className="element-box m-0 p-3">
							<div className="row">
								<div className="col-lg-4">
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
								<div className="col-lg-4">
									<div className="element-search">
										<Select
											name="category"
											getOptionValue={option => option.id}
											getOptionLabel={option => option.name}
											placeholder="Select Category"
											options={categories}
											value={searchCategory}
											onChange={async e => {
												setSearchCategory(e);
												setKeyword('');
												await fetchServices(1, '', e?.id || '');
											}}>
											<option>Select Category</option>
										</Select>
									</div>
								</div>
								<div className="col-lg-4 text-right">
									<a
										className="btn btn-sm btn-secondary text-white"
										onClick={downloadHmo}>
										<i className="os-icon os-icon-download" />
										<span>Download HMO</span>
									</a>
									<a
										className="btn btn-sm btn-primary text-white"
										onClick={uploadHmo}>
										<i className="os-icon os-icon-download" />
										<span>Upload HMO</span>
									</a>
								</div>
							</div>
							<div className="filter-body">
								<div className="pipelines-w mt-4">
									<div className="row">
										{!loaded ? (
											<TableLoading />
										) : (
											<div className="table-responsive">
												<>
													<table className="table table-striped">
														<thead>
															<tr>
																<th>Name</th>
																<th>Category</th>
																<th>Tarrif</th>
																<th></th>
															</tr>
														</thead>
														<tbody>
															{services.map((item, i) => {
																return (
																	<tr key={i}>
																		<td>{item.name}</td>
																		<td>{item.category.name}</td>
																		<td nowrap="nowrap">
																			{formatCurrency(
																				item.service?.tariff || 0
																			)}
																		</td>
																		<td nowrap="nowrap" className="row-actions">
																			<Tooltip title="Edit Service">
																				<a onClick={() => editItem(item)}>
																					<i className="os-icon os-icon-ui-49 mr-1" />
																				</a>
																			</Tooltip>
																		</td>
																	</tr>
																);
															})}
															{services.length === 0 && (
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
															/>
														</div>
													)}
												</>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && service && (
				<ModalEditService
					closeModal={() => closeMyModal()}
					service={service}
					hmo={hmo}
					editTariff={true}
					updateTariff={updateTariff}
				/>
			)}
		</div>
	);
};

export default ModalHmoTariff;
