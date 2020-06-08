import React from 'react';
import { Link } from 'react-router-dom';
const NicuMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>NICU</span>
			</li>

			<li>
				<Link to="/nicu">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default NicuMenu;
