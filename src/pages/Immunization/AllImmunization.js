/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { API_URI, searchAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { request, confirmAction } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { loadImmunization, deleteImmunization } from '../../actions/patient';
import _ from 'lodash';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';

import { viewImmunizationDetail } from '../../actions/general';
const { RangePicker } = DatePicker;
export class AllImmunization extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		patients: [],
		patient_id: '',
		patient_name: '',
		searching: false,
		query: '',
	};

	patient = React.createRef();
	staff = React.createRef();
	componentDidMount() {
		this.fetchImmunization();
	}
	fetchImmunization = async () => {
		const { startDate, endDate, patient_id } = this.state;
		try {
			this.setState({ loading: true });
			// console.log(
			// 	`${API_URI}/patient/immunizations?startDate=${startDate}&endDate=${endDate}&patient_id=`
			// );

			const rs = await request(
				`patient/immunizations?startDate=${startDate}&endDate=${endDate}&patient_id=${patient_id}`,
				'GET',
				true
			);

			this.props.loadImmunization(rs);
			console.log(rs);
			this.setState({ loading: false, filtering: false, patient_id: '' });
			this.patient.current.value = '';
		} catch (error) {
			console.log(error);
			notifyError('Error fetching immunization enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ ...this.state, filtering: true });
		this.fetchImmunization();
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0] ? date[0] : '',
			endDate: date[1] ? date[1] : '',
		});
	};

	deleteImmunization = id => async () => {
		try {
			await this.props.deleteImmunization(id);
			notifySuccess('Delete successful');
		} catch (e) {
			notifyError('Error fetching immunization enrolment requests');
			this.setState({ loading: false, filtering: false });
		}
	};

	confirmDelete = id => {
		confirmAction(this.deleteImmunization(id), null);
	};

	handlePatientChange = e => {
		this.setState({ query: e.target.value });
		this.searchPatient(e.target.name);
	};

	searchPatient = async name => {
		if (this.state.query.length > 2) {
			try {
				if (name === 'patient_id') {
					this.setState({ searching: true });
					const rs = await request(
						`searchAPI}?q=${this.state.query}`,
						'GET',
						true
					);
					this.setState({ patients: rs, searching: false });
				} else {
					// this.setState({ searchingStaff: true });
					// const rs = await request(
					// 	`${API_URI}/hr/staffs/find?q=${this.state.query}`,
					// 	'GET',
					// 	true
					// );
					// this.setState({ staffs: rs, searchingStaff: false });
				}
			} catch (e) {
				notifyError('Error Occurred');
				this.setState({});
			}
		}
	};
	patientSet = pat => {
		// setValue('patient_id', pat.id);

		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');
		this.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.patient.current.value = name;
		this.setState({ patients: [], patientError: false, query: '' });
	};

	setPatient = (value, name) => {
		this.setState({ ...this.state, patient_id: value, patient_name: name });
		console.log(this.state.patient_id, value);
	};

	render() {
		const {
			filtering,
			loading,
			searching,
			patient_id,
			patient_name,
			patients,
		} = this.state;
		const immunization = this.props.immunization;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<div className="element-actions"></div>
						<div className="row">
							<div className="col-sm-12">
								<div className="element-wrapper">
									<div className="col-md-12 px-0">
										<form className="row">
											<div className="form-group col-sm-5">
												<label>
													Patient
													{this.state.patientError ? (
														<span className="text-danger">
															{' '}
															* Please search and select patient
														</span>
													) : (
														''
													)}
												</label>

												<input
													className="form-control"
													placeholder="Search for patient and select"
													type="text"
													name="patient_id"
													ref={this.patient}
													defaultValue={patient_name}
													id="patient"
													onChange={this.handlePatientChange}
													autoComplete="off"
													required
													style={{ padding: '0.25rem 0.75rem' }}
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
																	<hr />
																</a>
															</div>
														);
													})}
											</div>

											<div className="form-group col-md-4 pr-0">
												<label>From - To</label>
												<RangePicker
													onChange={e => this.dateChange(e)}
													defaultValue={[
														this.state.startDate,
														this.state.endDate,
													]}
												/>
											</div>

											<div className="form-group col-md-1 pr-0 mt-4">
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
											<table id="table" className="table">
												<thead>
													<tr>
														<th className="text-center">S/N</th>
														<th className="text-center">Patient Name</th>
														<th className="text-center">Type of Vaccine</th>
														<th className="text-center">Administered Date</th>
														<th className="text-center">Vaccine batch no</th>
														<th className="text-center">Administered By</th>
														<th className="text-center">Actions</th>
													</tr>
												</thead>
												<tbody>
													{loading ? (
														<tr>
															<td colSpan="8" className="text-center">
																<img alt="searching" src={searchingGIF} />
															</td>
														</tr>
													) : !_.isEmpty(this.props.immunization) ? (
														immunization.map((immun, i) => {
															return (
																<tr key={i + 1}>
																	<td className="text-center">{i + 1}</td>
																	<td className="text-center text-capitalize">
																		{immun.patient_name}
																	</td>
																	<td className="text-center text-capitalize">
																		{immun.typeOfVaccine}
																	</td>
																	<td className="text-center">
																		{immun.dateOfAdministration}
																	</td>
																	<td className="text-center">
																		{immun.vaccineBatchNo}
																	</td>
																	<td className="text-center text-capitalize">
																		{immun.administeredbyname}
																	</td>
																	<td className="text-center">
																		<Tooltip title="view details">
																			<a
																				className="secondary mx-1"
																				onClick={() =>
																					this.props.viewImmunizationDetail(
																						true,
																						immun
																					)
																				}>
																				<i className="os-icon os-icon-eye" />
																			</a>
																		</Tooltip>
																		<Tooltip title="Edit Request ">
																			<a className="secondary mx-2">
																				<i className="os-icon os-icon-edit-32" />
																			</a>
																		</Tooltip>
																		<Tooltip title="Delete Request">
																			<a
																				className="text-danger mx-1"
																				onClick={() =>
																					this.confirmDelete(immun.id)
																				}>
																				<i className="os-icon os-icon-ui-15" />
																			</a>
																		</Tooltip>
																	</td>
																</tr>
															);
														})
													) : (
														<tr>
															{' '}
															<td colSpan="9" className="text-center">
																No immunization enrolment
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
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

const mapStateToProps = state => {
	return {
		immunization: state.patient.immunization,
	};
};
export default connect(mapStateToProps, {
	loadImmunization,
	viewImmunizationDetail,
	deleteImmunization,
})(AllImmunization);
