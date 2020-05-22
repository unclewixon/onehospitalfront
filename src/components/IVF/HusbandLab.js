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

const validate = validateAntennatal;
export class HusbandLab extends Component {
	state = {
		searching: false,
		patients: [],
		query: '',
		staffs: [],
	};

	componentDidMount() {
		this.fetchStaffs();
	}

	fetchStaffs = async () => {
		if (this.props.staffs.length < 1) {
			try {
				const rs = await request(`${API_URI}${staffAPI}`, 'GET', true);
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
					`${API_URI}${searchAPI}?q=${this.state.query}`,
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
		//this.props.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.patient.current.value = name;
		this.setState({ patients: [] });
	};
	render() {
		const { handleSubmit, error, page, name, previousPage } = this.props;
		const { searching, patients } = this.state;

		console.log(name);
		return (
			<>
				<h6 className="element-header">Step {page}. Husband's Lab Details</h6>
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
							<div className="form-group col-sm-12">
								<label>Husband (Secondary Patient Patient)</label>

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

						<h5>SFA (Andrology)</h5>
						<br />

						<div className="row">
							<div className="col-sm-3">
								<Field
									id="count"
									name="count"
									component={renderTextInput}
									label="Count 10^6 ML"
									placeholder="Count 10^6 ML"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="mortility"
									name="mortility"
									component={renderTextInput}
									label="Mortility"
									placeholder="Mortility"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="morphility"
									name="morphility"
									component={renderTextInput}
									label="Morphility"
									placeholder="Morphility"
								/>
							</div>

							<div className="col-sm-6">
								<Field
									id="andrology_summary"
									name="andrology_summary"
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
									name="hiv"
									component={renderTextInput}
									label="HIV"
									placeholder="HIV"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="hep_b"
									name="hep_b"
									component={renderTextInput}
									label="HEP-B"
									placeholder="HEP-B"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="hep_c"
									name="hep_c"
									component={renderTextInput}
									label="HEP-C"
									placeholder="HEP-C"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="vdrl"
									name="vdrl"
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
									name="randomBlood"
									component={renderTextInput}
									label="Random Blood Sugar"
									placeholder="Random Blood Sugar"
								/>
							</div>

							<div className="col-sm-6">
								<Field
									id="fastingBlood"
									name="fastingBlood"
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
									name="fsh"
									component={renderTextInput}
									label="FSH"
									placeholder="FSH"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="lh"
									name="lh"
									component={renderTextInput}
									label="LH"
									placeholder="LH"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="prol"
									name="prol"
									component={renderTextInput}
									label="PROL"
									placeholder="PROL"
								/>
							</div>

							<div className="col-sm-3">
								<Field
									id="testosterone"
									name="testosterone"
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
	}
}

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
	};
};

export default withRouter(connect(mapStateToProps, { loadStaff })(HusbandLab));
