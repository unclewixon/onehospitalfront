/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { request, confirmAction } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { rolesAPI } from '../../services/constants';
import { loadRoles, deleteRole } from '../../actions/role';
import CreateRole from './../CreateRole';
import EditRole from './../EditRole';
import PatientForm from '../PatientForm';
import PatientNOKForm from '../PatientNOKForm';
import CreateImmunization from './CreateImmunization';

class EnrollImmunization extends Component {
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
			const rs = await request(`${rolesAPI}`, 'GET', true);
			this.props.loadRoles(rs);
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			notifyError(error.message || 'could not fetch roles');
		}
	};

	editRole = (role, action) => () => {
		this.setState({ roleID: null, edit: false }, () => {
			console.log(this.state.roleID);
			this.setState({ roleID: role ? role.id : role, edit: action });
			this.setState({ previousRole: role });
		});
	};

	DeleteRole = role => async () => {
		this.setState({ roleID: role.id });
		this.props
			.deleteRole(role)
			.then(response => {
				notifySuccess('Role deleted');
			})
			.catch(error => {
				notifyError('Error deleting role');
			});
	};

	confirmDelete = role => {
		confirmAction(this.DeleteRole(role), null);
	};

	render() {
		const { roles } = this.props;
		const { edit, roleID, previousRole, loading } = this.state;
		return (
			<div className="col-sm-12">
				<CreateImmunization />
				{/* <div className="element-wrapper">
					<h6 className="element-header">List</h6>
					<div className="element-box">
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>S/N</th>
										<th>Name</th>
										<th>Date</th>
										<th>Type</th>
										<th className="text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Penicillin</td>
										<td>04/12/1978</td>
										<td>Type 1</td>
										<td className="row-actions text-right">
											<a className="secondary" title="Edit">
												<i className="os-icon os-icon-edit-32" />
											</a>
											<a className="danger">
												<i className="os-icon os-icon-ui-15"></i>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		roles: state.role.roles,
	};
};

export default connect(mapStateToProps, { loadRoles, deleteRole })(
	EnrollImmunization
);
