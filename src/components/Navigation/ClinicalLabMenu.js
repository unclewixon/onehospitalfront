import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { hasCreateLabPermission } from '../../permission-utils/lab';

const ClinicalLabMenu = () => {
	const staff = useSelector(state => state.user.profile);

	return (
		<>
			<li>
				<Link to="/lab">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			{hasCreateLabPermission(staff.permissions) && (
				<li>
					<Link to="/lab/new-request">
						<div className="icon-w">
							<div className="os-icon os-icon-plus-circle" />
						</div>
						<span>New Lab Request</span>
					</Link>
				</li>
			)}
		</>
	);
};

export default ClinicalLabMenu;
