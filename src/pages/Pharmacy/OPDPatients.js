/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { request, confirmAction } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { loadOPDImmunizationAppointments } from '../../actions/patient';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;

// const departments = [
//     { id: 'ejejekek', name: 'angel' },
//     { id: 'sislkas', name: 'kafta' },
// ];

const status = [
	{ value: 0, label: 'processing' },
	{ value: 1, label: 'done' },
];
class OPDPatientsPharmRequest extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
		showModal: false,
		activeRequest: null,
		loaded: false,
	};

	componentDidMount() {
		this.fetchClinicalLab(() => {
			this.setState({ loading: false, filtering: false });
		});
	}
	fetchClinicalLab = async cb => {
		try {
			this.setState({ loading: true });
			const rs = await request(
				`front-desk/appointments?type=immunization`,
				'GET',
				true
			);
			this.props.loadOPDImmunizationAppointments(rs);
			cb();
		} catch (error) {
			notifyError('Error fetching all lab request');
			cb();
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchClinicalLab(() =>
			this.setState({ filtering: false, loading: false })
		);
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

	onModalClick = () => {
		this.setState({
			showModal: !this.state.showModal,
		});
	};

	onDeleteTransaction = data => {
		this.props
			.deleteTransaction(data)
			.then(response => {
				notifySuccess('Transaction deleted');
			})
			.catch(error => {
				notifyError('Error deleting  transaction ');
			});
	};
	confirmDelete = data => {
		confirmAction(this.onDeleteTransaction, data);
	};

	modalFunction = lab => {
		this.onModalClick();
		this.setState({ activeRequest: lab });
	};

	render() {
		const { filtering, loading } = this.state;
		const { opdPharmAppointments } = this.props;

		return (
			<>
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="row">
							<div className="col-md-12">
								<h6 className="element-header">
									OPD Patients Immunization Appointment:
								</h6>

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

							<div className="col-sm-12">
								<div className="element-box p-0">
									<div className="table-responsive">
										{loading ? (
											<tbody>
												<tr>
													<td colSpan="4" className="text-center">
														<img alt="searching" src={searchingGIF} />
													</td>
												</tr>
											</tbody>
										) : (
											<table className="table table-striped">
												<thead>
													<tr>
														<th>
															<div className="th-inner sortable both">S/N</div>
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
																Patient Name
															</div>
															<div className="fht-cell"></div>
														</th>
														<th>
															<div className="th-inner sortable both">
																Status
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
													{opdPharmAppointments &&
														opdPharmAppointments.reverse().map((lab, index) => {
															return (
																<tr
																	data-index="0"
																	data-id="20"
																	className={
																		lab &&
																		lab.requestBody &&
																		lab.requestBody.urgent
																			? 'table urgent'
																			: ''
																	}>
																	<td>
																		<a className="item-title text-color">
																			{index + 1}
																		</a>
																	</td>
																	<td className="flex">
																		<span
																			className="w-32 avatar gd-warning"
																			style={{
																				boxShadow: 'none',
																				justifyContent: 'start',
																			}}>
																			{moment(lab.createdAt).format(
																				'DD-MM-YYYY'
																			)}
																		</span>
																	</td>
																	<td className="flex">
																		<p className="item-title text-color">
																			{lab.patient_name ? lab.patient_name : ''}
																		</p>
																	</td>
																	<td className="flex">
																		<span className="status-pill smaller green"></span>
																		{'  '}
																		<a className="item-title text-color">
																			{lab?.status}
																		</a>
																	</td>
																	<td className="text-right row-actions">
																		<Tooltip title="Create Lab Request">
																			<Link
																				to="/pharmacy2/new-request"
																				style={{
																					color: '#fff',
																					fontSize: '10px',
																				}}
																				className="btn btn-primary">
																				Create Request
																			</Link>
																		</Tooltip>
																	</td>
																</tr>
															);
														})}
												</tbody>
											</table>
										)}
										{!isEmpty(opdPharmAppointments) ? null : (
											<div className="text-center">
												No Pharmacy OPD Appointments
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		opdPharmAppointments: state.patient.opdPharmAppointments,
	};
};

export default connect(mapStateToProps, { loadOPDImmunizationAppointments })(
	OPDPatientsPharmRequest
);
