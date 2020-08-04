import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { request } from '../../services/utilities';
import { API_URI, staffAPI, hmoAPI } from '../../services/constants';
import { loadStaff } from '../../actions/hr';
import Tooltip from 'antd/lib/tooltip';
import { setPerformancePeriod } from '../../actions/hr';
import { loadStaffAppraisal } from '../../actions/general';
import { isEmpty } from 'lodash';
export class StaffAppraisal extends Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		if (isEmpty(this.props.period.performancePeriod)) {
			this.props.history.push(`${this.props.location.pathname}#appraisal`);
		}
		if (this.props.staffs.length === 0) {
			this.fetchStaffs();
		}
	}

	componentWillUnmount() {
		// this.props.setPerformancePeriod({});
	}

	fetchStaffs = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request(`${staffAPI}`, 'GET', true);
			this.props.loadStaff(rs);
			this.setState({ loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	appraiseStaff = staff => {
		//load it into the redux
		this.props.loadStaffAppraisal(true, staff);
	};
	render() {
		const { staffs, departments } = this.props;
		const { loading } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Staff Appraisal</h6>
						<div className="element-box">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th data-field="owner">
												<div className="th-inner sortable both text-center">
													STAFF ID
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													NAME
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													JOB TITLE
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Phone Number
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Gender
												</div>
												<div className="fht-cell"></div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both text-center">
													Email
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
										{loading ? (
											<tr></tr>
										) : (
											staffs.map(el => {
												return (
													<tr>
														<td className="flex text-center">
															<a className="item-title text-color">
																{el.emp_code}
															</a>
														</td>
														<td className="flex text-center">
															<a className="item-title text-color">
																{el.first_name + ' ' + el.last_name}
															</a>
														</td>
														<td className="flex text-center">
															<a className="item-title text-color">
																{el.job_title}
															</a>
														</td>

														<td className="flex text-center">
															<a className="item-title text-color">
																{el.phone_number}
															</a>
														</td>
														<td className="flex text-center">
															<a className="item-title text-color">
																{el.gender}
															</a>
														</td>
														<td className="flex text-center">
															<a className="item-title text-color">
																{el.email}
															</a>
														</td>
														<td className="text-center row-actions">
															<Tooltip title="Edit Staff">
																<a
																	className="secondary"
																	onClick={() => {
																		this.appraiseStaff(el);
																	}}>
																	<i className="os-icon os-icon-edit-32" />
																</a>
															</Tooltip>
														</td>
													</tr>
												);
											})
										)}
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

const mapStateToProps = ({ settings, hr }) => {
	return {
		departments: settings.departments,
		staffs: hr.staffs,
		period: hr.performancePeriod,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		loadStaff,
		setPerformancePeriod,
		loadStaffAppraisal,
	})(StaffAppraisal)
);
