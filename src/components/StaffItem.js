/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { Image } from 'react-bootstrap';
import capitalize from 'lodash.capitalize';
import { connect } from 'react-redux';

import { request, updateImmutable, formatDate } from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import { staffname, parseAvatar } from '../services/utilities';

class StaffItem extends Component {
	state = {
		collapsed: null,
		form_visible: false,
		uploading: false,
	};

	toggle = id => () => {
		const collapsed = this.state.collapsed;
		this.setState({ collapsed: collapsed === id ? null : id });
	};

	doEnable = async (e, data) => {
		try {
			e.preventDefault();
			const { staffs } = this.props;
			const url = `hr/staffs/${data.id}/enable`;
			await request(url, 'PATCH', true);
			data.isActive = true;
			const upd = updateImmutable(staffs, data);
			this.props.updateStaffs(upd);
			notifySuccess('Staff Enabled');
		} catch (error) {
			console.log(error);
			notifyError('Error Enabling Staff');
		}
	};

	doDisable = async (e, data) => {
		try {
			e.preventDefault();
			const { staffs } = this.props;
			const url = `hr/staffs/${data.id}`;
			await request(url, 'DELETE', true);
			data.isActive = false;
			const upd = updateImmutable(staffs, data);
			this.props.updateStaffs(upd);
			notifySuccess('Staff Disabled');
		} catch (error) {
			console.log(error);
			notifyError('Error Disabling Staff');
		}
	};

	hide = () => {
		this.setState({ form_visible: false });
	};

	render() {
		const { staffs, editStaff, profile } = this.props;
		const { collapsed } = this.state;
		return (
			<>
				{staffs.map((item, i) => {
					return (
						<Fragment key={i}>
							<tr>
								<td onClick={this.toggle(item.id)} className="user-avatar-w">
									<div className="user-avatar">
										<Image
											alt=""
											src={parseAvatar(item?.profile_pic)}
											width={50}
										/>
									</div>
								</td>
								<td onClick={this.toggle(item.id)}>{`${capitalize(
									staffname(item)
								)} (${item.user.username})`}</td>
								<td onClick={this.toggle(item.id)}>{item?.user?.role?.name}</td>
								<td onClick={this.toggle(item.id)}>{item?.phone_number}</td>
								<td onClick={this.toggle(item.id)}>
									{item.department ? item.department.name : '--'}
								</td>
								<td>{formatDate(item.createdAt, 'D-MMM-YYYY h:mma')}</td>
								<td className="text-center">
									{item.isActive ? (
										<Tooltip title="Enabled">
											<div className="status-pill green" />
										</Tooltip>
									) : (
										<Tooltip title="Disabled">
											<div className="status-pill red" />
										</Tooltip>
									)}
								</td>
								<td className="row-actions">
									<Tooltip title="Edit Staff">
										<a onClick={() => editStaff(item, false)}>
											<i className="os-icon os-icon-edit-1" />
										</a>
									</Tooltip>
									{profile.role.slug === 'it-admin' && (
										<Tooltip title="Edit Account">
											<a onClick={() => editStaff(item, true)}>
												<i className="os-icon os-icon-user-male-circle" />
											</a>
										</Tooltip>
									)}
									{item.isActive ? (
										<Tooltip title="Disable Staff">
											<a
												onClick={e => this.doDisable(e, item)}
												className="danger"
												title="Disable Staff"
											>
												<i className="os-icon os-icon-x-circle" />
											</a>
										</Tooltip>
									) : (
										<Tooltip title="Enable Staff">
											<a
												onClick={e => this.doEnable(e, item)}
												className="success"
												title="Enable Staff"
											>
												<i className="os-icon os-icon-check-circle" />
											</a>
										</Tooltip>
									)}
								</td>
							</tr>
							{collapsed && collapsed === item.id && (
								<tr className="expanded-row">
									<td />
									<td colSpan="8">
										<div className="table-responsive">
											<table className="table table-striped table-sm">
												<tbody>
													<tr>
														<th>Gender</th>
														<td>{item.gender}</td>
													</tr>
													<tr>
														<th>Email</th>
														<td>{item.email}</td>
													</tr>
													<tr>
														<th>Consultant</th>
														<td>{item.is_consultant ? 'YES' : 'NO'}</td>
													</tr>
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							)}
						</Fragment>
					);
				})}
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps)(StaffItem);
