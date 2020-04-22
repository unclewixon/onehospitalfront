/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { getRequestByType } from '../actions/patient';
import { connect } from 'react-redux';
import { notifyError } from '../services/notify';
import Select from 'react-select';

const { RangePicker } = DatePicker;
const patients = [
	{ label: 'Chinedu', value: 'Chinedu' },
	{ label: 'Joel', value: 'Joel' },
];

export class RecentRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		activeRequest: null,
		showModal: false,
		startDate: moment(Date.now())
			.subtract(1, 'days')
			.format('YYYY-MM-DD'),
		endDate: moment(Date.now()).format('YYYY-MM-DD'),
	};

	onModalClick = () => {
		this.setState(prevState => ({ showModal: !prevState.showModal }));
	};

	change = e => {
		console.log(e.target.value);
	};

	componentDidMount() {
		const { startDate, endDate } = this.state
		const { getRequestByType } = this.props;
		this.setState({ loading: true });
		getRequestByType(null, 'pharmacy', startDate, endDate)
			.then(response => {
				this.setState({ loading: false });
			})
			.catch(e => {
				this.setState({ loading: false });
				notifyError('could not fetch pharmacy requests');
			});
	}

	render() {
		const { filtering, filteredPatient } = this.state;
		const { Requests } = this.props;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Recent Requests</h6>
					<div className="row">
						<form action="" className="form-inline pl-3">
							<div className="form-group">
								<label className="mr-2">Filter by: </label>
							</div>
							<div className="form-group mr-2">
								<label className="mr-2 " htmlFor="patient">
									ID
								</label>
								<Select
									id="patient"
									name="patient"
									onChange={val => this.setState({ filteredPatient: val })}
									options={patients}
									value={filteredPatient}
									defaultValue={patients[0]}
									styles={{ height: '2rem' }}
								/>
							</div>
							<div className="form-group mr-2">
								<RangePicker
									onChange={e => {
										const date = e.map(date => {
											return moment(date._d).format('YYYY-MM-DD');
										});
										this.setState({
											startDate: date[0],
											endDate: date[1]
										})
									}}
								/>
							</div>
							<div className="form-group mr-2">
								<a
									className="btn btn-sm btn-primary btn-upper text-white"
									onClick={this.doFilter}>
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
												<i className="os-icon os-icon-ui-37" />
											)}
									</span>
								</a>
							</div>
						</form>
					</div>

					<div className="element-box">
						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th> Date</th>
										<th> File No</th>
										<th> Request From</th>
										<th> Request Status</th>
										<th> Action</th>
									</tr>
								</thead>
								<tbody>
									{Requests && Requests.length
										? Requests.map((request, index) => {
											return (
												<tr
													className=""
													data-index="0"
													data-id="20"
													key={index}>
													<td>
														<span>
															{moment(request.createdAt).format('DD-MM-YYYY')}
														</span>
													</td>
													<td></td>
													<td>{request.created_by ? request.created_by : ""}</td>
													<td className="nowrap">
														{request.status === 1 ? (
															<div>
																<span className="status-pill smaller green"></span>
																<span>Approved</span>
															</div>
														) : (
																<div>
																	<span className="status-pill smaller yellow"></span>
																	<span>Pending</span>
																</div>
															)}
													</td>
													<td className="row-actions text-right">
														<Tooltip title="View Request">
															<a
																className="secondary"
																onClick={() => {
																	this.setState({ activeRequest: request });
																	this.onModalClick();
																}}>
																<i className="os-icon os-icon-file" />
															</a>
														</Tooltip>
														<Tooltip title="Print Request">
															<a className="ml-2" href="#">
																<i className="icon-feather-printer" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})
										: null}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ patient }) => ({
	Requests: patient.pharmacyRequests,
});

export default connect(mapStateToProps, { getRequestByType })(RecentRequest);
