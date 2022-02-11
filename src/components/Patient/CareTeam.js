/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import AddEditTeam from './Modals/AddEditTeam';
import { staffname } from '../../services/utilities';

const CareTeam = ({ can_request, type, itemId }) => {
	const [loading, setLoading] = useState(true);
	const [members, setMembers] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();
	const patient = useSelector(state => state.user.patient);

	const fetchMembers = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `care-teams?patient_id=${patient.id}&page=${p}&limit=10&type=${type}&id=${itemId}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMembers(result);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching team member');
			}
		},
		[dispatch, itemId, patient, type]
	);

	useEffect(() => {
		if (loading) {
			fetchMembers();
			setLoading(false);
		}
	}, [fetchMembers, loading]);

	const onNavigatePage = nextPage => {
		fetchMembers(nextPage);
	};

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const updateMembers = items => {
		const allMembers = [...items];
		setMembers(allMembers);
		setMeta({
			currentPage: 1,
			itemsPerPage: 10,
			totalPages: allMembers.length + 1,
		});
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{can_request && (
						<a
							className="btn btn-sm btn-secondary text-white ml-3"
							onClick={() => newEntry()}
						>
							Add/Edit Team Member
						</a>
					)}
				</div>
				<h6 className="element-header">Care Team</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th>Date</th>
										<th>Team/Member Name</th>
										<th>Team/Member Details</th>
									</tr>
								</thead>
								<tbody>
									{members.map((item, i) => {
										return (
											<tr key={i}>
												<td nowrap="nowrap">
													{formatDate(item.createdAt, 'D-MMM-YYYY h:mm A')}
												</td>
												<td>
													{staffname(item.member)}{' '}
													{item.is_primary_care_giver && (
														<span className="badge badge-success">
															primary care giver
														</span>
													)}
												</td>
												<td>{item.member?.profession || '--'}</td>
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
										showTotal={total => `Total ${total} team members`}
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
				<AddEditTeam
					closeModal={closeModal}
					updateMembers={updateMembers}
					item_id={itemId}
					type={type}
				/>
			)}
		</div>
	);
};

export default CareTeam;
