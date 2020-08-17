/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useSWR from 'swr';
import { togglePermissionModal } from '../../actions/role';
import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';

import waiting from '../../assets/images/waiting.gif';

const RolePermissionModal = props => {
	const role = props.role;
	const { data } = useSWR('settings/permissions');
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let newSelected = [];
		if (role) {
			for (const permission of role?.permissions) {
				newSelected.push(permission.id);
			}
		}
		setSelected(newSelected);
	}, [setSelected, role]);

	function handleSubmit(event) {
		event.preventDefault();
		if (selected.length) {
			setLoading(true);
			request('settings/roles/set-permissions', 'post', true, {
				role_id: role.id,
				permissions: selected,
			})
				.then(res => {
					setLoading(false);
					if (res.success) {
						notifySuccess('Permissions saved');
					} else {
						notifyError(res.message || 'could not save permissions');
					}
				})
				.catch(err => {
					setLoading(false);
					notifyError(err.message || 'could not save permissions');
				});
		}
	}

	function handleSelectAll(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(e, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	}
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header faded smaller">
						<div className="modal-title">
							<div className="form-check">
								<label className="form-check-label">
									<input
										className="form-check-input"
										name="checkAll"
										onChange={handleSelectAll}
										type="checkbox"
									/>{' '}
									Set permissions for {role.name}
								</label>
							</div>
						</div>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => props.togglePermissionModal(false)}>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>

					<div className="onboarding-content with-gradient">
						<div className="modal-body">
							<div className="row">
								{data &&
									data.map(permission => {
										const isSelected = selected.indexOf(permission.id) !== -1;
										return (
											<div className="col-md-3" key={permission.id}>
												<div className="form-check">
													<label className="form-check-label">
														<input
															className="form-check-input"
															name="permissions"
															checked={isSelected}
															aria-checked={isSelected}
															value={permission.id}
															onChange={e => {
																handleClick(e, permission.id);
															}}
															type="checkbox"
														/>{' '}
														{permission.name}
													</label>
												</div>
											</div>
										);
									})}
							</div>
						</div>
						<div className="modal-footer buttons-on-right">
							<button
								className="btn btn-teal"
								onClick={handleSubmit}
								type="submit">
								{loading ? (
									<img src={waiting} alt="submitting" />
								) : (
									<span> Save Changes</span>
								)}
							</button>
							<button
								className="btn btn-link"
								data-dismiss="modal"
								type="button"
								onClick={() => props.togglePermissionModal(false)}>
								{' '}
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { togglePermissionModal })(RolePermissionModal);
