/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
} from '../../services/utilities';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import searchingGIF from '../../assets/images/searching.gif';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import {
	searchAPI,
	staffAPI,
	lmpSource,
	bookingPeriod,
} from '../../services/constants';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import moment from 'moment';

import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';

const getOptionValues = option => option.id;
const getOptionLabels = option => `${option.other_names} ${option.surname}`;

const getOptions = async q => {
	if (!q || q.length < 3) {
		return [];
	}

	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

const validate = validateAntennatal;
class General extends Component {
	state = {
		searching: false,
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

	patientSet = pat => {
		// setValue('patient_id', pat.id);

		let name =
			(pat?.surname ? pat?.surname : '') +
			' ' +
			(pat?.other_names ? pat?.other_names : '');
		this.props.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.patient.current.value = name;
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

									<AsyncSelect
										isClearable
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										name="patient"
										ref={this.patient}
										loadOptions={getOptions}
										onChange={e => this.patientSet(e)}
										placeholder="Search patients"
									/>
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
