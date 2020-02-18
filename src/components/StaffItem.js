/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';

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
		const { enabled } = this.props;
		const { collapsed } = this.state;
		return (
			<>
				<tr>
					<td><div role="button" tabIndex="0" className={`row-expand-icon ${collapsed ? 'row-collapsed' : 'row-expanded'}`} onClick={this.toggle}/></td>
					<td>ST123</td>
					<td>John Mayers</td>
					<td>john.meyers</td>
					<td>56366383</td>
					<td>56366383</td>
					<td>Nursing</td>
					<td className="text-center">
						{enabled === 1 ? (
							<Tooltip title="Enabled"><div className="status-pill green"/></Tooltip>
						) : (
							<Tooltip title="Disabled"><div className="status-pill red"/></Tooltip>
						)}
					</td>
					<td className="text-right row-actions">
						<a href="#" onClick={this.doEditStaff} className="secondary" title="Edit Staff">
							<i className="os-icon os-icon-edit-32" />
						</a>
						{enabled === 1 ? (
							<a href="#" onClick={this.doDisable}className="danger" title="Disable Staff">
								<i className="os-icon os-icon-x-circle" />
							</a>
						) : (
							<a href="#" onClick={this.doEnable} className="success" title="Enable Staff">
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
											<th>Specialization</th>
											<td>Consultant</td>
										</tr>
										<tr>
											<th>Email</th>
											<td>caihedoro@gmail.com</td>
										</tr>
										<tr>
											<th>Consultant</th>
											<td>YES</td>
										</tr>
										<tr>
											<th>Folio Number</th>
											<td>RA(MLS):18881</td>
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
