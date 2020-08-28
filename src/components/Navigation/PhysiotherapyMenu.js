import React from 'react';
import { Link } from 'react-router-dom';
const PhysiotherapyMenu = () => {
	return (
		<>
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
