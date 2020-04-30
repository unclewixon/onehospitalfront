/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';

import { request } from '../../services/utilities';
import { API_URI, appraisalAPI } from '../../services/constants';

export class Appraisal extends Component {
	state = {
		list: [
			{
				performancePeriod: '1st Quarter 2020 (JAN-MAR)',
				startDate: '2020-03-20',
				endDate: '2020-03-31',
				status: 0,
			},
		],
	};

	componentDidMount() {
		this.fetchAppraisals();
	}

	fetchAppraisals = async () => {
		try {
			const { staff } = this.props;
			console.log(staff);
			const rs = await request(
				`${API_URI}${appraisalAPI}/staff-assessment/${staff.id}`,
				'GET',
				true
			);
			console.log(rs);
			this.setState({ list: rs });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { location, departments, staff } = this.props;
		// const deptId = staff.details.department.id;
		// const department = departments.find(d => d.id === deptId);
		const { list } = this.state;

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
										{list.map((appraisal, i) => {
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
															<Link
																className="secondary"
																to={`${location.pathname}#self-appraisal`}>
																<i className="os-icon os-icon-folder-plus" />
															</Link>
														</Tooltip>
														<Tooltip title="Line Manager">
															<Link
																className="secondary"
																to={`${location.pathname}#line-appraisal`}>
																<i className="os-icon os-icon-edit-32" />
															</Link>
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
	};
};

export default withRouter(connect(mapStateToProps)(Appraisal));
