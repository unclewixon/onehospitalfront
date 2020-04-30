import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalLeaveRequest from '../../components/Modals/ModalLeaveRequest';
import LeaveItem from '../../components/LeaveItem';
import { loadStaffLeave } from '../../actions/hr';
import { request } from '../../services/utilities';
import { API_URI, leaveMgtAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';

class LeaveMgt extends Component {

	state = {
		searching: false,
		activeRequest: null,
		showModal: false,
		searching: false
	};

	onModalClick = () => {
		this.setState({showModal: !this.state.showModal})
	}
	componentDidMount() {
		this.fetchStaffLeave();
	}

	modalFunction = data => {
		this.onModalClick();
		this.setState({ activeRequest: data });
	}

	fetchStaffLeave = async () => {
		this.setState({searching: true})
		try {
			const rs = await request(`${API_URI}${leaveMgtAPI}`, 'GET', true);
			this.setState({searching: false})
			this.props.loadStaffLeave(rs);
		} catch (error) {
			this.setState({searching: false})
			console.log(error);
		}
	};

	rejectLeaveRequests = async (data) => {
		try {
			const res = await request(`${API_URI}/hr/leave-management/${data.id}`, 'DELETE', true);
			notifySuccess('Successful removed leave applications')
			this.fetchStaffLeave()
		} catch (error) {
			notifyError('Could not remove leave applications')
		}
	}

	render() {
		const { staff_leave } = this.props;
		return (
			<div className="content-i">
				<div className="content-box">
					<div className="row">
						<div className="col-sm-12">
							<div className="element-wrapper">
								<div className="element-actions">
									<form className="form-inline justify-content-sm-end">
										<label>Department:</label>
										<select className="form-control form-control-sm rounded mr-4">
											<option value="Pending">All</option>
											<option value="Pending">Nursing</option>
											<option value="Active">Gynae</option>
											<option value="Cancelled">OPD</option>
										</select>
										<label>Category:</label>
										<select className="form-control form-control-sm rounded mr-4">
											<option value="Pending">All</option>
											<option value="Active">Sick Leave</option>
											<option value="Active">Maternity Leave</option>
										</select>
										<label>Status:</label>
										<select className="form-control form-control-sm rounded">
											<option value="Pending">All</option>
											<option value="Pending">On Leave</option>
											<option value="Active">Not On Leave</option>
										</select>
									</form>
								</div>
								<h6 className="element-header">Leave Management</h6>
								{
									this.state.activeRequest ? (
										<ModalLeaveRequest
											showModal={this.state.showModal}
											activeRequest={this.state.activeRequest}
											onModalClick={this.onModalClick}
										/>
									) : null
								}
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
												{staff_leave.map((leave, i) => {
													return (
														<LeaveItem
															key={i}
															onLeave={true}
															hasRequest={false}
															leave={leave}
															modalClick={Data =>
																this.modalFunction(Data, i)
															}
															index={i}
															rejectRequest={Data => 
																this.rejectLeaveRequests(Data)
															}
														/>
													)
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
	}
};

export default connect(mapStateToProps, { loadStaffLeave })(LeaveMgt);
