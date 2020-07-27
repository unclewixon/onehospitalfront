import React, { Component, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
	renderTextInput,
	renderSelect,
	renderMultiselect,
	renderTextArea,
	request,
} from '../../services/utilities';
import { Field, reduxForm, change as changeFieldValue } from 'redux-form';
import { withRouter } from 'react-router-dom';

import DatePicker from 'react-datepicker';

import moment from 'moment';

import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';
import { indication } from './AssesmentInfo';
import { loadPatientIVFForm } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import Select from 'react-select';
import SunEditor from 'suneditor-react';
import { API_URI, consultationAPI, IVFEnroll } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { useHistory } from 'react-router-dom';
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

let Others = props => {
	const dispatch = useDispatch();
	const { page, name, error, ivf, previousPage, onSubmit } = props;
	let [loading, setLoading] = useState(false);
	let [commencementDate, setCommencementDate] = useState('');
	let [stimulationDate, setStimulationDate] = useState('');
	let [embryoTransDate, setEmbryoTransDate] = useState('');
	let [pregTestDate, setPregTestDate] = useState('');
	let [oocytePickupDate, setOocytePickupDate] = useState('');
	let history = useHistory();

	const setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};
	const patient = React.createRef();

	const onSubmitForm = async data => {
		console.log(stimulationDate);
		console.log(commencementDate);
		setLoading(true);
		data.dateOfCommencement = commencementDate;
		data.dateOfStimulation = stimulationDate;
		data.dateOfTreatment = commencementDate;
		data.embryoTransferDate = embryoTransDate;
		data.pregnancyTestDate = pregTestDate;
		console.log(data);

		let res = { ...ivf, ...data };
		props.loadPatientIVFForm(res);

		try {
			const rs = await request(`${API_URI}${IVFEnroll}`, 'POST', true, res);
			//props.closeModals(true);
			notifySuccess('IVF created successfully');
			history.push('/ivf');
			setLoading(false);
		} catch (error) {
			console.log(error);
			notifyError('IVF creation failed');
			setLoading(false);
		}
		//dispatch(props.onSubmit);
	};

	return (
		<>
			<h6 className="element-header">Step {page}. Others</h6>
			<div className="form-block">
				{loading ? (
					<div className="form-block encounter">
						<img alt="searching" src={searchingGIF} />
					</div>
				) : (
					<>
						<form onSubmit={props.handleSubmit(onSubmitForm)}>
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
												selected={commencementDate}
												onChange={date => setCommencementDate(date)}
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
												selected={stimulationDate}
												onChange={date => setStimulationDate(date)}
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
										name="meducationUsed"
										component={renderTextInput}
										label="Medication Used"
										placeholder="Medication Used"
									/>
								</div>

								<div className="col-sm-4">
									<Field
										id="endometric_thickness"
										name="endometricThickness"
										component={renderTextInput}
										label="Endometric Thickness"
										placeholder="Endometric Thickness"
									/>
								</div>

								<div className="col-sm-4">
									<Field
										id="no_of_o_ret"
										name="noOfOocyteRetrieved"
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
												selected={oocytePickupDate}
												onChange={date => setOocytePickupDate(date)}
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
												selected={embryoTransDate}
												onChange={date => setEmbryoTransDate(date)}
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
										name="noOfEmbryoTransfer"
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
												selected={pregTestDate}
												onChange={date => setPregTestDate(date)}
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
										name="otherComments"
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
					</>
				)}
			</div>
		</>
	);
};

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
		ivf: state.patient.ivf,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadStaff, loadPatientIVFForm })(Others)
);
