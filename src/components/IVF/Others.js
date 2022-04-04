/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import {
	renderTextInput,
	renderSelect,
	renderTextArea,
	request,
} from '../../services/utilities';
import { ivfEnroll } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { loadPatientIVFForm } from '../../actions/patient';

const pregResult = [
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

const validate = values => {
	const errors = {};
	// if (!values.name) {
	// 	errors.name = 'enter vendor';
	// }

	return errors;
};

const Others = ({ page, handleSubmit, error, previousPage, history }) => {
	const [commencementDate, setCommencementDate] = useState('');
	const [stimulationDate, setStimulationDate] = useState('');
	const [embryoTransDate, setEmbryoTransDate] = useState('');
	const [pregTestDate, setPregTestDate] = useState('');
	const [oocytePickupDate, setOocytePickupDate] = useState('');

	const ivf = useSelector(state => state.patient.ivf);

	const dispatch = useDispatch();

	const onSubmitForm = async data => {
		try {
			dispatch(startBlock());
			data.dateOfCommencement = moment(commencementDate).format('YYYY-MM-DD');
			data.dateOfStimulation = moment(stimulationDate).format('YYYY-MM-DD');
			data.dateOfTreatment = moment(commencementDate).format('YYYY-MM-DD');
			data.embryoTransferDate = moment(embryoTransDate).format('YYYY-MM-DD');
			data.pregnancyTestDate = moment(pregTestDate).format('YYYY-MM-DD');

			const info = { ...ivf, ...data };

			console.log(info);

			await request(ivfEnroll, 'POST', true, info);
			notifySuccess('IVF patient enrolled!');
			dispatch(loadPatientIVFForm(null));
			dispatch(stopBlock());
			history.push('/ivf');
		} catch (error) {
			console.log(error);
			notifyError('IVF enrollment failed');
			dispatch(stopBlock());
		}
	};

	return (
		<>
			<h6 className="element-header">Step {page}. Others</h6>
			<div className="form-block">
				<>
					<form onSubmit={handleSubmit(onSubmitForm)}>
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
									onClick={previousPage}
								>
									Previous
								</button>
								<button className="btn btn-primary" type="submit">
									Save
								</button>
							</div>
						</div>
					</form>
				</>
			</div>
		</>
	);
};

export default withRouter(
	reduxForm({
		form: 'Others',
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true,
		validate,
	})(Others)
);
