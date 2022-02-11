/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';

import { setLabTests, deleteLabTest } from '../../actions/settings';
import {
	confirmAction,
	formatCurrency,
	itemRender,
	request,
} from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../TableLoading';
import useSearchInputState from '../../services/search-hook';
import ModalLabParameters from '../../components/Modals/ModalLabParameters';

const HmoTests = ({ hmo, toggle, doToggle, doToggleForm }) => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 24,
		totalPages: 0,
	});
	const [keyword, setKeyword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [labTest, setLabTest] = useState(null);

	const tests = useSelector(state =>
		state.settings.lab_tests.find(test => test.hmo.id === hmo.id)
	);

	const dispatch = useDispatch();

	const fetchTests = useCallback(
		async (page, q) => {
			try {
				const p = page || 1;
				const url = `lab-tests?page=${p}&limit=24&q=${q || ''}&hmo_id=${
					hmo.id
				}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				dispatch(setLabTests({ hmo, result: [...result] }));
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch lab tests');
			}
		},
		[dispatch, hmo]
	);

	useEffect(() => {
		if (toggle && toggle.id === hmo.id) {
			fetchTests();
		}
	}, [fetchTests, hmo, toggle]);

	const onDeleteLabTest = async data => {
		try {
			dispatch(startBlock());
			const rs = await request(`lab-tests/${data.id}`, 'DELETE', true);
			dispatch(deleteLabTest(rs));
			notifySuccess('Lab test deleted');
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error deleting lab test');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLabTest, data);
	};

	const onNavigatePage = nextPage => {
		fetchTests(nextPage, keyword);
	};

	const onClickEdit = data => {
		doToggleForm(true, data);
	};

	const addParameters = item => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setLabTest(item);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setLabTest(null);
	};

	const onSearchChange = item => {
		setSearchValue(item);
	};

	const [searchValue, setSearchValue] = useSearchInputState(() => {
		doSearch(searchValue ?? '');
	});

	const doSearch = async q => {
		dispatch(startBlock());
		await fetchTests(1, q);
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
					}}
				>
					<i className={`os-icon os-icon-${toggle ? 'minus' : 'common-03'}`} />
				</div>
				<h6 className="filter-header">{hmo.name}</h6>
				{!loaded && toggle && toggle.id === hmo.id ? (
					<TableLoading />
				) : (
					<div
						className="filter-body"
						style={{ display: toggle ? 'block' : 'none' }}
					>
						<div className="row">
							<div className="col-lg-12">
								<div className="element-search">
									<input
										placeholder="Search lab tests..."
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
								{tests &&
									tests.result.map((item, i) => {
										return (
											<div className="col-lg-4 mb-2" key={i}>
												<div className="pipeline white p-1 mb-2">
													<div className="pipeline-body">
														<div className="pipeline-item">
															<div className="pi-controls">
																{hmo.name === 'Private' && (
																	<div className="pi-settings os-dropdown-trigger">
																		{item.hasParameters && (
																			<Tooltip title="Add Parameters">
																				<i
																					className="os-icon os-icon-grid-10 mr-1"
																					onClick={() => addParameters(item)}
																				/>
																			</Tooltip>
																		)}
																		<Tooltip title="Edit Test">
																			<i
																				className="os-icon os-icon-ui-49 mr-1"
																				onClick={() => onClickEdit(item)}
																			/>
																		</Tooltip>
																		<Tooltip title="Delete Test">
																			<i
																				className="os-icon os-icon-ui-15 text-danger"
																				onClick={() => confirmDelete(item)}
																			/>
																		</Tooltip>
																	</div>
																)}
															</div>
															<div className="pi-body mt-3">
																<div className="pi-info">
																	<div className="h6 pi-name h7">
																		{item.name}
																	</div>
																	<div className="pi-sub">
																		{item?.category?.name}
																	</div>
																	<div className="pi-sub">
																		{formatCurrency(item.service?.tariff || 0)}
																	</div>
																</div>
															</div>
															<div className="pi-foot">
																<div className="tags">
																	{item.specimens?.map((s, i) => (
																		<a key={i} className="tag">
																			{s.label}
																		</a>
																	)) || ''}
																</div>
																<a className="extra-info">
																	<span>{`${
																		item?.parameters?.length || 0
																	} parameters`}</span>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								{tests && tests.result.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}
									>
										No lab tests
									</div>
								)}
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} lab tests`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			{showModal && (
				<ModalLabParameters closeModal={() => closeModal()} labTest={labTest} />
			)}
		</div>
	);
};

export default HmoTests;
