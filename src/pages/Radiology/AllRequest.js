/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Tooltip from 'antd/lib/tooltip';

import { searchAPI, patientAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadRadiology } from '../../actions/patient';

const { RangePicker } = DatePicker;

const status = [
	{ value: 0, label: 'Open' },
	{ value: 1, label: 'Closed' },
	{ value: 2, label: 'Approved' },
];

class OpenRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		searching: '',
		patients: [],
		query: '',
		patient_id: '',
	};

	componentDidMount() {
		this.fetchRadiology();
	}

	fetchRadiology = async () => {
		try {
			const { startDate, endDate, status } = this.state;
			this.setState({ loading: true });
			const url = `${patientAPI}/requests/imaging?startDate=${startDate}&endDate=${endDate}&status=${status}`;
			const rs = await request(url, 'GET', true);

			this.props.loadRadiology(rs.result);
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log('this', error);
			notifyError('Error fetching all radiology request');
			this.setState({ loading: false, filtering: false });
		}
	};

	fetchRadiologyByPatient = async () => {
		const { startDate, endDate, status, patient_id } = this.state;
		console.log(startDate, endDate, status, patient_id);
		try {
			this.setState({ loading: true });
			const rs = await request(
				`${patientAPI}/${patient_id}/request/imaging?startDate=${startDate}&endDate=${endDate}&status=${status}`,
				'GET',
				true
			);
			console.log(rs);
			this.props.loadRadiology(rs);
			console.log(rs, 'response');
			this.setState({ loading: false, filtering: false });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all radiology request');
			this.setState({ loading: false, filtering: false });
		}
	};

	convertToIndividualRequest = data => {
		console.log(data);
		let newData = [];
		data.forEach(value => {
			if (Array.isArray(value.requestBody)) {
				value.requestBody.forEach(val => {
					newData.push({
						id: value.id,
						isActive: value.isActive,
						createdAt: value.createdAt,
						updateAt: value.updateAt,
						requestType: value.requestType,
						requestBody: {
							amount: val.amount,
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

	doFilter = e => {
		e.preventDefault();
		// this.setState({ filtering: true });
		this.setState({ ...this.state, filtering: true });

		this.state.patient_id
			? this.fetchRadiologyByPatient()
			: this.fetchRadiology();
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

	patientSet = pat => {
		console.log(pat);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		document.getElementById('patient').value = name;
		// setPatients([]);
		this.setState({ ...this.state, patient_id: pat.id, patients: [] });
	};

	searchPatient = async () => {
		if (this.state.query.length > 2) {
			try {
				this.setState({ ...this.state, searching: true });
				const rs = await request(
					`${searchAPI}?q=${this.state.query}`,
					'GET',
					true
				);

				this.setState({
					...this.state,
					patients: rs,
					searching: false,
					query: '',
				});
				// setTimeout(() => {
				// 	this.setState({ ...this.state, patients: [] });
				// }, 3000);
			} catch (e) {
				notifyError('Error Occurred');
				this.setState({ ...this.state, searching: true });
			}
		}
	};
	handlePatientChange = e => {
		this.setState({ ...this.state, query: e.target.value });
		this.searchPatient();
	};
	render() {
		const { filtering, loading, searching, patients } = this.state;
		const { radiology } = this.props;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Open Request</h6>

						<div className="col-md-12 px-0">
							<form className="row">
								<div className="form-group col-sm-3">
									<label>Patient</label>

									<input
										className="form-control"
										placeholder="Search for patient"
										type="text"
										name="patient"
										defaultValue=""
										id="patient"
										onChange={this.handlePatientChange}
										autoComplete="off"
										required
										style={{ height: '32px' }}
									/>
									{searching && (
										<div className="searching text-center">
											<img alt="searching" src={searchingGIF} />
										</div>
									)}

									{patients &&
										patients.map(pat => {
											return (
												<div
													style={{ display: 'flex' }}
													key={pat.id}
													className="element-box">
													<a
														onClick={() => this.patientSet(pat)}
														className="ssg-item cursor">
														{/* <div className="item-name" dangerouslySetInnerHTML={{__html: `${p.fileNumber} - ${ps.length === 1 ? p.id : `${p[0]}${compiled({'emrid': search})}${p[1]}`}`}}/> */}
														<div
															className="item-name"
															dangerouslySetInnerHTML={{
																__html: `${pat.surname} ${pat.other_names}`,
															}}
														/>
													</a>
												</div>
											);
										})}
								</div>
								<div className="form-group col-md-4">
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
								<div className="form-group col-md-2 mt-4">
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
												(request, i) => {
													return (
														<tr data-index="0" key={i}>
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

export default connect(mapStateToProps, { loadRadiology })(OpenRequest);
