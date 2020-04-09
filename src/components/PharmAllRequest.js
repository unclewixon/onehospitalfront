/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { getRequestByType } from '../actions/patient';
import { connect } from 'react-redux';
import { notifyError } from '../services/notify';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;
const departments = [
	{ id: 'ejejekek', name: 'angel' },
	{ id: 'sislkas', name: 'kafta' },
];

export class PharmAllRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		activeRequest: null,
		showModal: false,
		dateRange: [],
	};

	onModalClick = () => {
		this.setState(prevState => ({ showModal: !prevState.showModal }));
	};

	// change = e => {
	// 	console.log(e.target.value);
	// };

	componentDidMount() {
		const { getRequestByType } = this.props;
		this.setState({ loading: true });
		getRequestByType(null, 'pharmacy')
			.then(response => {
				this.setState({ loading: false });
			})
			.catch(e => {
				this.setState({ loading: false });
				notifyError('could not fetch pharmacy requests');
			});
	}

	render() {
		const { filtering } = this.state;
		const { Requests } = this.props;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">All Request</h6>
					<div className="row my-4">
						<form action="" className="form-inline pl-3">
							<div className="form-group">
								<label className="mr-2">Filter by: </label>
							</div>
							<div className="form-group mr-2">
								<label className="mr-2 " htmlFor="id">
									ID
								</label>
								<select
									style={{ height: '32px' }}
									id="department"
									className="form-control"
									name="id"
									onChange={e => this.change(e)}>
									{departments.map((dept, i) => {
										return (
											<option key={i} value={dept.id}>
												{dept.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group mr-2">
								<RangePicker
									value={this.state.dateRange}
									onChange={e =>
										e.map(date => {
											const range = moment(date).format('DD/MM/YYYY hh:mm');
											console.log(range);
											return range;
										})
									}
								/>
							</div>
							<div className="form-group mr-2">
								<a
									className="btn btn-sm btn-primary btn-upper text-white"
									onClick={this.doFilter}>
									<i className="os-icon os-icon-ui-37" />
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Filter'
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
																{moment(request.createdAt).format('DD/MM/YYYY')}
															</span>
														</td>
														<td>{request.patient.fileNumber}</td>
														<td>{`${'Dr. DooLittle'.toUpperCase()}`}</td>
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
						<div className="controls-below-table">
							<div className="table-records-info">Showing records 1 - 5</div>
							<div className="table-records-pages">
								<ul>
									<li>
										<a href="#">Previous</a>
									</li>
									<li>
										<a className="current" href="#">
											1
										</a>
									</li>
									<li>
										<a href="#">2</a>
									</li>
									<li>
										<a href="#">3</a>
									</li>
									<li>
										<a href="#">4</a>
									</li>
									<li>
										<a href="#">Next</a>
									</li>
								</ul>
							</div>
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

export default connect(mapStateToProps, { getRequestByType })(PharmAllRequest);
