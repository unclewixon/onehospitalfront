import React from 'react';
import { Link } from 'react-router-dom';

const UpdatedCenter = () => {
	return (
		<>
			<li>
				<Link to="/update-center/page-one">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Page One</span>
				</Link>
			</li>
			<li>
				<Link to="/update-center/page-two">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Page Two</span>
				</Link>
			</li>
			<li>
				<Link to="/update-center/page-three">
					<div className="icon-w">
						<div className="os-icon os-icon-calendar-time" />
					</div>
					<span>Page Three</span>
				</Link>
			</li>
		</>
	);
};

export default UpdatedCenter;
