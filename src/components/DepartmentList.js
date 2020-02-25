/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { notifySuccess, notifyError } from '../services/notify';
import { getAllDepartments, deleteDepartment } from '../actions/settings';

class DepartmentList extends Component {
	componentDidMount() {
		this.props.getAllDepartments();
	}
	
	onDeleteDepartment = data => {
		this.props
			.deleteDepartment(data)
			.then(data => {
				notifySuccess('Deleted');
			})
			.catch(error => {
				notifyError('Error deleting');
			});
	};

	render() {
		const { departments } = this.props;
		return (
			<div className="element-wrapper">
				<div className="element-box-tp">
					<div className="table-responsive">
						<table className="table table-padded">
							<thead>
								<tr>
									<th>Department</th>
									<th>Head of Department</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{departments.map((department, i) => {
									return (
										<tr key={i}>
											<td className="nowrap">
												<span
													className={
														department.isActive
															? 'status-pill smaller green'
															: 'status-pill smaller red'
													}
												></span>
												<span>{department.name}</span>
											</td>
											<td>
												<span>{department.description}</span>
											</td>
											<td className="row-actions text-right">
												<a href="#">
													<i className="os-icon os-icon-ui-49"></i>
												</a>
												<a href="#">
													<i className="os-icon os-icon-grid-10"></i>
												</a>
												<a
													className="danger"
													onClick={() => this.onDeleteDepartment(department)}
												>
													<i className="os-icon os-icon-ui-15"></i>
												</a>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		departments: state.settings.department,
	};
};

export default connect(mapStateToProps, { getAllDepartments, deleteDepartment })(DepartmentList);
