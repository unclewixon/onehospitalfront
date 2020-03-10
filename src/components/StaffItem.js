/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import { editStaff } from '../actions/general';

class StaffItem extends Component {
	state = {
		collapsed: true,
	};

	toggle = () => {
		this.setState({ collapsed: !this.state.collapsed });
	}

	doEditStaff = e => {
		e.preventDefault();
		console.log('edit staff');
		this.props.editStaff(true);
	};

	doEnable = e => {
		e.preventDefault();
		console.log('enable staff');
	};

	doDisable = e => {
		e.preventDefault();
		console.log('disable staff');
	};

	render() {
		const { staff } = this.props;
		const { collapsed } = this.state;
		return (
			<>
				<tr>
					<td><div role="button" tabIndex="0" className={`row-expand-icon ${collapsed ? 'row-collapsed' : 'row-expanded'}`} onClick={this.toggle}/></td>
					<td>{staff.emp_code}</td>
					<td>{`${staff.first_name} ${staff.last_name}`}</td>
					<td>{staff.user.username}</td>
					<td>{staff.job_title}</td>
					<td>{staff.phone_number}</td>
					<td>{staff.department.name}</td>
					<td className="text-center">
						{staff.isActive ? (
							<Tooltip title="Enabled"><div className="status-pill green"/></Tooltip>
						) : (
							<Tooltip title="Disabled"><div className="status-pill red"/></Tooltip>
						)}
					</td>
					<td className="text-right row-actions">
						{/* <a onClick={this.doEditStaff} className="secondary" title="Edit Staff">
							<i className="os-icon os-icon-edit-32" />
						</a> */}
						{staff.isActive ? (
							<a onClick={this.doDisable}className="danger" title="Disable Staff">
								<i className="os-icon os-icon-x-circle" />
							</a>
						) : (
							<a onClick={this.doEnable} className="success" title="Enable Staff">
								<i className="os-icon os-icon-check-circle" />
							</a>
						)}
					</td>
				</tr>
				{!collapsed && (
					<tr className="expanded-row">
						<td/>
						<td colSpan="8">
							<div className="table-responsive">
								<table className="table table-striped table-sm">
									<tbody>
										<tr>
											<th>Gender</th>
											<td>{staff.gender}</td>
										</tr>
										<tr>
											<th>Email</th>
											<td>{staff.email}</td>
										</tr>
										<tr>
											<th>Consultant</th>
											<td>{staff.is_consultant ? 'YES' : 'NO'}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</td>
					</tr>
				)}
			</>
		);
	}
}

export default connect(null, { editStaff })(StaffItem);
