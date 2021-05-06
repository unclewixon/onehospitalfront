/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';

import { request } from '../../services/utilities';
import { appraisalAPI } from '../../services/constants';
import { loadPerformancePeriod, setPerformancePeriod } from '../../actions/hr';
import { lineAppraisal } from '../../actions/general';

export class Appraisal extends Component {
	state = {};

	componentDidMount() {
		if (this.props.performancePeriods.length === 0) {
			this.fetchAppraisals();
		}

		this.props.setPerformancePeriod({});
	}

	fetchAppraisals = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request(`${appraisalAPI}/list-periods`, 'GET', true);
			this.props.loadPerformancePeriod(rs);

			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	createAppraisal = (item, type) => {
		const { location, history, setPerformancePeriod } = this.props;
		//set performance period

		setPerformancePeriod(item);
		//got to create apparaisal
		if (type === 'self') {
			history.push(`${location.pathname}/create-appraisal`);
		} else if (type === 'staff') {
			history.push(`${location.pathname}/staff-appraisal`);
		} else {
			this.props.lineAppraisal(true);
		}
	};
	render() {
		// const deptId = staff.details.department.id;
		// const department = departments.find(d => d.id === deptId);
		const { performancePeriods } = this.props;
		const rev = performancePeriods.slice().reverse();

		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions"></div>
						<h6 className="element-header mt-3">Performance Periods</h6>
						<div className="element-box m-0 p-3">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="owner">
												<div className="th-inner sortable">PERIOD</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable">FROM DATE</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable">TO DATE</div>
												<div className="fht-cell"></div>
											</th>

											<th data-field="5">
												<div className="th-inner text-center">Actions</div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<tbody>
										{rev.map((appraisal, i) => {
											return (
												<tr key={i}>
													<td>{appraisal.performancePeriod}</td>
													<td>{appraisal.startDate}</td>
													<td>{appraisal.endDate}</td>

													<td className="row-actions">
														<Tooltip title="Self Appraisal">
															<a
																className="secondary"
																onClick={() => {
																	this.createAppraisal(appraisal, 'self');
																}}>
																<i className="os-icon os-icon-folder-plus" />
															</a>
														</Tooltip>
														<Tooltip title="Line Manager">
															<a
																className="secondary"
																onClick={() => {
																	this.createAppraisal(appraisal, 'line');
																}}>
																<i className="os-icon os-icon-layers" />
															</a>
														</Tooltip>

														{/* {department.hod_id === staff.id ? (
															<Tooltip title="Staff Appraisal">
																<Link
																	className="secondary"
																	to={`${location.pathname}#staff-detail`}>
																	<i className="os-icon os-icon-folder-plus" />
																</Link>
															</Tooltip>
														) : null} */}

														<Tooltip title="Staff Appraisal">
															<a
																className="secondary"
																onClick={() => {
																	this.createAppraisal(appraisal, 'staff');
																}}>
																<i className="os-icon os-icon-folder-plus" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.user.staff,
		departments: state.settings.departments,
		performancePeriods: state.hr.performancePeriods,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		loadPerformancePeriod,
		setPerformancePeriod,
		lineAppraisal,
	})(Appraisal)
);
