/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import {
	request,
	itemRender,
	formatDate,
	getCustomGestationAge,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { staffname } from '../../services/utilities';
import NewAssessment from './NewAssessment';
import { antenatalAPI } from '../../services/constants';

const limit = 12;

const AntenatalAssessment = ({ can_request = true }) => {
	const [loading, setLoading] = useState(true);
	const [assessments, setAssessments] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const antenatal = useSelector(state => state.user.item);

	const fetchAssessments = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${antenatalAPI}/assessments/${antenatal.id}?page=${p}&limit=${limit}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setAssessments([...result]);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching assessments');
				dispatch(stopBlock());
			}
		},
		[antenatal, dispatch]
	);

	useEffect(() => {
		if (loading) {
			fetchAssessments();
			setLoading(false);
		}
	}, [fetchAssessments, loading]);

	const onNavigatePage = nextPage => {
		fetchAssessments(nextPage);
	};

	const newAssessment = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const refreshAssessments = async () => {
		await fetchAssessments();
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{can_request && (
						<a
							className="btn btn-sm btn-secondary text-white ml-3"
							onClick={() => newAssessment()}>
							New Assessment
						</a>
					)}
				</div>
				<h6 className="element-header">Antenatal Assessments</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>G.A.</th>
										<th>Measurements</th>
										<th>Fetal Lie</th>
										<th>Presentation</th>
										<th>Comment</th>
										<th>By</th>
									</tr>
								</thead>
								<tbody>
									{assessments.map((item, i) => {
										const rtbrim = item.relationship_to_brim
											? ` - [${item.relationship_to_brim}]`
											: '';
										return (
											<tr key={i}>
												<td nowrap="nowrap">
													{formatDate(item.createdAt, 'D-MMM-YYYY h:mm A')}
												</td>
												<td>
													{getCustomGestationAge(item.createdAt, antenatal.lmp)}
												</td>
												<td>
													{item.measurement.fetal_heart_rate && (
														<>{`FHR: ${item.measurement.fetal_heart_rate}`}</>
													)}
													{item.measurement.fetal_heart_rate &&
														item.measurement.height_of_fundus && <br />}
													{item.measurement.height_of_fundus && (
														<>{`Fundus Height: ${item.measurement.height_of_fundus}cm`}</>
													)}
													{!item.measurement.fetal_heart_rate &&
														!item.measurement.height_of_fundus &&
														'--'}
												</td>
												<td>{item.fetal_lie || '--'}</td>
												<td>{`${item.position_of_foetus || '--'}${rtbrim}`}</td>
												<td>
													<div
														dangerouslySetInnerHTML={{
															__html: item.comment?.description || '--',
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
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			{showModal && (
				<NewAssessment
					closeModal={closeModal}
					appointment_id=""
					refreshAssessments={refreshAssessments}
					patient={antenatal.patient}
					antenatal={antenatal}
				/>
			)}
		</div>
	);
};

export default AntenatalAssessment;
