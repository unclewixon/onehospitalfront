/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

import { patientAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';

const { RangePicker } = DatePicker;

const status = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];

class SearchScan extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
	};

	componentDidMount() {
		this.fetchRadiology();
	}

	fetchRadiology = async () => {
		try {
			const { startDate, endDate } = this.state;
			this.setState({ loading: true });
			const url = `${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);

			this.props.loadRadiology(rs.result);
			console.log(rs);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all radiology request');
			this.setState({ loading: false, filtering: false });
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchRadiology();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	convertToIndividualRequest = data => {
		console.log(data);
		let newData = [];
		data.forEach(value => {
			if (Array.isArray(value.requestBody)) {
				console.log(value);
				value.requestBody.forEach(val => {
					newData.push({
						id: value.id,
						isActive: value.isActive,
						createdAt: value.createdAt,
						updateAt: value.updateAt,
						requestType: value.requestType,
						requestBody: {
							amount: value.amount,
							service_id: val.service_id,
							specialization: val.specialization
								? val.specialization
								: val.service_name,
						},
						status: value.status,
						patientName: value.patient_name,
						fileNumber: value.fileNumber,
					});
				});
			} else {
				newData.push(value);
			}
		});

		return newData.reverse();
	};

	render() {
		const { filtering, loading } = this.state;
		const { radiology } = this.props;

		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Search Scan</h6>
						<div className="col-md-12">
							<form className="row">
								<div className="form-group col-md-6">
									<label>From - To</label>
									<RangePicker onChange={e => this.dateChange(e)} />
								</div>
								<div className="form-group col-md-3">
									<label className="mr-2 " htmlFor="id">
										Status
									</label>
									<select
										style={{ height: '32px' }}
										id="status"
										className="form-control"
										name="status"
										onChange={e => this.change(e)}>
										<option value="">Choose status</option>
										{status.map((status, i) => {
											return (
												<option key={i} value={status.value}>
													{status.label}
												</option>
											);
										})}
									</select>
								</div>
								<div className="form-group col-md-3 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={this.doFilter}>
										<i className="os-icon os-icon-ui-37" />
										<span>
											{filtering ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Filter'
											)}
										</span>
									</div>
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
											<th className="text-center">Request Date</th>
											<th className="text-center">Patiend ID</th>
											<th className="text-center">Patient Name</th>
											<th className="text-center">Request</th>
											<th>
												<div className="th-inner "></div>
												<div className="fht-cell"></div>
											</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td className="text-center">
													<img alt="searching" src={searchingGIF} />
												</td>
											</tr>
										) : (
											radiology &&
											this.convertToIndividualRequest(radiology).map(
												request => {
													return (
														<tr data-index="0" data-id="20">
															<td className="text-center">
																{moment(request.createdAt).format('DD-MM-YYYY')}
															</td>
															<td className="text-center">
																{request.fileNumber}
															</td>
															<td className="text-center">
																{request.patientName}
															</td>
															<td className="text-center">
																{request.requestBody.specialization}
															</td>

															<td className="text-right row-actions">
																<Tooltip title="Receive Request">
																	<a className="secondary">
																		<i className="os-icon os-icon-folder-plus" />
																	</a>
																</Tooltip>
																<Tooltip title="Edit Request">
																	<a className="secondary">
																		<i className="os-icon os-icon-edit-32" />
																	</a>
																</Tooltip>
																<Tooltip title="Delete Request">
																	<a className="danger">
																		<i className="os-icon os-icon-ui-15" />
																	</a>
																</Tooltip>
															</td>
														</tr>
													);
												}
											)
										)}
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

const mapStateToProps = state => {
	return {
		radiology: state.patient.radiology,
	};
};
export default connect(mapStateToProps, { loadRadiology })(SearchScan);
