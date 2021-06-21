/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

import { request, confirmAction } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import ModalLeaveRequest from './../Modals/ModalLeaveRequest';
import ModalEditLeave from '../Modals/ModalEditLeave';
import TableLoading from '../TableLoading';
import { leaveMgtAPI } from '../../services/constants';

const LeaveRequest = ({ location }) => {
	const [searching, setSearching] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [staffLeaves, setStaffLeaves] = useState([]);

	const staff = useSelector(state => state.user.profile.details);

	const onModalClick = () => {
		setShowModal(!showModal);
	};
	const onEditClick = () => {
		setShowEdit(!showEdit);
	};

	const onExitModal = () => {
		setActiveRequest(null);
	};

	const getLeaveRequests = useCallback(async () => {
		if (staff) {
			try {
				setSearching(true);
				const url = `${leaveMgtAPI}?staff_id=${staff.id}`;
				const res = await request(url, 'GET', true);
				const filteredRes =
					res && res.length
						? res.filter(leave => leave.leaveType !== 'excuse_duty')
						: [];
				setStaffLeaves(filteredRes);
				setSearching(false);
			} catch (error) {
				setSearching(false);
				notifyError('Could not fetch leave applications');
			}
		}
	}, [staff]);

	useEffect(() => {
		getLeaveRequests();
	}, [getLeaveRequests]);

	const deleteLeaveRequests = async data => {
		try {
			await request(`${leaveMgtAPI}/${data.id}`, 'DELETE', true);
			notifySuccess('Successful removed leave applications');
			getLeaveRequests();
		} catch (error) {
			console.log(error);
			notifyError('Could not remove leave applications');
		}
	};

	const confirmDelete = data => {
		confirmAction(
			deleteLeaveRequests,
			data,
			'in deleting this leave application?',
			'Do you want to continue'
		);
	};

	return (
		<div className="row my-4">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary btn-sm text-white"
							to={`${location.pathname}/new`}>
							<i className="os-icon os-icon-ui-22" />
							<span>Apply for leave</span>
						</Link>
					</div>
					<h6 className="element-header">Leave Requests</h6>
					<div className="element-box m-0 p-3">
						{searching ? (
							<TableLoading />
						) : (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="id">
												<div className="th-inner sortable both "></div>
											</th>
											<th data-field="owner">
												<div className="th-inner sortable both ">Type</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">
													Date start
												</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">
													Date return
												</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">status</div>
											</th>

											<th data-field="5">
												<div>Actions</div>
											</th>
										</tr>
									</thead>
									<tbody>
										{staffLeaves.map((leave, index) => {
											return (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{leave.category?.name || ''}</td>
													<td>{leave.start_date}</td>
													<td>{leave.end_date}</td>
													<td>
														{leave.status === 1 ? (
															<div>
																<span className="status-pill smaller green"></span>
																<span>Approved</span>
															</div>
														) : (
															<div>
																<span className="status-pill smaller yellow"></span>
																<span>Pending</span>
															</div>
														)}
													</td>
													<td>
														<Tooltip title="View Request">
															<a
																style={{ height: '2rem', width: '2rem' }}
																onClick={() => {
																	onModalClick();
																	setActiveRequest(leave);
																}}>
																<i className="os-icon os-icon-folder" />
															</a>
														</Tooltip>
														{leave.status === 0 ? (
															<Tooltip title="Edit Leave">
																<a
																	style={{ height: '2rem', width: '2rem' }}
																	onClick={() => {
																		onEditClick();
																		setActiveRequest(leave);
																	}}>
																	<i className="os-icon os-icon-documents-03" />
																</a>
															</Tooltip>
														) : null}
														{leave.status === 0 ? (
															<Tooltip title="Cancel">
																<a
																	style={{ height: '2rem', width: '2rem' }}
																	onClick={() => {
																		confirmDelete(leave);
																	}}>
																	<i className="os-icon os-icon-trash" />
																</a>
															</Tooltip>
														) : null}
													</td>
												</tr>
											);
										})}
										{staffLeaves.length === 0 && (
											<tr>
												<td colSpan="6" className="text-center">
													There are no available leave applications
												</td>
											</tr>
										)}
									</tbody>
								</table>
								<div className="controls-below-table">
									<div className="table-records-info">
										Showing {staffLeaves.length} records
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{activeRequest && showModal && (
				<ModalLeaveRequest
					showModal={showModal}
					activeRequest={activeRequest}
					staff={staff}
					onModalClick={onModalClick}
				/>
			)}
			{activeRequest && showEdit && (
				<ModalEditLeave
					showModal={showEdit}
					activeRequest={activeRequest}
					staff={staff}
					onModalClick={onEditClick}
					onExitModal={onExitModal}
				/>
			)}
		</div>
	);
};

export default withRouter(LeaveRequest);
