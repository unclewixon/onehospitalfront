/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import EnrollmentForm from '../../components/IVF/EnrollmentForm';
import IVFRegulationChart from '../../components/IVF/IVFRegulationChart';

export class RegulationChart extends Component {
	render() {
		const { location } = this.props;
		const path = location.pathname.split('/').pop();

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<Link
							className={`btn btn-primary ${
								path === '' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf">
							Dashboard
						</Link>
						<Link
							className={`btn btn-primary ${
								path === 'reg-chart' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/reg-chart">
							Down Regulation Chart
						</Link>
						<Link
							className={`btn btn-primary ${
								path === 'hcg-admin' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/hcg-admin">
							HCG Administration
						</Link>

						<Link
							className={`btn btn-primary ${
								path === 'enrol' ? 'btn-outline-primary' : ''
							}`}
							to="/ivf/enrol">
							New Enrollment
						</Link>
					</div>
					<h6 className="element-header">Enrollment</h6>
					<div className="row">
						<div className="col-md-12">
							<div className="element-content">
								<IVFRegulationChart />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(RegulationChart);
