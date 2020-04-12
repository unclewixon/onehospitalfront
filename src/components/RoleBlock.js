/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { request, confirmAction } from '../services/utilities';
import { notifySuccess, notifyError } from '../services/notify';
import searchingGIF from '../assets/images/searching.gif';
import { API_URI, rolesAPI } from '../services/constants';
import { loadRoles, delete_role } from '../actions/role';
import CreateRole from './CreateRole';
import EditRole from './EditRole';

class RoleBlock extends Component {
	state = {
		edit: false,
		roleID: null,
		previousRole: null,
		loading: false,
	};

	componentDidMount() {
		this.setState({ loading: true });
		this.fetchRoles();
	}

	fetchRoles = async () => {
		try {
			const rs = await request(`${API_URI}${rolesAPI}`, 'GET', true);
			this.props.loadRoles(rs);
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			notifyError(error.message || 'could not fetch roles');
		}
	};

	editRole = (role, action) => () => {
		this.setState({ roleID: null, edit: false }, () => {
			this.setState({ roleID: role ? role.id : role, edit: action });
			this.setState({ previousRole: role });
		});
	};

	DeleteRole = role => async () => {
		this.setState({ roleID: role.id });
		try {
			const rs = await request(
				`${API_URI}/settings/roles/${role.id}`,
				'DELETE',
				true
			);
			this.setState({ edit: false, previousRole: null });
			this.props.delete_role(role);
			notifySuccess('Role deleted');
		} catch (error) {
			console.log(error);
			notifyError('Error deleting role');
		}
	};

	confirmDelete = role => {
		confirmAction(this.DeleteRole(role), null);
	};

	render() {
		const { roles } = this.props;
		const { edit, roleID, previousRole, loading } = this.state;
		return (
			<div className="row">
				<div className="col-lg-8">
					<div className="element-wrapper">
						<div className="element-box">
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
										{loading ? (
											<tr>
												<td colSpan="4" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											<>
												{roles.map((role, i) => {
													return (
														<tr key={i}>
															<td>{i + 1}</td>
															<td>{role.name}</td>
															<td>{role.description}</td>
															<td className="row-actions text-right">
																<a
																	onClick={this.editRole(role, true)}
																	className="secondary"
																	title="Edit Role">
																	<i className="os-icon os-icon-edit-32" />
																</a>
																<a
																	className="danger"
																	onClick={() => this.confirmDelete(role)}>
																	<i className="os-icon os-icon-ui-15"></i>
																</a>
															</td>
														</tr>
													);
												})}
											</>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-xxl-3  d-xxl-block">
					{edit ? (
						<EditRole
							roleID={roleID}
							editRole={this.editRole}
							previousRole={previousRole}
						/>
					) : (
						<CreateRole />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		roles: state.role.roles,
	};
};

export default connect(mapStateToProps, { loadRoles, delete_role })(RoleBlock);
