import React from 'react';
import { Link } from 'react-router-dom';
const AntenatalMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>Antenatal</span>
			</li>

			<li>
				<Link to="/antennatal">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Dashboard</span>
				</Link>
			</li>
		</>
	);
};

export default AntenatalMenu;
