/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import Tooltip from 'antd/lib/tooltip';

import { viewAppraisal } from '../../actions/general';
import { request } from '../../services/utilities';
import { staffAPI } from '../../services/constants';
import { setPerformancePeriod } from '../../actions/hr';
import {
	loadStaffAppraisal,
	addStaffForAppraisal,
	setIsStaffAppraisal,
} from '../../actions/general';

class StaffAppraisal extends Component {
	state = {
		loading: false,
		staffs: [],
	};

	componentDidMount() {
		if (isEmpty(this.props.period.performancePeriod)) {
			this.props.history.push(`${this.props.location.pathname}#appraisal`);
		}
		if (this.state.staffs.length === 0) {
			this.fetchStaffs();
		}
	}

	componentWillUnmount() {
		//this.props.setIsStaffAppraisal(false);
	}

	fetchStaffs = async () => {
		try {
			this.setState({ loading: true });
			const rs = await request(`${staffAPI}`, 'GET', true);
			this.setState({ staffs: rs, loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	doViewAppraisal = (e, staff) => {
		e.preventDefault();
		console.log('view appraisal');
		this.props.addStaffForAppraisal(staff);
		this.props.viewAppraisal(true);
	};

	appraiseStaff = staff => {
		//load it into the redux
		this.props.loadStaffAppraisal(true, staff);
	};

	createAppraisal = staff => {
		const { history } = this.props;
		//set performance period

		setIsStaffAppraisal(true);
		//got to create apparaisal
		this.props.addStaffForAppraisal(staff);
		history.replace(`/my-account/appraisal/new-appraisal`);
	};

	render() {
		const { loading, staffs } = this.state;
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
												<div className="th-inner sortable both ">STAFF ID</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">NAME</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">JOB TITLE</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">
													Phone Number
												</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">Gender</div>
											</th>
											<th data-field="project">
												<div className="th-inner sortable both ">Email</div>
											</th>

											<th data-field="5">
												<div>Actions</div>
											</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr></tr>
										) : (
											staffs.map(el => {
												return (
													<tr key={el.id}>
														<td>{el.emp_code}</td>
														<td>{el.first_name + ' ' + el.last_name}</td>
														<td>{el.job_title}</td>

														<td>{el.phone_number}</td>
														<td>{el.gender}</td>
														<td>{el.email}</td>

														<td className=" row-actions">
															<Tooltip title="Create Staff Appraisal">
																<a
																	className="secondary"
																	onClick={() => {
																		this.createAppraisal(el);
																	}}
																>
																	<i className="os-icon os-icon-folder-plus" />
																</a>
															</Tooltip>

															<Tooltip title="View Appraisal">
																<a
																	className=""
																	onClick={e => this.doViewAppraisal(e, el)}
																>
																	<i className="os-icon os-icon-documents-03"></i>
																</a>
															</Tooltip>

															<Tooltip title="Assess Staff">
																<a
																	className="secondary"
																	onClick={() => {
																		this.appraiseStaff(el);
																	}}
																>
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
		period: hr.performancePeriod,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		setPerformancePeriod,
		loadStaffAppraisal,
		viewAppraisal,
		addStaffForAppraisal,
		setIsStaffAppraisal,
	})(StaffAppraisal)
);
