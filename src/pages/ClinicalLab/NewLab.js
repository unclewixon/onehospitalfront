import React, { Component } from 'react';
import LabRequest from '../../components/Patient/LabRequest';
import { Link, withRouter } from 'react-router-dom';
export class NewLab extends Component {
	render() {
		const { location } = this.props;

		const page = location.pathname.split('/').pop();

		return (
			<>
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions">
							<Link
								className={`btn btn-primary ${
									page === '' ? 'btn-outline-primary' : ''
								}`}
								to="/lab">
								Dashboard
							</Link>
							<Link
								className={`btn btn-primary ${
									page === 'lab-request' ? 'btn-outline-primary' : ''
								}`}
								to="/lab/lab-request">
								New Lab Request
							</Link>
						</div>
						<LabRequest />
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(NewLab);
