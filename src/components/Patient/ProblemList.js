/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import {
	confirmAction,
	formatDate,
	itemRender,
	request,
	updateImmutable,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../TableLoading';
import RecordProblem from '../Modals/RecordProblem';
import { messageService } from '../../services/message';

const ProblemList = () => {
	const [loaded, setLoaded] = useState(false);
	const [list, setList] = useState([]);
	const [meta, setMeta] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const patient = useSelector(state => state.user.patient);

	const dispatch = useDispatch();

	const fetchProblems = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient-notes?page=${p}&limit=10&patient_id=${patient.id}&type=diagnosis`;
				const rs = await request(url, 'GET', true);
				const { result, ...paginate } = rs;
				setMeta(paginate);
				setList(result);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				setLoaded(true);
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch problems');
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (!loaded) {
			fetchProblems();
		}
	}, [fetchProblems, loaded]);

	const addProblem = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		document.body.classList.remove('modal-open');
	};

	const updateList = items => {
		console.log(items);
		setList([...items, ...list]);
		const critical = items.find(i => i?.alertItem?.category === 'critical');
		if (critical) {
			messageService.sendMessage({ type: 'refresh-alert' });
		}
	};

	const resolve = async id => {
		confirmAction(
			doResolve,
			id,
			'Do you want to resolve this problem?',
			'Are you sure?'
		);
	};

	const doResolve = async id => {
		try {
			dispatch(startBlock());
			const url = `patient-notes/${id}/resolve`;
			const rs = await request(url, 'POST', true);
			setList(updateImmutable(list, rs.data));
			dispatch(stopBlock());
		} catch (e) {
			setLoaded(true);
			dispatch(stopBlock());
			notifyError(e.message || 'could not resolve problem');
		}
	};

	const onNavigatePage = async nextPage => {
		await fetchProblems(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<a
						className="btn btn-sm btn-secondary text-white"
						onClick={() => addProblem()}
					>
						Add Diagnosis
					</a>
				</div>
				<h6 className="element-header">Problem List</h6>
				<div className="element-box p-3 m-0">
					<div className="bootstrap-table">
						<div className="fixed-table-container pb-0">
							<div className="fixed-table-body">
								{!loaded ? (
									<TableLoading />
								) : (
									<>
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Date</th>
													<th>Diagnosis</th>
													<th>Type</th>
													<th>Comment</th>
													<th>Consultant</th>
													<th>Status</th>
												</tr>
											</thead>
											<tbody>
												{list.map((item, i) => {
													return (
														<tr key={i}>
															<td>
																{formatDate(
																	item.createdAt,
																	'DD-MMM-YYYY h:mmA'
																)}
															</td>
															<td>{`${item.diagnosis.type.toUpperCase()} (${
																item.diagnosis.code
															}): ${item.diagnosis.description}`}</td>
															<td>{item.diagnosis_type}</td>
															<td>{item.comment || ''}</td>
															<td>{item.createdBy}</td>
															<td>
																{item.status === 'Active' ? (
																	<>
																		{item.status} |{' '}
																		<a onClick={() => resolve(item.id)}>
																			Resolve
																		</a>
																	</>
																) : (
																	<>
																		{item.status}
																		<br />
																		<small className="bold">{`by ${item.resolved_by}`}</small>
																		<br />
																		<small className="bold">
																			{formatDate(
																				item.resolved_at,
																				'DD-MMM-YYYY'
																			)}
																		</small>
																	</>
																)}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</>
								)}
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} problems`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
				{showModal && (
					<RecordProblem closeModal={closeModal} update={updateList} />
				)}
			</div>
		</div>
	);
};

export default ProblemList;
