import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Field, reduxForm } from 'redux-form';
import { withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import {
	renderTextInput,
	renderSelect,
	renderTextArea,
	request,
} from '../../services/utilities';
import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';
import { loadPatientIVFForm } from '../../actions/patient';
import searchingGIF from '../../assets/images/searching.gif';
import { IVFEnroll } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';

const validate = validateAntennatal;

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

let Others = props => {
	const { page, error, ivf, previousPage } = props;

	const { register } = useForm();
	let [loading, setLoading] = useState(false);
	let [commencementDate, setCommencementDate] = useState('');
	let [stimulationDate, setStimulationDate] = useState('');
	let [embryoTransDate, setEmbryoTransDate] = useState('');
	let [pregTestDate, setPregTestDate] = useState('');
	let [oocytePickupDate, setOocytePickupDate] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [multi, setMulti] = useState(false);
	const [labTests, setLabTests] = useState([]);
	const [test, setTest] = useState([]);
	const [labTestCategory, setLabTestCategory] = useState([]);
	const [labTestCategoryRaw, setLabTestCategoryRaw] = useState([]);

	let history = useHistory();

	const fetchLabTestCategory = async () => {
		try {
			const rs = await request(
				`lab-tests/categories?loadOnce=${true}&hmo_id=${ivf.hmo_id}`,
				'GET',
				true
			);
			setLabTestCategoryRaw(rs);
			let data = [];
			rs.forEach((item, index) => {
				const res = { label: item.name, value: item.id };
				data = [...data, res];
			});
			setLabTestCategory(data);
			setLoaded(true);
		} catch (error) {
			console.log(error);
			notifyError('error fetching lab test category');
		}
	};

	const handleChangeLabTestCategory = evt => {
		let value = String(evt.value);
		fetchLabTestsByCategory(value);
	};

	const handleChangeProcedure = evt => {
		ivf.lab_tests = evt;
	};

	const fetchLabTestsByCategory = id => {
		const rs = labTestCategoryRaw.find(cat => cat.id === Number(id));
		console.log(rs);
		let labtests = [];
		const tests = rs.lab_tests || [];
		setTest(tests);
		tests.forEach((item, index) => {
			const res = { label: item.name, value: item.id };
			labtests = [...labtests, res];
		});
		setLabTests(labtests);
	};

	useEffect(() => {
		if (!loaded) {
			fetchLabTestCategory();
			setLoaded(true);
		}
	}, [loaded]);

	// const setDate = async (date, type) => {
	// 	await this.setState({ [type]: date });
	// };
	// const patient = React.createRef();

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
		const mappedId = res.lab_tests.map(lbt => String(lbt.value));
		res.labTests = mappedId;
		props.loadPatientIVFForm(res);

		console.log(res);

		try {
			await request(`${IVFEnroll}`, 'POST', true, res);
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
								<div className="form-group col-sm-6">
									<label>Lab Test category</label>
									<Select
										name="test_category"
										placeholder="Select Test Category"
										options={labTestCategory}
										ref={register({ name: 'test_category' })}
										onChange={evt => handleChangeLabTestCategory(evt)}
										required
									/>
								</div>
								<div className="form-group col-sm-6">
									<label>
										Lab Tests to request{' '}
										{multi ? (
											<span className="mx-1 text-danger">* required </span>
										) : (
											''
										)}
									</label>
									<Select
										name="lab_tests"
										placeholder="Select lab tests to request"
										isMulti
										options={labTests}
										ref={register({ name: 'lab_tests' })}
										onChange={evt => handleChangeProcedure(evt)}
										required
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
										Save
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
