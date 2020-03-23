/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	addPermission,
	getAllPermission,
	updatePermission,
	deletePermission,
} from '../actions/settings';
import waiting from '../assets/images/waiting.gif';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { confirmAction } from '../services/utilities';

class Permission extends Component {
	state = {
		name: '',
		permissionID: null,
		create: true,
		edit: false,
		loading: false,
		loaded: false,
	};

	componentDidMount() {
		this.fetchPermission();
	}

	handleInputChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	fetchPermission = async () => {
		this.setState({ loaded: true });
		try {
			this.props.getAllPermission().then(response => {
				this.setState({ loaded: false });
			});
		} catch (error) {
			notifyError(error.message || 'could not fetch permissions');

			this.setState({ loaded: false });
		}
	};

	AddPermission = e => {
		e.preventDefault();
		this.setState({ loading: true });
		const { name } = this.state;
		this.props
			.addPermission({ name })
			.then(response => {
				this.setState({ name: '', create: true, edit: false, loading: false });
				notifySuccess('permission created!');
			})
			.catch(error => {
				this.setState({ name: '', create: true, edit: false, loading: false });
				notifyError('An error occured creating permission');
			});
	};

	onClickEdit = data => {
		this.setState({
			name: data.name,
			id: data.id,
			edit: true,
			create: false,
			data: data,
		});
	};

	onEditPermission = e => {
		e.preventDefault();
		this.setState({ loading: true });
		let { name, data } = this.state;
		this.props
			.updatePermission({ id: data.id, name }, data)
			.then(response => {
				this.setState({ name: '', create: true, edit: false, loading: false });
				notifySuccess('permission updated!');
			})
			.catch(error => {
				this.setState({ name: '', create: true, edit: false, loading: false });
				notifyError('An error occured editing permission');
			});
	};

	cancelEditButton = () => {
		this.setState({ create: true, edit: false, name: '', data: null });
	};

	DeletePermission = permission => {
		this.props
			.deletePermission(permission)
			.then(response => {
				notifySuccess('permission deleted!');
			})
			.catch(error => {
				notifyError('An error occured deleting permission');
			});
	};

	confirmDelete = permission => {
		confirmAction(this.DeletePermission, permission, null);
	};

	render() {
		let { name, edit, create, loading, loaded } = this.state;
		let { Permissions } = this.props;
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
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{loaded ? (
											<tr>
												<td colSpan="4" className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											<>
												{Permissions.map((permission, i) => {
													return (
														<tr key={i}>
															<td>{i + 1}</td>
															<td>
																<div className="value">{permission.name}</div>
															</td>
															<td className="row-actions text-right">
																<a onClick={() => this.onClickEdit(permission)}>
																	<i className="os-icon os-icon-ui-49"></i>
																</a>
																<a href="#">
																	<i className="os-icon os-icon-grid-10"></i>
																</a>
																<a
																	className="danger"
																	onClick={() =>
																		this.confirmDelete(permission)
																	}>
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
				<div className="col-lg-4 col-xxl-3">
					<div className="pipeline white lined-warning">
						<form onSubmit={edit ? this.onEditPermission : this.AddPermission}>
							<h6 className="form-header">Grant Permission</h6>
							<div className="form-group">
								<input
									className="form-control"
									placeholder="Name of Category"
									type="text"
									name="name"
									value={name}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="form-buttons-w">
								{create && (
									<button
										className={
											loading ? 'btn btn-primary disabled' : 'btn btn-primary'
										}>
										{loading ? (
											<img src={waiting} alt="submitting" />
										) : (
											<span> create</span>
										)}
									</button>
								)}
								{edit && (
									<>
										<button
											className={
												loading
													? 'btn btn-secondary ml-3 disabled'
													: 'btn btn-secondary ml-3'
											}
											onClick={this.cancelEditButton}>
											<span>{loading ? 'cancel' : 'cancel'}</span>
										</button>
										<button
											className={
												loading ? 'btn btn-primary disabled' : 'btn btn-primary'
											}>
											{loading ? (
												<img src={waiting} alt="submitting" />
											) : (
												<span> edit</span>
											)}
										</button>
									</>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		Permissions: state.settings.permissions,
	};
};

export default connect(mapStateToProps, {
	addPermission,
	getAllPermission,
	updatePermission,
	deletePermission,
})(Permission);
