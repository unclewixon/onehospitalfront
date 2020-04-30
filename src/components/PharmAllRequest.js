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
import _ from 'lodash';
import PharmNewRequestViewModal from './PharmNewRequestViewModal';

const { RangePicker } = DatePicker;

export class PharmAllRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		activeRequest: null,
		showModal: false,
		startDate: '',
		endDate: '',
		patientId: '',
	};

	onModalClick = () => {
		this.setState(prevState => ({ showModal: !prevState.showModal }));
	};

	filterEntries = () => {
		const { getRequestByType } = this.props;
		const { startDate, endDate, patientId } = this.state;
		this.setState({ filtering: true });
		getRequestByType(patientId, 'pharmacy', startDate, endDate);
	};

	componentDidMount() {
		const { startDate, endDate } = this.state;
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
		const { filtering } = this.state;
		const { Requests } = this.props;

		const filteredNames =
			this.props && this.props.Requests && this.props.Requests.length
				? this.props.Requests.map(patient => {
						return {
							value: patient.patient_id,
							label: patient.patient_name,
						};
				  })
				: [];

		const filteredOptions = _.uniqBy(filteredNames, 'value');

		const customStyle = {
			control: (provided, state) => ({
				...provided,
				minHeight: '24px !important',
				height: '2rem',
				width: '12rem',
			}),
		};

		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="row">
						<div className="col-md-12">
							{this.state.activeRequest ? (
								<PharmNewRequestViewModal
									showModal={this.state.showModal}
									onModalClick={this.onModalClick}
									activeRequest={this.state.activeRequest}
								/>
							) : null}
							<h6 className="element-header">All Requests</h6>
							<form className="row">
								<div className="form-group col-md-6">
									<label>From - To</label>
									<RangePicker
										onChange={e => {
											const date = e.map(date => {
												return moment(date._d).format('YYYY-MM-DD');
											});
											this.setState({
												startDate: date[0],
												endDate: date[1],
											});
										}}
									/>
								</div>
								<div className="form-group col-md-3">
									<label className="mr-2 " htmlFor="patient">
										Patient
									</label>
									<Select
										id="patient"
										name="patient"
										onChange={e => this.setState({ patientId: e.value })}
										options={filteredOptions}
										isSearchable={true}
										styles={customStyle}
									/>
								</div>
								<div className="form-group col-md-3 mt-4">
									<a
										className="btn btn-sm btn-primary btn-upper text-white"
										onClick={() => this.filterEntries()}>
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
					</div>

					<div className="element-box">
						<div className="table table-responsive">
							<table
								id="table"
								className="table table-theme v-middle table-hover">
								<thead>
									<tr>
										<th> Date</th>
										<th> Patient Name</th>
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
														<td>
															{request.patient_name ? request.patient_name : ''}
														</td>
														<td>
															{request.created_by ? request.created_by : ''}
														</td>
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

export default connect(mapStateToProps, { getRequestByType })(PharmAllRequest);
