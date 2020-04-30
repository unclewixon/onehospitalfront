/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { connect } from 'react-redux';
import { request } from '../../services/utilities';
import { API_URI, staffAPI, hmoAPI } from '../../services/constants';
import { loadStaff } from '../../actions/hr';
class StaffDetail extends Component {
	componentDidMount() {
		if (this.props.staffs.length === 0) {
			this.fetchStaffs();
		}
	}

	fetchStaffs = async () => {
		try {
			const rs = await request(`${API_URI}${staffAPI}`, 'GET', true);
			this.props.loadStaff(rs);
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		const { location } = this.props;
		const { staffs, departments } = this.props;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Staff Detail</h6>
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

											<th data-field="5">
												<div className="th-inner text-center">Actions</div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="flex text-center">
												<a className="item-title text-color">Sick Leave</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Albert kezie</a>
											</td>
											<td className="flex text-center">
												<a className="item-title text-color">Doctor</a>
											</td>

											<td className="text-center row-actions">
												<Tooltip title="Edit Staff">
													<a className="secondary">
														<i className="os-icon os-icon-edit-32" />
													</a>
												</Tooltip>
												<Tooltip title="Delete">
													<a className="danger">
														<i className="os-icon os-icon-ui-15" />
													</a>
												</Tooltip>
											</td>
										</tr>
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
	};
};

export default withRouter(
	connect(mapStateToProps, {
		loadStaff,
	})(StaffDetail)
);
