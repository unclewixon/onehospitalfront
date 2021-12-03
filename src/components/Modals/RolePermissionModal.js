/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { updateRole } from '../../actions/role';

const RolePermissionModal = ({ role, closeModal }) => {
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const permissions = useSelector(state => state.permission);

	useEffect(() => {
		let newSelected = [];
		if (role) {
			for (const permission of role?.permissions || []) {
				newSelected.push(permission.id);
			}

			setSelected(newSelected);
		}
	}, [role]);

	const handleSubmit = async event => {
		event.preventDefault();
		if (selected.length) {
			try {
				setLoading(true);
				const data = { role_id: role.id, permissions: selected };
				const url = 'settings/roles/set-permissions';
				const rs = await request(url, 'post', true, data);
				setLoading(false);
				if (rs.success) {
					dispatch(updateRole(rs.role));
					notifySuccess('Permissions saved');
				} else {
					notifyError(rs.message || 'could not save permissions');
				}
			} catch (err) {
				setLoading(false);
				notifyError(err.message || 'could not save permissions');
			}
		}
	};

	const handleSelectAll = event => {
		if (event.target.checked) {
			setSelected(permissions.map(n => n.id));
			return;
		}
		setSelected([]);
	};

	const onSelectPermission = (e, id) => {
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
	};

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
							onClick={() => closeModal()}>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>

					<div className="onboarding-content with-gradient">
						<div className="modal-body">
							<div className="row">
								{permissions.map((item, i) => {
									const isSelected = selected.indexOf(item.id) !== -1;
									return (
										<div className="col-md-3" key={i}>
											<div className="form-check">
												<label className="form-check-label">
													<input
														className="form-check-input"
														name="permissions"
														checked={isSelected}
														aria-checked={isSelected}
														value={item.id}
														onChange={e => {
															onSelectPermission(e, item.id);
														}}
														type="checkbox"
													/>{' '}
													{item.name}
												</label>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className="modal-footer buttons-on-right">
							<button
								className="btn btn-teal text-dark"
								onClick={handleSubmit}
								type="submit"
								disabled={loading}>
								{loading ? (
									<img src={waiting} alt="submitting" />
								) : (
									<span> Save Changes</span>
								)}
							</button>
							<button
								className="btn btn-link ml-2"
								type="button"
								onClick={() => closeModal()}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RolePermissionModal;
