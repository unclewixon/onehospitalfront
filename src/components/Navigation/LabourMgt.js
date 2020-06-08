import React from 'react';
import { Link } from 'react-router-dom';
const LabourMgt = () => {
	return (
		<>
			<li className="sub-header">
				<span>Labour Management</span>
			</li>

			<li>
				<Link to="/labour-mgt">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default LabourMgt;
