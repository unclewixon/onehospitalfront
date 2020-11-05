/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { useSelector } from 'react-redux';
import moment from 'moment';

import searchingGIF from '../../assets/images/searching.gif';
import { Can } from '../common/Can';
import { notifyError, notifySuccess } from '../../services/notify';
import { confirmAction, request } from '../../services/utilities';

const Lab = props => {
	const [loaded, setLoaded] = useState(false);
	const [labs, setLabs] = useState([]);

	const { location } = props;

	const startDate = '';
	const endDate = '';

	const patient = useSelector(state => state.user.patient);

	const fetchLabs = useCallback(async () => {
		try {
			const url = `patient/${patient.id}/request/lab?startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			setLabs(rs);
			setLoaded(true);
		} catch (e) {
			notifyError(e.message || 'could not fetch lab requests');
			setLoaded(true);
		}
	}, [patient.id]);

	useEffect(() => {
		if (!loaded) {
			fetchLabs();
		}
	}, [fetchLabs, loaded]);

	const approve = async data => {
		try {
			const url = `patient/request/${data.id}/approve-result`;
			const res = await request(url, 'GET', true);
			if (res.success) {
				notifySuccess('Result has been approved');
				this.props.refresh();
			} else {
				notifyError(res.message);
			}
		} catch (error) {
			console.log(error);
			notifyError('Error approving result	');
		}
	};

	const confirmApproval = data => {
		confirmAction(
			approve,
			data,
			'You want to approve this result',
			'Are you sure?'
		);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Link
						to={`${location.pathname}#lab-request`}
						className="btn btn-primary btn-sm">
						<i className="os-icon os-icon-plus" />
						New Lab Request
					</Link>
				</div>
				<h6 className="element-header">Lab Requests</h6>
				<div className="element-box">
					<div className="bootstrap-table">
						<div className="fixed-table-toolbar">
							<div className="bs-bars float-left">
								<div id="toolbar" />
							</div>
						</div>
						{!loaded ? (
							<div className="text-center">
								<img alt="searching" src={searchingGIF} />
							</div>
						) : (
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}>
								<div className="fixed-table-body">
									<table
										id="table"
										className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th>Request Date</th>
												<th>Lab</th>
												<th>By</th>
												<th />
											</tr>
										</thead>
										<tbody>
											{labs.map((lab, i) => {
												return (
													<>
														{lab.requestBody.map((item, j) => {
															return (
																<tr key={j}>
																	<td>
																		<span>
																			{moment(request.createdAt).format(
																				'DD-MMM-YYYY h:mmA'
																			)}
																		</span>
																	</td>
																	<td>{item.name}</td>
																	<td>{lab.created_by}</td>
																	<td className="row-actions text-right">
																		<Tooltip title="Take Specimen">
																			<a
																				className="secondary"
																				onClick={() => {}}>
																				<i className="os-icon os-icon-folder-plus" />
																			</a>
																		</Tooltip>
																		<Tooltip title="Fill Result">
																			<a
																				className="secondary"
																				onClick={() => {}}>
																				<i className="os-icon os-icon-folder-plus" />
																			</a>
																		</Tooltip>
																		{lab.status === 0 && (
																			<Can I="approve-lab-result" on="all">
																				<Tooltip title="Approve Result">
																					<a
																						className="secondary"
																						onClick={() =>
																							confirmApproval(lab)
																						}>
																						<i className="os-icon os-icon-thumbs-up" />
																					</a>
																				</Tooltip>
																			</Can>
																		)}
																	</td>
																</tr>
															);
														})}
													</>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Lab);
