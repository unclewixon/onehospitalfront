/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';

import { redirectToPage, request } from '../../services/utilities';
import { loadStaffLeave } from '../../actions/hr';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import ModalExcuseDuty from '../Modals/ModalExcuseDuty';
import ModalEditExcuse from '../Modals/ModalEditExcuse';
import { confirmAction } from '../../services/utilities';

const ExcuseDuty = ({
	loadStaffLeave,
	staffLeaves,
	location,
	staff,
	history,
}) => {
	const [searching, setSearching] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

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
		setSearching(true);
		try {
			const res = await request(`hr/leave-management/excuse-duty`, 'GET', true);
			loadStaffLeave(res);
			setSearching(false);
		} catch (error) {
			setSearching(false);
			notifyError('Could not fetch excuse duties');
		}
	}, [loadStaffLeave]);

	useEffect(() => {
		getLeaveRequests();
	}, [getLeaveRequests]);

	const deleteLeaveRequests = async data => {
		try {
			await request(`hr/leave-management/${data.id}`, 'DELETE', true);
			notifySuccess('Successful removed leave applications');
			getLeaveRequests();
		} catch (error) {
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

	const redirect = e => {
		e.preventDefault();
		history.push(`${location.pathname}/new`);
	};

	return (
		<div className="row my-4">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<button
							className="btn btn-primary btn-sm text-white"
							onClick={e => redirect(e)}>
							<i className="os-icon os-icon-ui-22" />
							<span>New Excuse Duty</span>
						</button>
					</div>
					<h6 className="element-header">Excuse Duty</h6>
					{activeRequest ? (
						<ModalExcuseDuty
							showModal={showModal}
							activeRequest={activeRequest}
							staff={staff}
							onModalClick={onModalClick}
						/>
					) : null}
					{activeRequest ? (
						<ModalEditExcuse
							showModal={showEdit}
							activeRequest={activeRequest}
							staff={staff}
							onModalClick={onEditClick}
							onExitModal={onExitModal}
						/>
					) : null}
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th data-field="id">
											<div className="th-inner sortable both "></div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="project">
											<div className="th-inner sortable both ">Date start</div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="project">
											<div className="th-inner sortable both ">Date return</div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="project">
											<div className="th-inner sortable both ">status</div>
											<div className="fht-cell"></div>
										</th>

										<th data-field="5">
											<div className="th-inner ">Actions</div>
											<div className="fht-cell"></div>
										</th>
									</tr>
								</thead>
								<tbody>
									{searching ? (
										<tr>
											<td>
												<img src={searchingGIF} alt="searching" />
											</td>
										</tr>
									) : staffLeaves && staffLeaves.length ? (
										staffLeaves.map((leave, index) => {
											return (
												<tr key={index}>
													<td>{index + 1}</td>
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
										})
									) : null}
								</tbody>
							</table>

							<div className="controls-below-table">
								<div className="table-records-info">
									Showing {staffLeaves.length} records{' '}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStatetoProps = state => {
	return {
		staffLeaves: state.hr.staff_leave,
		staff: state.user.staff,
	};
};

export default withRouter(
	connect(mapStatetoProps, {
		loadStaffLeave,
	})(ExcuseDuty)
);
