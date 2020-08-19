import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExcuseItem from '../../components/ExcuseItem';
import { loadStaffLeave } from '../../actions/hr';
import { request } from '../../services/utilities';
import { leaveMgtAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { confirmAction } from '../../services/utilities';
import ModalExcuseDuty from '../../components/Modals/ModalExcuseDuty';

class ExcuseDuty extends Component {
	state = {
		searching: false,
		activeRequest: null,
		showModal: false,
		ExcuseList: [],
	};

	onModalClick = () => {
		this.setState({ showModal: !this.state.showModal });
	};
	componentDidMount() {
		this.fetchStaffLeave();
	}

	modalFunction = data => {
		this.onModalClick();
		this.setState({ activeRequest: data });
	};

	fetchStaffLeave = async () => {
		this.setState({ searching: true });
		try {
			const rs = await request(`${leaveMgtAPI}/excuse-duty`, 'GET', true);
			this.setState({ searching: false });
			this.props.loadStaffLeave(rs);
			this.setState({ ExcuseList: rs });
		} catch (error) {
			this.setState({ searching: false });
			console.log(error);
		}
	};

	rejectLeaveRequests = async data => {
		try {
			const res = await request(
				`hr/leave-management/${data.id}/reject`,
				'GET',
				true
			);
			console.log(res);
			notifySuccess('Successful rejecting excuse');
			this.fetchStaffLeave();
		} catch (error) {
			notifyError('Could not reject excuse');
		}
	};

	confirmReject = data => {
		confirmAction(
			this.rejectLeaveRequests,
			data,
			'in rejecting excuse?',
			'Proceed?'
		);
	};

	approveLeaveRequests = async data => {
		try {
			const res = await request(
				`hr/leave-management/${data.id}/approve`,
				'GET',
				true
			);
			console.log(res);
			notifySuccess('Successful approving excuse duty');
			this.fetchStaffLeave();
		} catch (error) {
			notifyError('Could not approve excuse duty');
		}
	};

	confirmApprove = data => {
		confirmAction(
			this.approveLeaveRequests,
			data,
			'continue in approving this excuse?',
			'Are you sure?'
		);
	};

	deleteLeaveRequests = async data => {
		try {
			await request(`hr/leave-management/${data.id}`, 'DELETE', true);
			notifySuccess('Successfully removed excuse');
			this.fetchStaffLeave();
		} catch (error) {
			notifyError('Could not remove excuse');
		}
	};

	confirmDelete = data => {
		confirmAction(
			this.deleteLeaveRequests,
			data,
			'in deleting this excuse?',
			'Do you want to continue'
		);
	};

	render() {
		const { staff_leave } = this.props;

		// const filterByCategory = id => {
		// 	if (id === 'none') {
		// 		return this.setState({ LeaveList: staff_leave });
		// 	}
		// 	const list = staff_leave.filter(leave => leave.category.id === id);
		// 	this.setState({ LeaveList: list });
		// };

		const filterByStatus = status => {
			if (status === 'none') {
				return this.setState({ ExcuseList: staff_leave });
			}
			const list = staff_leave.filter(
				leave => leave.status === parseInt(status)
			);
			this.setState({ ExcuseList: list });
		};

		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<form className="form-inline justify-content-sm-end">
										<label>Status:</label>
										<select
											className="form-control form-control-sm rounded"
											onChange={e => filterByStatus(e.target.value)}>
											<option value="none">Select Status</option>
											<option value={0}>Pending</option>
											<option value={1}>Approved</option>
											<option value={2}>Rejected</option>
										</select>
									</form>
								</div>
								<h6 className="element-header">Excuse Duty Management</h6>
								{this.state.activeRequest ? (
									<ModalExcuseDuty
										showModal={this.state.showModal}
										activeRequest={this.state.activeRequest}
										onModalClick={this.onModalClick}
									/>
								) : null}
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
												{this.state.ExcuseList.map((leave, i) => {
													return (
														<ExcuseItem
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
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff_leave: state.hr.staff_leave,
	};
};

export default connect(mapStateToProps, { loadStaffLeave })(ExcuseDuty);
