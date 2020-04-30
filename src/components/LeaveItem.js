/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { showHistory } from '../actions/general';


const LeaveItem = ({
	leave,
	index,
	showHistory,
	modalClick,
	rejectRequest
}) => {

	return (
		<>
			<tr>
				<td>{index + 1}</td>
				<td>{leave.staff ? leave.staff : ""}</td>
				<td>
					{leave.category && leave.category.name ? leave.category.name : ""}
				</td>
				<td>
					{leave.start_date ? leave.start_date : ""}
				</td>
				<td>
					{leave.end_date ? leave.end_date : ""}
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
							className="mt-4"
							onClick={() => {
								if (typeof modalClick === 'function') {
									modalClick(leave);
								}
							}}>
							<i className="os-icon os-icon-file" />
						</a>
					</Tooltip>
					<Tooltip title="Approve Leave">
						<a
							className="mt-4"
							onClick
						>
							<i className="os-icon os-icon-thumbs-up" />
						</a>
					</Tooltip>
					<Tooltip title="Reject Leave">
						<a
							className="mt-4"
							onClick={() => rejectRequest(leave)}
						>
							<i className="os-icon os-icon-trash" />
						</a>
					</Tooltip>
				</td>
			</tr>
		</>
	);
}

export default connect(null, { showHistory })(LeaveItem);
