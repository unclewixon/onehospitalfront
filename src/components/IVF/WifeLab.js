/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { renderTextInput, renderSelect } from '../../services/utilities';
import searchingGIF from '../../assets/images/searching.gif';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import {
	searchAPI,
	staffAPI,
	genotype,
	bloodGroup,
} from '../../services/constants';
import { loadStaff } from '../../actions/hr';
import { validateAntennatal } from '../../services/validationSchemas';
import { loadPatientIVFForm } from '../../actions/patient';

const validate = validateAntennatal;
let WifeLab = props => {
	const { page, error, ivf } = props;
	const dispatch = useDispatch();
	let [searching, setSearching] = useState(false);
	let [patients, setPatients] = useState([]);
	let [selectedPatient, setSelectedPatient] = useState([]);
	// let [staffs, setStaffs] = useState([]);
	let [query, setQuery] = useState('');

	useEffect(() => {
		fetchStaffs();
	}, []);

	const fetchStaffs = async () => {
		if (props.staffs.length < 1) {
			try {
				const rs = await request(`${staffAPI}`, 'GET', true);
				props.loadStaff(rs);
			} catch (error) {
				console.log(error);
			}
		}

		// let staffs = props.staffs.map(el => el.first_name + ' ' + el.last_name);
		// setStaffs(staffs);
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
				const rs = await request(`${searchAPI}?q=${query}`, 'GET', true);
				setSearching(false);
				setPatients(rs);
			} catch (e) {
				notifyError('Error Occurred');
			}
		}
	};

	const onSubmitForm = async data => {
		ivf.wifeLabDetails = data;
		ivf.wife_id = selectedPatient.label;
		ivf.wifeLabDetails.name = selectedPatient.value;
		props.loadPatientIVFForm(ivf);
		dispatch(props.onSubmit);
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
	return (
		<>
			<h6 className="element-header">Step {page}. Wife's Lab Details</h6>
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

					{props.location.hash ? null : (
						<div className="row">
							<div className="form-group col-sm-12">
								<div>{selectedPatient.value}</div>
								<input
									className="form-control"
									placeholder="Search for patient"
									type="text"
									name="patient_id"
									ref={patient}
									defaultValue={ivf?.wifeLabDetails?.name}
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
					)}

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
								id="amh"
								name="hormonals.amh"
								component={renderTextInput}
								label="AMH"
								placeholder="AMH"
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
						<div className="col-sm-3">
							<Field
								id="chlamyda"
								name="chlamyda"
								component={renderTextInput}
								label="CHLAMYDA"
								placeholder="CHLAMYDA"
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
};

WifeLab = reduxForm({
	form: 'WifeLab', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	validate,
})(WifeLab);

const mapStateToProps = state => {
	return {
		patient: state.user.patient,
		ivf: state.patient.ivf,
		staffs: state.hr.staffs,
	};
};

export default withRouter(
	connect(mapStateToProps, { loadStaff, loadPatientIVFForm })(WifeLab)
);
