/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import CreateObservation from './Modals/CreateObservation';
import { staffname } from '../../services/utilities';

const NurseObservation = () => {
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();
	const admission = useSelector(state => state.user.item);

	const fetchObservations = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient-notes?page=${p}&limit=10&type=nurse-observation&admission_id=${admission.id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setNotes(result);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching nurse observations');
			}
		},
		[admission, dispatch]
	);

	useEffect(() => {
		if (loading) {
			fetchObservations();
			setLoading(false);
		}
	}, [fetchObservations, loading]);

	const onNavigatePage = nextPage => {
		fetchObservations(nextPage);
	};

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const updateNote = item => {
		setNotes([item, ...notes]);
		setMeta({
			currentPage: 1,
			itemsPerPage: 10,
			totalPages: notes.length + 1,
		});
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{admission && admission.status === 0 && (
						<a
							className="btn btn-sm btn-secondary text-white"
							onClick={() => newEntry()}>
							New Note
						</a>
					)}
				</div>
				<h6 className="element-header">Observation Notes</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th>Date</th>
										<th>Note</th>
										<th nowrap="nowrap">Noted By</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{notes.map((item, i) => {
										return (
											<tr key={i}>
												<td nowrap="nowrap">
													{formatDate(item.createdAt, 'D-MMM-YYYY h:mm A')}
												</td>
												<td>
													<div
														dangerouslySetInnerHTML={{
															__html: item.description,
														}}
													/>
												</td>
												<td nowrap="nowrap">{staffname(item.staff)}</td>
												<td></td>
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
										showTotal={total => `Total ${total} items`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			{showModal && (
				<CreateObservation
					closeModal={closeModal}
					updateNote={updateNote}
					item={admission}
				/>
			)}
		</div>
	);
};

export default NurseObservation;
