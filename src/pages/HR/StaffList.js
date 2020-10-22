/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffItem from '../../components/StaffItem';
import { createStaff } from '../../actions/general';
import { request } from '../../services/utilities';
import { API_URI, staffAPI, hmoAPI } from '../../services/constants';
import { loadStaff } from '../../actions/hr';

class StaffList extends Component {
	componentDidMount() {
		this.fetchStaffs();
	}

	fetchStaffs = async () => {
		try {
			const rs = await request(`${staffAPI}`, 'GET', true);
			this.props.loadStaff(rs);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { staffs } = this.props;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<a
										className="btn btn-success btn-sm"
										href={`${API_URI}/${hmoAPI}/download-sample`}
										download>
										<i className="os-icon os-icon-ui-22"></i>
										<span>Download Sample</span>
									</a>
									<a
										className="btn btn-primary btn-sm text-white"
										onClick={() =>
											this.props.createStaff({ status: true, staff: null })
										}>
										<i className="os-icon os-icon-ui-22" />
										<span>Create New Staff</span>
									</a>
								</div>
								<h6 className="element-header">Staff List</h6>
								<div className="element-box p-3 m-0">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th></th>
													<th>Staff ID</th>
													<th>Name</th>
													<th>Role</th>
													<th>Phone</th>
													<th>Department</th>
													<th className="text-center">Status</th>
													<th className="text-right">Actions</th>
												</tr>
											</thead>
											<tbody>
												{staffs.map((staff, i) => {
													return <StaffItem key={i} staff={staff} />;
												})}
											</tbody>
										</table>
									</div>
								</div>
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
		staffs: state.hr.staffs,
	};
};

export default connect(mapStateToProps, { createStaff, loadStaff })(StaffList);
