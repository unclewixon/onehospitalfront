import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalLeaveRequest from '../../components/Modals/ModalLeaveRequest';
import LeaveItem from '../../components/LeaveItem';
import { loadStaffLeave } from '../../actions/hr';
import { request, confirmAction } from '../../services/utilities';
import { leaveMgtAPI } from '../../services/constants';
import { get_all_leave_category } from '../../actions/settings';
import { notifySuccess, notifyError } from '../../services/notify';

class LeaveMgt extends Component {
	state = {
		searching: false,
		activeRequest: null,
		showModal: false,
		leaveList: [],
	};

	onModalClick = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	fetchLeaveCategory = async () => {
		try {
			const rs = await request(`leave-category`, 'GET', true);
			this.props.get_all_leave_category(rs);
		} catch (error) {
			notifyError('could not fetch leave categories!');
		}
	};

	componentDidMount() {
		this.fetchStaffLeave();
		this.fetchLeaveCategory();
	}

	modalFunction = data => {
		this.onModalClick();
		this.setState({ activeRequest: data });
	};

	fetchStaffLeave = async () => {
		try {
			this.setState({ searching: true });
			const rs = await request(leaveMgtAPI, 'GET', true);
			this.setState({ searching: false });
			const filteredRes =
				rs && rs.length
					? rs.filter(leave => leave.leaveType !== 'excuse_duty')
					: [];
			this.props.loadStaffLeave(filteredRes);
			this.setState({ leaveList: filteredRes });
		} catch (error) {
			this.setState({ searching: false });
			console.log(error);
		}
	};

	rejectLeaveRequests = async data => {
		try {
			const url = `hr/leave-management/${data.id}/reject`;
			const res = await request(url, 'GET', true);
			console.log(res);
			notifySuccess('Successful rejecting leave applications');
			this.fetchStaffLeave();
		} catch (error) {
			notifyError('Could not rejecting leave applications');
		}
	};

	confirmReject = data => {
		confirmAction(
			this.rejectLeaveRequests,
			data,
			'in rejecting leave?',
			'Proceed?'
		);
	};

	approveLeaveRequests = async data => {
		try {
			const url = `hr/leave-management/${data.id}/approve`;
			const res = await request(url, 'GET', true);
			console.log(res);
			notifySuccess('Successful approving leave applications');
			this.fetchStaffLeave();
		} catch (error) {
			notifyError('Could not approve leave applications');
		}
	};

	confirmApprove = data => {
		confirmAction(
			this.approveLeaveRequests,
			data,
			'continue in approving this leave application?',
			'Are you sure?'
		);
	};

	deleteLeaveRequests = async data => {
		try {
			await request(`hr/leave-management/${data.id}`, 'DELETE', true);
			notifySuccess('Successful removed leave applications');
			this.fetchStaffLeave();
		} catch (error) {
			notifyError('Could not remove leave applications');
		}
	};

	confirmDelete = data => {
		confirmAction(
			this.deleteLeaveRequests,
			data,
			'in deleting this leave application?',
			'Do you want to continue'
		);
	};

	render() {
		const { staff_leave, leave_categories } = this.props;

		const filterByCategory = id => {
			if (id === 'none') {
				return this.setState({ leaveList: staff_leave });
			}
			const list = staff_leave.filter(leave => leave.category.id === id);
			this.setState({ leaveList: list });
		};

		const filterByStatus = status => {
			if (status === 'none') {
				return this.setState({ leaveList: staff_leave });
			}
			const list = staff_leave.filter(
				leave => leave.status === parseInt(status)
			);
			this.setState({ leaveList: list });
		};

		const { leaveList } = this.state;

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<form className="form-inline justify-content-sm-end">
										<label>Category:</label>
										<select
											className="form-control form-control-sm rounded mr-4"
											onChange={e => filterByCategory(e.target.value)}
										>
											<option value="none">Select Category</option>
											{leave_categories.map((cats, index) => {
												return (
													<option key={index} value={cats.id}>
														{cats.name}
													</option>
												);
											})}
										</select>
										<label>Status:</label>
										<select
											className="form-control form-control-sm rounded"
											onChange={e => filterByStatus(e.target.value)}
										>
											<option value="none">Select Status</option>
											<option value={0}>Pending</option>
											<option value={1}>Approved</option>
											<option value={2}>Rejected</option>
										</select>
									</form>
								</div>
								<h6 className="element-header">Leave Management</h6>
								<div className="element-box">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th></th>
													<th>Name</th>
													<th>Type</th>
													<th>Date To leave</th>
													<th>Date To Return</th>
													<th>Status</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												{leaveList.map((leave, i) => {
													return (
														<LeaveItem
															key={i}
															onLeave={true}
															hasRequest={false}
															leave={leave}
															modalClick={Data => this.modalFunction(Data, i)}
															index={i}
															rejectRequest={Data => this.confirmReject(Data)}
															approveRequest={Data => this.confirmApprove(Data)}
															deleteRequest={Data => this.confirmDelete(Data)}
														/>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.state.activeRequest && (
					<ModalLeaveRequest
						showModal={this.state.showModal}
						activeRequest={this.state.activeRequest}
						onModalClick={this.onModalClick}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff_leave: state.hr.staff_leave,
		leave_categories: state.settings.leave_categories,
	};
};

export default connect(mapStateToProps, {
	loadStaffLeave,
	get_all_leave_category,
})(LeaveMgt);
