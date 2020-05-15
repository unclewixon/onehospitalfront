import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
	renderTextArea,
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
	genotype,
	bloodGroup,
} from '../../services/constants';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';
import { indication } from './AssesmentInfo';

const validate = validateAntennatal;
export const pregResult = [
	{
		id: 'Positive',
		name: 'Positive',
	},
	{
		id: 'Negative',
		name: 'Negative',
	},
	{
		id: 'Cancelled',
		name: 'Cancelled',
	},
];
export class Others extends Component {
	state = {
		searching: false,
		patients: [],
		query: '',
		commencementDate: '',
		stimulationDate: '',
		embryoTransDate: '',
		pregTestDate: '',
		oocytePickupDate: '',
		staffs: [],
	};

	componentDidMount() {}
	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};
	patient = React.createRef();

	render() {
		const { handleSubmit, error, page, name, previousPage } = this.props;
		const { searching, patients } = this.state;

		console.log(name);
		return (
			<>
				<h6 className="element-header">Step {page}. Others</h6>
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

						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>Date of Commencement</label>
									<div className="custom-date-input">
										<DatePicker
											selected={this.state.commencementDate}
											onChange={date => this.setDate(date, 'commencementDate')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="	form-control"
											placeholderText="Date of Commencement"
											required
										/>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="form-group">
									<label>Date of Stimulation</label>
									<div className="custom-date-input">
										<DatePicker
											selected={this.state.stimulationDate}
											onChange={date => this.setDate(date, 'stimulationDate')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="form-control"
											placeholderText="Date of Stimulation"
											required
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-4">
								<Field
									id="medication_used"
									name="medication_used"
									component={renderTextInput}
									label="Medication Used"
									placeholder="Medication Used"
								/>
							</div>

							<div className="col-sm-4">
								<Field
									id="endometric_thickness"
									name="endometric_thickness"
									component={renderTextInput}
									label="Endometric Thickness"
									placeholder="Endometric Thickness"
								/>
							</div>

							<div className="col-sm-4">
								<Field
									id="no_of_o_ret"
									name="no_of_o_ret"
									component={renderTextInput}
									label="Number of Oocyte Retrieved"
									placeholder="Number of Oocyte Retrieved"
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<label>Date of Oocyte Pickup/Retrieval/Treatment</label>
									<div className="custom-date-input">
										<DatePicker
											selected={this.state.oocytePickupDate}
											onChange={date => this.setDate(date, 'oocytePickupDate')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="	form-control"
											placeholderText="Date of Oocyte Pickup/Retrieval/Treatment"
											required
										/>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="form-group">
									<label>Embryo Transfer Date</label>
									<div className="custom-date-input">
										<DatePicker
											selected={this.state.embryoTransDate}
											onChange={date => this.setDate(date, 'embryoTransDate')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="form-control"
											placeholderText="Embryo Transfer Date"
											required
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Field
									id="numberEmbTransfer"
									name="numberEmbTransfer"
									component={renderTextInput}
									label="Number Of Embryo Transfer"
									placeholder="Number Of Embryo Transfer"
								/>
							</div>

							<div className="col-sm-6">
								<div className="form-group">
									<label>Pregnancy Test Date</label>
									<div className="custom-date-input">
										<DatePicker
											selected={this.state.pregTestDate}
											onChange={date => this.setDate(date, 'pregTestDate')}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="dd-MMM-yyyy"
											className="form-control"
											placeholderText="Pregnancy Test Date"
											required
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-6">
								<Field
									id="result"
									name="result"
									component={renderSelect}
									label="Result"
									placeholder="Result"
									data={pregResult}
								/>
							</div>

							<div className="col-sm-6">
								<Field
									id="comments"
									name="comments"
									component={renderTextArea}
									label="Comments"
									placeholder="Comments"
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									type="button"
									onClick={previousPage}>
									Previous
								</button>
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

Others = reduxForm({
	form: 'Others', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(Others);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		staffs: state.hr.staffs,
	};
};

export default withRouter(connect(mapStateToProps, { loadStaff })(Others));
