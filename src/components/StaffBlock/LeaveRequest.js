/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useState, Suspense } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { request } from '../../services/utilities';
import { loadStaffLeave } from '../../actions/hr';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { API_URI } from '../../services/constants';
import Tooltip from 'antd/lib/tooltip';
import ModalLeaveRequest from './../Modals/ModalLeaveRequest';

const LeaveRequest = ({
	loadStaffLeave,
	staffLeaves,
	location,
	staff
}) => {
	const [searching, setSearching] = useState(false);
	const [activeRequest, setActiveRequest] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const onModalClick = () => {
		setShowModal(!showModal)
	}
	const getLeaveRequests = useCallback(async () => {
		setSearching(true)
		try {
			const res = await request(`${API_URI}/hr/leave-management`, 'GET', true);
			const filteredRes = res && res.length ? res.filter(leave => leave.leaveType !== "excuse_duty") : []
			loadStaffLeave(filteredRes);
			setSearching(false)
			notifySuccess('Successful fetching leave applications')
		} catch (error) {
			setSearching(false)
			notifyError('Could not fetch leave applications')
		}
	}, [loadStaffLeave])

	useEffect(() => {
		getLeaveRequests()
	}, [getLeaveRequests])


	return (
		<div className="row my-4">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className="btn btn-primary btn-sm text-white"
							to={`${location.pathname}#create-leave`}>
							<i className="os-icon os-icon-ui-22" />
							<span>Apply for leave</span>
						</Link>
					</div>
					<h6 className="element-header">Leave Requests</h6>
					{
						activeRequest ? (
						<ModalLeaveRequest 
							showModal={showModal}
							activeRequest={activeRequest}
							staff={staff}
							onModalClick={onModalClick}
						/>
							) : null
					}
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th data-field="id">
											<div className="th-inner sortable both "></div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="owner">
											<div className="th-inner sortable both ">
												Type
												</div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="project">
											<div className="th-inner sortable both ">
												Date start
												</div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="project">
											<div className="th-inner sortable both ">
												Date return
												</div>
											<div className="fht-cell"></div>
										</th>
										<th data-field="project">
											<div className="th-inner sortable both ">
												status
												</div>
											<div className="fht-cell"></div>
										</th>

										<th data-field="5">
											<div className="th-inner ">Actions</div>
											<div className="fht-cell"></div>
										</th>
									</tr>
								</thead>
								<tbody>
									{
										searching ? (
											<tr>
												<td><img src={searchingGIF} alt="searching" /></td>
											</tr>
										) : staffLeaves && staffLeaves.length ?
												staffLeaves.map((leave, index) => {
													return (
														<tr key={index}>
															<td>
																{index + 1}
															</td>
															<td>
																{leave.category && leave.category.name ? leave.category.name : ""}
															</td>
															<td>
																{leave.start_date}
															</td>
															<td>
																{leave.end_date}
															</td>
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
																	)
																}
															</td>
															<td>
																<Tooltip title="View Request">
																	<a
																		style={{height: '2rem', width: '2rem'}}
																		onClick={() => {
																			onModalClick();
																			setActiveRequest(leave);
																		}}>
																		<i className="os-icon os-icon-documents-03" />
																	</a>
																</Tooltip>
															</td>
														</tr>
													)
												}) : (
													<div>
														<p>'There are no available leave applications'</p>
													</div>
												)
									}
								</tbody>


							</table>

							<div className="controls-below-table">
								<div className="table-records-info">
									Showing records 1 - 5
									</div>
								<div className="table-records-pages">
									<ul>
										<li>
											<a href="#">Previous</a>
										</li>
										<li>
											<a className="current" href="#">
												1
												</a>
										</li>
										<li>
											<a href="#">2</a>
										</li>
										<li>
											<a href="#">3</a>
										</li>
										<li>
											<a href="#">4</a>
										</li>
										<li>
											<a href="#">Next</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStatetoProps = state => {
	return {
		staffLeaves: state.hr.staff_leave,
		staff: state.user.staff
	}
}

export default withRouter(connect(mapStatetoProps, {
	loadStaffLeave
})(LeaveRequest));
