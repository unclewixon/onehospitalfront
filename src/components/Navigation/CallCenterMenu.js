import React from 'react';
import { Link } from 'react-router-dom';

const CallCenterMenu = () => {
	return (
		<>
			<li>
				<Link to="/call-center/groups">
					<div className="icon-w">
						<div className="icon-feather-home" />
					</div>
					<span>Contacts</span>
				</Link>
			</li>
			<li>
				<Link to="/call-center/tasks">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Tickets</span>
				</Link>
			</li>
			<li>
				<Link to="/call-center/chart">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Chart</span>
				</Link>
			</li>
		</>
	);
};

export default CallCenterMenu;
