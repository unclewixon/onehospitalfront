/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import searchingGIF from '../assets/images/searching.gif';
import { notifySuccess, notifyError } from '../services/notify';
import { request, confirmAction } from '../services/utilities';
import { API_URI } from '../services/constants';
import {
	get_all_department,
	delete_department,
	getAllDepartments,
} from '../actions/settings';

class DepartmentList extends Component {
	state = {
		loading: false,
	};
	componentDidMount() {
		this.fetchDepartments();
	}

	fetchDepartments = async () => {
		this.setState({ loading: true });
		try {
			const rs = await request(`${API_URI}/departments`, 'GET', true);
			this.props.get_all_department(rs);
			this.setState({ loading: false });
		} catch (error) {
			this.setState({ loading: false });
			notifyError(error.message || 'could not fetch departments!');
		}
	};

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
		const { loading } = this.state;
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
								{loading ? (
									<tr>
										<td colSpan="4" className="text-center">
											<img alt="searching" src={searchingGIF} />
										</td>
									</tr>
								) : (
									<>
										{departments.map((department, i) => {
											return (
												<tr key={i}>
													<td className="nowrap">
														<span
															className={
																department.isActive
																	? 'status-pill smaller green'
																	: 'status-pill smaller red'
															}></span>
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
															onClick={() =>
																this.onDeleteDepartment(department)
															}>
															<i className="os-icon os-icon-ui-15"></i>
														</a>
													</td>
												</tr>
											);
										})}
									</>
								)}
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
		departments: state.settings.departments,
	};
};

export default connect(mapStateToProps, {
	getAllDepartments,
	deleteDepartment,
})(DepartmentList);
