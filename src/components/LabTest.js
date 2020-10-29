import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { confirmAction, itemRender, request } from '../services/utilities';
import searchingGIF from '../assets/images/searching.gif';
import { notifyError, notifySuccess } from '../services/notify';
import { getAllLabTests, deleteLabTest } from '../actions/settings';

const LabTest = props => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const fetchTests = async page => {
		try {
			const p = page || 1;
			const url = `lab-tests?page=${p}&limit=24`;
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
		fetchTests(nextPage);
	};

	return (
		<div className="row">
			<div className="col-lg-12">
				<div className="pipelines-w">
					<div className="row">
						{!loaded ? (
							<div colSpan="4" className="text-center">
								<img alt="searching" src={searchingGIF} />
							</div>
						) : (
							<>
								{props.labTests.map((item, i) => {
									return (
										<div className="col-lg-4 col-xxl-3 mb-3" key={i}>
											<div className="pipeline-item">
												<div className="pi-controls">
													<div className="pi-settings os-dropdown-trigger">
														<i
															className="os-icon os-icon-ui-49"
															onClick={() => onClickEdit(item)}></i>
													</div>
													<div className="pi-settings os-dropdown-trigger">
														<i
															className="os-icon os-icon-ui-15"
															onClick={() => confirmDelete(item)}></i>
													</div>
												</div>
												<div className="pi-body">
													<div className="pi-info">
														<div className="h6 pi-name mt-2">{item.name}</div>
														{item.category && (
															<div className="pi-sub">{item.category.name}</div>
														)}
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
							</>
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
	);
};

const mapStateToProps = state => {
	return {
		categories: state.settings.lab_categories,
		labTests: state.settings.lab_tests,
	};
};

export default connect(mapStateToProps)(LabTest);
