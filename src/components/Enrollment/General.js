import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { withRouter } from 'react-router-dom';
import searchingGIF from '../../assets/images/searching.gif';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	API_URI,
	searchAPI,
	staffAPI,
	lmpSource,
	bookingPeriod,
} from '../../services/constants';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';

const validate = validateAntennatal;
export class General extends Component {
	state = {
		searching: false,
		patients: [],
		query: '',
		staffs: [],
	};

	componentDidMount() {
		console.log(this.props.staffs);

		this.fetchStaffs();
	}

	fetchStaffs = async () => {
		if (this.props.staffs.length < 1) {
			try {
				const rs = await request(`${staffAPI}`, 'GET', true);
				this.props.loadStaff(rs);
			} catch (error) {
				console.log(error);
			}
		}

		let staffs = this.props.staffs.map(
			el => el.first_name + ' ' + el.last_name
		);

		this.setState({ staffs });
	};
	patient = React.createRef();

	handlePatientChange = e => {
		this.setState({ query: e.target.value });
		this.searchPatient();
	};

	searchPatient = async () => {
		if (this.state.query.length > 2) {
			try {
				this.setState({ searching: true });
				const rs = await request(
					`${searchAPI}?q=${this.state.query}`,
					'GET',
					true
				);

				this.setState({ patients: rs, searching: false });
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
		this.props.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.patient.current.value = name;
		this.setState({ patients: [] });
	};
	render() {
		const { handleSubmit, error, page, name } = this.props;
		const { searching, patients } = this.state;

		console.log(name);
		return (
			<>
				<h6 className="element-header">Step {page}. General</h6>
				<div className="form-block">
					<form onSubmit={handleSubmit}>
						{error && (
							<div
								className="alert alert-danger"
								dangerouslySetInnerHTML={{
									__html: `<strong>Error!</strong> ${error}`,
								}}
							/>
						)}

						{this.props.location.hash ? null : (
							<div className="row">
								<div className="form-group col-sm-12">
									<label>Patient</label>

									<input
										className="form-control"
										placeholder="Search for patient"
										type="text"
										name="patient_id"
										ref={this.patient}
										defaultValue={name}
										id="patient"
										onChange={this.handlePatientChange}
										autoComplete="off"
										required
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
							</div>
						)}
						<div className="row">
							<div className="col-sm-6">
								<Field
									id="bookingPeriod"
									name="bookingPeriod"
									component={renderSelect}
									label="Indication for booking"
									placeholder="Select bookings"
									data={bookingPeriod}
								/>
							</div>

							<div className="col-sm-6">
								<label>Care</label>
								<Field
									name="requiredCare"
									component={renderMultiselect}
									defaultValue={[]}
									data={this.state.staffs}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>LMP</label>
									<div className="custom-date-input">
										<DatePicker
											selected={this.props.lmp}
											onChange={date => this.props.setDate(date, 'lmp')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="single-daterange form-control"
											placeholderText="Select date of birth"
											maxDate={new Date()}
											required
										/>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<Field
									id="lmpSource"
									name="lmpSource"
									component={renderSelect}
									label="Select Lmp Source"
									placeholder="Select lmp source"
									data={lmpSource}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12">
								<Field
									id="e_o_d"
									name="e_o_d"
									component={renderTextInput}
									value={
										this.props.lmp
											? moment(this.props.lmp)
													.add(9, 'M')
													.format('DD-MM-YYYY')
											: ''
									}
									label="E.O.D"
									type="text"
									placeholder={
										this.props.lmp
											? moment(this.props.lmp)
													.add(9, 'M')
													.format('DD-MM-YYYY')
											: ''
									}
									readOnly
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
								<button className="btn btn-primary" type="submit">
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</>
		);
	}
}

General = reduxForm({
	form: 'antennatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(General);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		staffs: state.hr.staffs,
	};
};

export default withRouter(connect(mapStateToProps, { loadStaff })(General));
