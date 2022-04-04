/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import { useDispatch } from 'react-redux';

import { notifyError } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import ModalUploadDiagnosis from '../../components/Modals/ModalUploadDiagnosis';
import { startBlock, stopBlock } from '../../actions/redux-block';
import useSearchInputState from '../../services/search-hook';
import { diagnosisAPI, alphabets } from '../../services/constants';
import TableLoading from '../../components/TableLoading';

const Diagnosis = () => {
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState('');
	const [diagnoses, setDiagnoses] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const dispatch = useDispatch();

	const loadDiagnosis = async (page, q, alphabet) => {
		try {
			const url = `${diagnosisAPI}?page=${page}&q=${q || ''}&alphabet=${
				alphabet || ''
			}`;
			const rs = await request(url, 'GET', true);
			const { data, ...info } = rs;
			setDiagnoses([...data]);
			setMeta({ ...meta, totalPages: info.total, currentPage: info.page });
		} catch (e) {
			notifyError(e.message || 'could not load diagnoses');
		}
	};

	const init = useCallback(async () => {
		try {
			const url = `${diagnosisAPI}?page=1`;
			const rs = await request(url, 'GET', true);
			const { data, ...info } = rs;
			setDiagnoses([...data]);
			setMeta({ ...meta, totalPages: info.total, currentPage: info.page });
			setLoading(false);
		} catch (e) {
			setLoading(false);
			notifyError(e.message || 'could not load diagnoses');
		}
	}, [meta]);

	useEffect(() => {
		if (loading) {
			init(1);
		}
	}, [init, loading]);

	const onUploadService = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = refresh => {
		if (refresh) {
			setTimeout(async () => {
				dispatch(startBlock());
				await loadDiagnosis(1);
				dispatch(stopBlock());
			}, 1000);
		}
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const onNavigatePage = async page => {
		dispatch(startBlock());
		await loadDiagnosis(page, search, selected);
		dispatch(stopBlock());
	};

	const doSearch = async q => {
		dispatch(startBlock());
		await loadDiagnosis(1, q);
		dispatch(stopBlock());
	};

	const [searchValue, setSearchValue] = useSearchInputState(() => {
		doSearch(searchValue ?? '');
	});

	const onSearchChange = item => {
		setSearchValue(item);
	};

	const searchByAlphabet = async item => {
		setSearch('');
		dispatch(startBlock());
		setSelected(item);
		await loadDiagnosis(1, '', item);
		dispatch(stopBlock());
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Diagnosis</a>
								</li>
								<li className="nav-item nav-actions d-sm-block">
									<div className="row no-gutters">
										<div className="col-md-6">
											<form className="form-inline justify-content-sm-end">
												<input
													className="form-control form-control-sm rounded bright"
													placeholder="search diagnosis"
													onChange={e => {
														setSearch(e.target.value);
														onSearchChange(e.target.value);
													}}
													value={search}
												/>
											</form>
										</div>
										<div className="col-md-6">
											<a
												className="btn btn-primary btn-sm"
												onClick={() => onUploadService()}
											>
												<i className="os-icon os-icon-ui-22"></i>
												<span>Upload Diagnosis</span>
											</a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div className="pipelines-w">
						<div className="row">
							{loading ? (
								<TableLoading />
							) : (
								<div className="col-lg-12">
									<div className="element-wrapper">
										<div className="element-box-tp">
											<div className="controls-above-table">
												<div className="row">
													<div className="col-md-12">
														{alphabets.map((item, idx) => (
															<a
																key={idx}
																className={`btn btn-sm btn-${
																	selected === item ? 'danger' : 'secondary'
																} mb-1`}
																onClick={() => searchByAlphabet(item)}
															>
																{item}
															</a>
														))}
														{selected !== '' && (
															<a
																className="btn btn-sm btn-secondary mb-1"
																onClick={() => searchByAlphabet('')}
															>
																All
															</a>
														)}
													</div>
												</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped">
													<thead>
														<tr>
															<th>Code</th>
															<th>Type</th>
															<th>Description</th>
														</tr>
													</thead>
													<tbody>
														{diagnoses.map((item, i) => {
															return (
																<tr key={i}>
																	<td>{item.code}</td>
																	<td nowrap="nowrap">{item.type}</td>
																	<td>{item.description}</td>
																</tr>
															);
														})}
														{diagnoses.length === 0 && (
															<tr>
																<td colSpan="3" className="text-center">
																	No diagnosis found!
																</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>
											{meta && (
												<div className="pagination pagination-center mt-4">
													<Pagination
														current={parseInt(meta.currentPage, 10)}
														pageSize={parseInt(meta.itemsPerPage, 10)}
														total={parseInt(meta.totalPages, 10)}
														showTotal={total => `Total ${total} diagnoses`}
														itemRender={itemRender}
														onChange={current => onNavigatePage(current)}
														showSizeChanger={false}
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{showModal && <ModalUploadDiagnosis closeModal={closeModal} />}
		</div>
	);
};

export default Diagnosis;
