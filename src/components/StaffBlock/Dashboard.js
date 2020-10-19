import React, { Component } from 'react';
import StaffData from './StaffData';
export class Dashboard extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-sm-3">
					<div className="user-profile compact">
						<div className="up-contents">
							<StaffData />
						</div>
					</div>
				</div>
				<div className="col-sm-9">
					<div className="element-wrapper">
						<div className="element-box">&nbsp;</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
