import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import { loadPatientIVFForm } from '../../actions/patient';

const validate = validateAntennatal;
let HusbandLab = props => {
	const dispatch = useDispatch();
	const { page, name, error, ivf, previousPage, onSubmit } = props;
	let [searching, setSearching] = useState(false);
	let [patients, setPatients] = useState([]);
	let [selectedPatient, setSelectedPatient] = useState([]);
	let [staffs, setStaffs] = useState([]);
	let [query, setQuery] = useState('');

	useEffect(() => {
		fetchStaffs();
	}, []);

	const fetchStaffs = async () => {
		if (props.staffs.length < 1) {
			try {
				const rs = await request(`${API_URI}${staffAPI}`, 'GET', true);
				props.loadStaff(rs);
			} catch (error) {
				console.log(error);
			}
		}

		let staffs = props.staffs.map(el => el.first_name + ' ' + el.last_name);
		setStaffs(staffs);
	};
	const patient = React.createRef();

	const handlePatientChange = e => {
		setQuery(e.target.value);
		searchPatient();
	};

	const searchPatient = async () => {
		if (query.length > 2) {
			try {
				setSearching(true);
				const rs = await request(
					`${API_URI}${searchAPI}?q=${query}`,
					'GET',
					true
				);
				setSearching(false);
				setPatients(rs);
			} catch (e) {
				notifyError('Error Occurred');
			}
		}
	};

	const patientSet = pat => {
		// setValue('patient_id', pat.id);

		console.log(pat);
		let name =
			(pat.surname ? pat.surname : '') +
			' ' +
			(pat.other_names ? pat.other_names : '');

		let res = { label: pat.id, value: name };
		setSelectedPatient(res);
		//this.props.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;
		patient.current.value = name;
		setPatients([]);
	};

	const onSubmitForm = async data => {
		console.log(data);
		ivf.husband_id = selectedPatient.label;
		ivf.husbandLabDetails = data;
		ivf.husbandLabDetails.name = selectedPatient.value;
		props.loadPatientIVFForm(ivf);
		dispatch(props.onSubmit);
	};

	return (
		<>
			<h6 className="element-header">Step {page}. Husband's Lab Details</h6>
			<div className="form-block">
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
						<div className="form-group col-sm-12">
							<label>Husband (Secondary Patient Patient)</label>

							<input
								className="form-control"
								placeholder="Search for patient"
								type="text"
								name="patient_id"
								ref={patient}
								defaultValue={ivf?.husbandLabDetails?.name}
								id="patient"
								onChange={handlePatientChange}
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
												onClick={() => patientSet(pat)}
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

					<h5>SFA (Andrology)</h5>
					<br />

					<div className="row">
						<div className="col-sm-3">
							<Field
								id="count"
								name="sfaAndrology.count"
								component={renderTextInput}
								label="Count 10^6 ML"
								placeholder="Count 10^6 ML"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="mortility"
								name="sfaAndrology.mortility"
								component={renderTextInput}
								label="Mortility"
								placeholder="Mortility"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="morphility"
								name="sfaAndrology.morphility"
								component={renderTextInput}
								label="Morphility"
								placeholder="Morphility"
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="andrology_summary"
								name="sfaAndrology.summary"
								component={renderTextArea}
								label="Andrology Summary"
								placeholder="Andrology Summary"
							/>
						</div>
					</div>

					<h5>Serology</h5>
					<br />

					<div className="row">
						<div className="col-sm-3">
							<Field
								id="hiv"
								name="serology.hiv"
								component={renderTextInput}
								label="HIV"
								placeholder="HIV"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="hep_b"
								name="serology.hepb"
								component={renderTextInput}
								label="HEP-B"
								placeholder="HEP-B"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="hep_c"
								name="serology.hepc"
								component={renderTextInput}
								label="HEP-C"
								placeholder="HEP-C"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="vdrl"
								name="serology.vdrl"
								component={renderTextInput}
								label="VDRL"
								placeholder="VDRL"
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="genotype"
								name="genotype"
								component={renderSelect}
								label="Genotype"
								placeholder="Select genotype"
								data={genotype}
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="bloodGroup"
								name="bloodGroup"
								component={renderSelect}
								label="Blood Group"
								placeholder="Select Blood Group"
								data={bloodGroup}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<Field
								id="randomBlood"
								name="randomBloodSugar"
								component={renderTextInput}
								label="Random Blood Sugar"
								placeholder="Random Blood Sugar"
							/>
						</div>

						<div className="col-sm-6">
							<Field
								id="fastingBlood"
								name="fastingBloodSugar"
								component={renderTextInput}
								label="Fasting Blood Sugar"
								placeholder="Fasting Blood Sugar"
							/>
						</div>
					</div>

					<h5>Hormonals</h5>
					<br />

					<div className="row">
						<div className="col-sm-3">
							<Field
								id="fsh"
								name="hormonals.fsh"
								component={renderTextInput}
								label="FSH"
								placeholder="FSH"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="lh"
								name="hormonals.lh"
								component={renderTextInput}
								label="LH"
								placeholder="LH"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="prol"
								name="hormonals.prol"
								component={renderTextInput}
								label="PROL"
								placeholder="PROL"
							/>
						</div>

						<div className="col-sm-3">
							<Field
								id="testosterone"
								name="hormonals.testosterone"
								component={renderTextInput}
								label="Testosterone"
								placeholder="Testosterone"
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
};

HusbandLab = reduxForm({
	form: 'HusbandLab', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(HusbandLab);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		staffs: state.hr.staffs,
		ivf: state.patient.ivf,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadStaff, loadPatientIVFForm })(HusbandLab)
);
