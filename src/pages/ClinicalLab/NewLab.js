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
					<div className="row">
					<div className="row mt-2 mb-4">
						<Link
							className={`mr-2 btn btn-primary btn-sm  ${
								page === '/' ? 'btn-outline-primary' : ''
								}`}
							to="/lab">
							Dashboard
						</Link>
						<Link
							to={`/lab/recent-request`}
							className={`mr-2 btn btn-primary btn-sm  ${
								page === '/recent-request' ? 'btn-outline-primary' : ''
								}`}>
							{' '}
										Recent Request
									</Link>
						<Link
							to={`/lab/filled-request`}
							className={`mr-2 btn btn-primary btn-sm ${
								page === '/filled-request' ? 'btn-outline-primary' : ''
								}`}>
							{' '}
										Filled Request
									</Link>
						<Link
							className={`mr-2 btn btn-primary btn-sm  ${
								page === '/all-request' ? 'btn-outline-primary' : ''
								}`}
							to="/lab/all-request">
							All Request
						</Link>
						<Link
							className={`mr-2 btn btn-primary btn-sm  ${
								page === '/lab-request' ? 'btn-outline-primary' : ''
								}`}
							to="/lab/lab-request">
							New Lab Request
						</Link>
					</div>
					</div>
						<LabRequest />
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(NewLab);
