import React from 'react';
import { Link } from 'react-router-dom';
const IvfMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>IVF</span>
			</li>

			<li>
				<Link to="/ivf">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default IvfMenu;
