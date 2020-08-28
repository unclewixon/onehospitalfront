import React from 'react';
import { Link } from 'react-router-dom';

const DenstistryMenu = () => {
	return (
		<>
			<li>
				<Link to="/dentistry">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default DenstistryMenu;
