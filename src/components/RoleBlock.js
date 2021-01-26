/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { request } from '../services/utilities';
import { notifyError } from '../services/notify';
import { rolesAPI } from '../services/constants';
import { loadRoles } from '../actions/role';
import { loadPermissions } from '../actions/permission';
import EditRole from './EditRole';
import RolePermissionModal from './Modals/RolePermissionModal';
import TableLoading from './TableLoading';

class RoleBlock extends Component {
	state = {
		loading: false,
		role: null,
		showModal: false,
	};

	componentDidMount() {
		this.fetchRoles();
	}

	fetchPermissions = async () => {
		try {
			const rs = await request('settings/permissions', 'GET', true);
			this.props.loadPermissions(rs);
		} catch (error) {
			this.setState({ loading: false });
			notifyError(error.message || 'could not fetch permissions');
		}
	};

	fetchRoles = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request(`${rolesAPI}`, 'GET', true);
			this.props.loadRoles(rs);
			this.fetchPermissions();
			this.setState({ loading: false });
		} catch (error) {
			// console.log(error);
			this.setState({ loading: false });
			notifyError(error.message || 'could not fetch roles');
		}
	};

	editRole = role => () => {
		this.setState({ role: null }, () => {
			this.setState({ role });
		});
	};

	cancelEditRole = () => {
		this.setState({ role: null });
	};

	openPermissionModal = role => () => {
		document.body.classList.add('modal-open');
		this.setState({ role, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ role: null, showModal: false });
	};

	render() {
		const { roles } = this.props;
		const { loading, role, showModal } = this.state;
		return (
			<div className="row">
				<div className="col-lg-8">
					<div className="element-wrapper">
						<div className="element-box p-3 m-0">
							{loading ? (
								<TableLoading />
							) : (
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>S/N</th>
												<th>Name</th>
												<th>Description</th>
												<th className="text-right">Actions</th>
											</tr>
										</thead>
										<tbody>
											{roles.map((role, i) => {
												return (
													<tr key={i}>
														<td>{role.id}</td>
														<td>{role.name}</td>
														<td>{role.description}</td>
														<td className="row-actions text-right">
															<a
																onClick={this.editRole(role)}
																className="secondary"
																title="Edit Role">
																<i className="os-icon os-icon-edit-32" />
															</a>
															<a
																onClick={this.openPermissionModal(role)}
																className="secondary"
																title="Permission Modal">
																<i className="icon-feather-lock" />
															</a>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>
				{!showModal && role && (
					<div className="col-lg-4 col-xxl-3  d-xxl-block">
						<EditRole cancelEditRole={this.cancelEditRole} role={role} />
					</div>
				)}
				{showModal && role && (
					<RolePermissionModal role={role} closeModal={this.closeModal} />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roles: state.role.roles,
	};
};

export default connect(mapStateToProps, { loadRoles, loadPermissions })(
	RoleBlock
);
