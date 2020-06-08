import React from 'react';
import { Link } from 'react-router-dom';
const ProcedureMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Procedure</span>
			</li>

			<li>
				<Link to="/procedure">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default ProcedureMenu;
