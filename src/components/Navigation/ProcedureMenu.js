import React from 'react';
import { Link } from 'react-router-dom';

const ProcedureMenu = () => {
	return (
		<>
			<li>
				<Link to="/procedure">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/procedure/new-request">
					<div className="icon-w">
						<div className="os-icon os-icon-plus-circle" />
					</div>
					<span>New Procedure</span>
				</Link>
			</li>
		</>
	);
};

export default ProcedureMenu;
