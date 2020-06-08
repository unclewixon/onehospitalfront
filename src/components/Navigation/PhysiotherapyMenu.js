import React from 'react';
import { Link } from 'react-router-dom';
const PhysiotherapyMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Physiotherapy</span>
			</li>

			<li>
				<Link to="/physiotherapy">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default PhysiotherapyMenu;
