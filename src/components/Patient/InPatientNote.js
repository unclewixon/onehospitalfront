/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import startCase from 'lodash.startcase';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import VisitNote from '../Admission/VisitNote';
import { staffname } from '../../services/utilities';
import { admissionAPI } from '../../services/constants';

const InPatientNote = () => {
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
	const patient = useSelector(state => state.user.patient);

	const fetchNotes = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${admissionAPI}/${admission.id}/ward-rounds?page=${p}&limit=10&visit=soap`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setNotes(result);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching notes');
			}
		},
		[dispatch, admission]
	);

	useEffect(() => {
		if (loading) {
			fetchNotes();
			setLoading(false);
		}
	}, [fetchNotes, loading]);

	const onNavigatePage = nextPage => {
		fetchNotes(nextPage);
	};

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = reset => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		if (reset) {
			fetchNotes();
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					<a
						className="btn btn-sm btn-secondary text-white ml-3"
						onClick={() => newEntry()}>
						S . O . A . P
					</a>
				</div>
				<h6 className="element-header">In-Patient Note</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Note</th>
										<th nowrap="nowrap">Noted By</th>
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
															__html: `<strong class="float-left mr-2"><em>${startCase(
																item.type
															)}:</em></strong> ${
																item.type === 'diagnosis'
																	? `${item.diagnosis.description} - ${item.diagnosis.type}`
																	: item.description
															}`,
														}}
													/>
												</td>
												<td nowrap="nowrap">{staffname(item.staff)}</td>
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
				<VisitNote closeModal={closeModal} item={admission} patient={patient} />
			)}
		</div>
	);
};

export default InPatientNote;
