/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import debounce from 'lodash.debounce';

import { confirmAction, itemRender, request } from '../services/utilities';
import searchingGIF from '../assets/images/searching.gif';
import { notifyError, notifySuccess } from '../services/notify';
import { getAllLabTests, deleteLabTest } from '../actions/settings';
import ModalLabParameters from '../components/Modals/ModalLabParameters';
import { startBlock, stopBlock } from '../actions/redux-block';

const LabTest = props => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [labTest, setLabTest] = useState(null);
	const [currentPage, setCurrentPage] = useState(null);
	const [keyword, setKeyword] = useState('');
	const [toggled, setToggled] = useState([]);

	const hmos = useSelector(state => state.settings.hmos);

	const dispatch = useDispatch();

	const fetchTests = async (page, q) => {
		try {
			const p = page || 1;
			setCurrentPage(p);
			const url = `lab-tests?page=${p}&limit=24&q=${q || ''}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			dispatch(getAllLabTests([...result]));
			setMeta(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setLoaded(true);
		} catch (e) {
			notifyError(e.message || 'could not fetch lab tests');
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetchTests();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded]);

	const onClickEdit = data => {
		props.doToggleForm(true, data);
	};

	const onDeleteLabTest = async data => {
		try {
			const rs = await request(`lab-tests/${data.id}`, 'DELETE', true);
			dispatch(deleteLabTest(rs));
			notifySuccess('Lab test deleted');
		} catch (error) {
			notifyError('Error deleting lab test');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLabTest, data);
	};

	const onNavigatePage = nextPage => {
		fetchTests(nextPage, keyword);
	};

	const addParameters = item => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setLabTest(item);
	};

	const closeModal = () => {
		fetchTests(currentPage, keyword);
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setLabTest(null);
	};

	const search = useCallback(
		debounce(async q => {
			dispatch(startBlock());
			await fetchTests(1, q);
			dispatch(stopBlock());
		}, 1000),
		[]
	);

	useEffect(() => {
		search(keyword);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);

	const doToggle = index => {
		const found = toggled.find(t => t.id === index);
		if (found) {
			setToggled([...toggled.filter(t => t.id !== index)]);
		} else {
			setToggled([...toggled, { id: index }]);
		}
	};

	return (
		<div className="row">
			<div className="col-lg-12">
				<div className="rentals-list-w">
					{!loaded ? (
						<div className="text-center">
							<img alt="searching" src={searchingGIF} />
						</div>
					) : (
						hmos.map((hmo, i) => {
							const toggle = toggled.find(t => t.id === i);
							return (
								<div
									className="filter-side"
									style={{ flex: '0 0 100%' }}
									key={i}>
									<div className={`filter-w ${toggle ? '' : 'collapsed'}`}>
										<div className="filter-toggle" onClick={() => doToggle(i)}>
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
															placeholder="Search lab tests..."
															value={keyword}
															onChange={e => setKeyword(e.target.value)}
														/>
													</div>
												</div>
											</div>
											<div className="pipelines-w mt-4">
												<div className="row">
													{props.labTests
														.filter(lab => lab.hmo && lab.hmo.name === hmo.name)
														.map((item, i) => {
															return (
																<div className="col-lg-4 mb-2" key={i}>
																	<div className="pipeline white p-1 mb-2">
																		<div className="pipeline-body">
																			<div className="pipeline-item">
																				<div className="pi-controls">
																					<div className="pi-settings os-dropdown-trigger">
																						{item.hasParameters && (
																							<Tooltip title="Add Parameters">
																								<i
																									className="os-icon os-icon-grid-10 mr-1"
																									onClick={() =>
																										addParameters(item)
																									}
																								/>
																							</Tooltip>
																						)}
																						<Tooltip title="Edit Test">
																							<i
																								className="os-icon os-icon-ui-49 mr-1"
																								onClick={() =>
																									onClickEdit(item)
																								}
																							/>
																						</Tooltip>
																						<Tooltip title="Delete Test">
																							<i
																								className="os-icon os-icon-ui-15 text-danger"
																								onClick={() =>
																									confirmDelete(item)
																								}
																							/>
																						</Tooltip>
																					</div>
																				</div>
																				<div className="pi-body mt-2">
																					<div className="pi-info">
																						<div className="h6 pi-name h7">
																							{item.name}
																						</div>
																						<div className="pi-sub">
																							{item.category.name}
																						</div>
																					</div>
																				</div>
																				<div className="pi-foot">
																					<div className="tags">
																						{item.specimens &&
																							item.specimens.map((s, i) => (
																								<a key={i} className="tag">
																									{s.label}
																								</a>
																							))}
																					</div>
																					<a className="extra-info">
																						<span>{`${item.parameters.length} parameters`}</span>
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															);
														})}
													{props.labTests.length === 0 && (
														<div
															className="alert alert-info text-center"
															style={{ width: '100%' }}>
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
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
			{showModal && (
				<ModalLabParameters closeModal={() => closeModal()} labTest={labTest} />
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		categories: state.settings.lab_categories,
		labTests: state.settings.lab_tests,
	};
};

export default connect(mapStateToProps)(LabTest);
