/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';

import { request } from '../../services/utilities';
import { API_URI, appraisalAPI } from '../../services/constants';
import { loadPerformancePeriod, setPerformancePeriod } from '../../actions/hr';
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
			const rs = await request(
				`${API_URI}${appraisalAPI}/list-periods`,
				'GET',
				true
			);
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
		history.push(
			type === 'self'
				? `${location.pathname}#create-appraisal`
				: `${location.pathname}#line-appraisal`
		);
	};
	render() {
		const { location, departments, staff } = this.props;
		// const deptId = staff.details.department.id;
		// const department = departments.find(d => d.id === deptId);
		const { performancePeriods } = this.props;
		const rev = performancePeriods.slice().reverse();
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions">
							<Link
								className="btn btn-primary btn-sm text-white"
								to={`${location.pathname}#create-appraisal`}>
								<i className="os-icon os-icon-ui-22" />
								<span>Create Appraisal</span>
							</Link>
						</div>
						<h6 className="element-header mt-3">Appraisal</h6>
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="owner">
												<div className="th-inner sortable both text-center">
													PERIOD
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													FROM DATE
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													TO DATE
												</div>
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
													<td className="flex text-center">
														<a className="item-title text-color">
															{appraisal.performancePeriod}
														</a>
													</td>
													<td className="flex text-center">
														<a className="item-title text-color">
															{appraisal.startDate}
														</a>
													</td>
													<td className="flex text-center">
														<a className="item-title text-color">
															{appraisal.endDate}
														</a>
													</td>

													<td className="text-center row-actions">
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
																<i className="os-icon os-icon-edit-32" />
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
															<Link
																className="secondary"
																to={`${location.pathname}#staff-detail`}>
																<i className="os-icon os-icon-folder-plus" />
															</Link>
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
	})(Appraisal)
);
