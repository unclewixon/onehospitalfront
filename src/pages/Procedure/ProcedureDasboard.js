/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uniqBy from 'lodash.uniqby';
import DatePicker from 'antd/lib/date-picker';
import Select from 'react-select';
import Tooltip from 'antd/lib/tooltip';

import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import waiting from '../../assets/images/waiting.gif';
import ModalProcedure from '../../components/Modals/ModalProcedure';

const { RangePicker } = DatePicker;

class ProcedureDashboard extends Component {
	state = {
		loaded: false,
		patientId: '',
		startDate: '',
		endDate: '',
		filtering: false,
		showModal: false,
		activeRequest: null,
		procedures: [],
	};

	componentDidMount() {
		this.fetchProcedures();
	}

	fetchProcedures = async patientId => {
		try {
			const { startDate, endDate } = this.state;
			this.setState({ loaded: true });
			const url = patientId
				? `patient/${patientId}/request/procedure?startDate=${startDate}&endDate=${endDate}`
				: `patient/requests/procedure?startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			return this.setState({
				loaded: false,
				filtering: false,
				procedures: rs.result,
			});
		} catch (error) {
			notifyError('error fetching procedure requests');
			this.setState({ loaded: false, filtering: false });
		}
	};

	getRequests = arr => {
		let rer = [];
		arr.forEach(val => {
			rer = [...rer, val.service_name];
		});
		return rer.join(', ');
	};

	onModalClick = () => {
		this.setState({ showModal: !this.state.showModal });
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

	filterEntries = () => {
		this.setState({ filtering: true });
		this.fetchProcedures(this.state.patientId);
	};

	render() {
		const { loaded, filtering, procedures } = this.state;

		const filteredNames = procedures.map(patient => {
			return {
				value: patient.patient_id,
				label: patient.patient_name,
			};
		});

		const filteredOptions = uniqBy(filteredNames, 'value');

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
							{this.state.activeRequest && (
								<ModalProcedure
									activeRequest={this.state.activeRequest}
									showModal={this.state.showModal}
									onModalClick={this.onModalClick}
								/>
							)}
							<h6 className="element-header">Recent Requests:</h6>
							<form className="row">
								<div className="form-group col-md-6">
									<label>From - To</label>
									<RangePicker onChange={e => this.dateChange(e)} />
								</div>
								<div className="form-group col-md-3">
									<label className="mr-2 " htmlFor="id">
										Patient
									</label>
									<Select
										styles={customStyle}
										id="patientId"
										isSearchable={true}
										name="patientId"
										options={filteredOptions}
										onChange={e => this.setState({ patientId: e.value })}
									/>
								</div>
								<div className="form-group col-md-3 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={() => {
											this.filterEntries();
										}}>
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
						<div className="col-sm-12">
							<div className="element-box">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th>
													<div className="th-inner "></div>
													<div className="fht-cell"></div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Patient Name
													</div>
													<div className="fht-cell"></div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Request Date
													</div>
													<div className="fht-cell"></div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Requested By
													</div>
													<div className="fht-cell"></div>
												</th>
												<th>
													<div className="th-inner sortable both">
														Request Specimen
													</div>
													<div className="fht-cell"></div>
												</th>
												<th>
													<div className="th-inner "></div>
													<div className="fht-cell"></div>
												</th>
											</tr>
										</thead>

										<tbody>
											{loaded ? (
												<tr>
													<td colSpan="6" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											) : (
												procedures.map((item, i) => {
													return (
														<tr key={i}>
															<td>{i + 1}</td>
															<td>{item.patient_name}</td>
															<td>
																{moment(item.createdAt).format(
																	'DD-MMM-YYYY h:mm A'
																)}
															</td>
															<td>{item.created_by}</td>
															<td>{this.getRequests(item.requestBody)}</td>
															<td></td>
															<td className="row-actions text-right">
																<Tooltip title="View Request">
																	<a
																		href="#"
																		onClick={() => {
																			this.onModalClick();
																			this.setState({ activeRequest: item });
																		}}>
																		<i className="os-icon os-icon-documents-03" />
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
											)}
										</tbody>
									</table>
								</div>
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
		patient: state.user.patient,
	};
};
export default connect(mapStateToProps)(ProcedureDashboard);
