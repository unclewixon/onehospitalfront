/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import SunEditor from 'suneditor-react';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { closeModals } from '../../actions/general';
import { closeLabour } from '../../actions/patient';
import { notifySuccess, notifyError } from '../../services/notify';
import searchingGIF from '../../assets/images/searching.gif';
import { Carousel } from 'antd';
import {} from '../../actions/patient';
import { loadDeliveryRecord } from '../../actions/patient';

let date = new Date();
date.setDate(date.getDate() - 3);

class ModalCreateRecordDelivery extends Component {
	state = {
		submitting: false,
		examDate: '',
		id: null,
		startDate: '',
		endDate: '',
		staffs: [],
		staff_id: '',
		staff_name: '',
		searching: false,
		query: '',
		comment: '',
	};
	handleChange = comm => {
		this.setState({ comment: comm });
	};
	staff = React.createRef();
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	createDelivery = async data => {
		let newData = { ...data };
		newData['dateOfBirth'] = moment(this.state.examDate).format('DD/MM/YYYY');
		newData['timeOfBirth'] = moment(this.state.examDate).format('LT');
		newData['pediatrician_id'] = this.state.staff_id;
		newData['comment'] = this.state.comment;
		console.log(newData);
		try {
			const { labourDetail, deliveryRecord } = this.props;

			this.setState({ submitting: true });
			const rs = await request(
				`labour-management/delivery-record/${labourDetail.id}/save`,
				'POST',
				true,
				newData
			);
			const new_arr = [rs.data, ...deliveryRecord];
			this.props.loadDeliveryRecord(new_arr);
			notifySuccess('succesfully submitted');

			this.props.closeModals(false);
			this.props.closeLabour();
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(
				e.message || 'Submission of labour measurement form not successful'
			);
		}
	};

	setDate = async (date, type) => {
		await this.setState({ [type]: date });
	};

	patientSet = pat => {
		// setValue('patient_id', pat.id);
		console.log(pat);
		let first = pat.first_name ? pat.first_name : '';
		let last = pat.last_name ? pat.last_name : '';
		let name = first + ' ' + last;

		this.setPatient(pat.id, name);
		// document.getElementById('patient').value = name;

		this.staff.current.value = name;
		this.setState({ staffs: [], query: '' });
	};

	setPatient = (value, name) => {
		this.setState({ ...this.state, staff_id: value, staff_name: name });
		console.log(this.state.staff_id, value);
	};

	handlePatientChange = e => {
		this.setState({ query: e.target.value });
		this.searchPatient();
		console.log(this.state.query, this.state.searching);
	};

	searchPatient = async () => {
		if (this.state.query.length > 2) {
			try {
				this.setState({ searching: true });

				const rs = await request(
					`hr/staffs/find?q=${this.state.query}`,
					'GET',
					true
				);
				console.log(rs);
				this.setState({ staffs: rs, searching: false });
			} catch (e) {
				notifyError(e.message || 'Error Occurred');
			}
		}
	};
	render() {
		const { submitting, examDate, searching, staffs } = this.state;
		const { error, handleSubmit } = this.props;
		console.log(staffs, searching);
		return (
			<div
				className="onboarding-modal modal fade animated show"
				role="dialog"
				style={{ display: 'block' }}>
				<div className="modal-dialog modal-lg modal-centered" role="document">
					<div className="modal-content text-center">
						<button
							aria-label="Close"
							className="close"
							type="button"
							onClick={() => this.props.closeModals(false)}>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">Record Delivery</h4>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.createDelivery)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<Carousel arrows infinite={false} className="p-4">
										<div className="px-3">
											<div className="row mt-2">
												<label>Delivery type</label>
												<div className="col-md-12 d-flex">
													<div className="col-sm-6">
														<Field
															name="deliveryType"
															component="input"
															type="radio"
															value="mormal delivery"
														/>
														<label className="mx-1">
															Full-term normal vaginal delivery
														</label>
													</div>

													<div className="col-sm-6">
														<Field
															name="deliveryType"
															component="input"
															type="radio"
															value="epistomy"
														/>
														<label className="mx-1">
															Normal vaginal delivery with epistomy
														</label>
													</div>
												</div>
												<div className="col-md-12 mt-1 d-flex">
													<div className="col-sm-6">
														<Field
															name="deliveryType"
															component="input"
															type="radio"
															value="malpresentation"
														/>
														<label className="mx-1">
															Vaginal delivery in malpresentation
														</label>
													</div>
													<div className="col-sm-6">
														<Field
															name="deliveryType"
															component="input"
															type="radio"
															value="cesarean"
														/>
														<label className="mx-1">Cesarean</label>
													</div>
												</div>

												<div className="col-md-12 mt-1 d-flex">
													<div className="col-sm-6">
														<Field
															name="deliveryType"
															component="input"
															type="radio"
															value="assisted delivery "
														/>
														<label className="mx-1">
															{' '}
															Assisted delivery(forcep or vent use)
														</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Is mother alive ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="isMotherAlive"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="isMotherAlive"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Is baby alive ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="isBabyAlive"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="isBabyAlive"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Administerd 10 units of Oxytocin ?</label>
												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="administeredOxytocin"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="administeredOxytocin"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Was the placenta delivered completely ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="placentaComplete"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="placentaComplete"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Bleeding with normal unit (&lt;500ml) ?</label>
												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="bleeading"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="bleeading"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="pl-0 col-sm-12">
													<div className="form-group">
														<label> Time and Date of Birth</label>
														<div className="custom-date-input">
															<DatePicker
																selected={examDate}
																onChange={date =>
																	this.setDate(date, 'examDate')
																}
																peekNextMonth
																showMonthDropdown
																showYearDropdown
																dropdownMode="select"
																className="single-daterange form-control"
																placeholderText="Select date and time"
																timeInputLabel="Time:"
																dateFormat="MM/dd/yyyy h:mm aa"
																showTimeInput
																minDate={date}
																required
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="row mt-2">
												<label>Baby cried immediately after birth ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="babyCried"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="babyCried"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Sex of baby?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="sexOfBaby"
															component="input"
															type="radio"
															value="female"
														/>
														<label className="mx-1">Female</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="sexOfBaby"
															component="input"
															type="radio"
															value="male"
														/>
														<label className="mx-1">Male</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="sexOfBaby"
															component="input"
															type="radio"
															value="other"
														/>
														<label className="mx-1">Other</label>
													</div>
												</div>
											</div>
										</div>

										<div className="px-3">
											<div className="row">
												<div className="col-sm-6 pl-0">
													<Field
														id="apgarScore"
														name="apgarScore"
														component={renderTextInput}
														label="APGAR Score"
														type="text"
														placeholder="Enter APGAR score"
													/>
												</div>

												<div className="col-sm-6 pl-0">
													<Field
														id="weight"
														name="weight"
														component={renderTextInput}
														label="Weight(kg)"
														placeholder="Enter weight in kg"
													/>
												</div>
											</div>

											<div className="row mt-2">
												<label>Was Vitamin K adminstered ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="administeredVitaminK"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="administeredVitaminK"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row mt-2">
												<label>Is mother Rh negative ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="negativeRH"
															component="input"
															type="radio"
															value="yes"
														/>
														<label className="mx-1">Yes</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="negativeRH"
															component="input"
															type="radio"
															value="no"
														/>
														<label className="mx-1">No</label>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-sm-12 pl-0">
													<Field
														id="drugsAdministered"
														name="drugsAdministered"
														component={renderTextInput}
														label="Drug"
														placeholder="If drugs were adminstered to the baby then mention"
													/>
												</div>
											</div>

											<div className="row mt-2">
												<label>Was the baby transfered ?</label>

												<div className="col-md-6 d-flex">
													<div className="col-sm-4">
														<Field
															name="transferredTo"
															component="input"
															type="radio"
															value="transfer out"
														/>
														<label className="mx-1">Transfer out</label>
													</div>
													<div className="col-sm-4">
														<Field
															name="transferredTo"
															component="input"
															type="radio"
															value="nicu"
														/>
														<label className="mx-1">NICU</label>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="form-group pl-0 col-sm-12">
													<label>Pediatrician's name</label>

													<input
														className="form-control"
														placeholder="Search for pediatrician's name and select"
														type="text"
														name="staff_id"
														defaultValue=""
														id="staff"
														ref={this.staff}
														onChange={this.handlePatientChange}
														autoComplete="off"
														required
													/>
													{searching && (
														<div className="searching text-center">
															<img alt="searching" src={searchingGIF} />
														</div>
													)}

													{staffs &&
														staffs.map(pat => {
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
																				__html: `${pat.first_name} ${pat.last_name}`,
																			}}
																		/>
																	</a>
																</div>
															);
														})}
												</div>
											</div>
											<div className="row">
												{/* <div className="col-sm-12 pl-0">
											<Field
												id="pediatrician_name"
												name="pediatrician_name"
												component={renderTextInput}
												label="Pediatrician's name"
												placeholder="Enter pediatrician's name"
											/>
										</div> */}
											</div>
										</div>

										<div className="px-3">
											<div className="col-sm-12 pl-0">
												<label>Delivery Note</label>
												<SunEditor
													width="100%"
													placeholder="Please type here..."
													//setContents={encounterData.complaints}
													name="comment"
													// ref={register}
													autoFocus={false}
													enableToolbar={true}
													setOptions={{
														height: 300,
														buttonList: [
															[
																'bold',
																'underline',
																'italic',
																'strike',
																'subscript',
																'superscript',
																'list',
																'align',
																'font',
																'fontSize',
																'image',
															],
														],
													}}
													//onFocus={handleFocus}
													onChange={evt => {
														this.handleChange(String(evt));
													}}
												/>
											</div>
											<div className="row mt-2">
												<div className="col-sm-12 text-right">
													<button
														className="btn btn-primary"
														disabled={submitting}
														type="submit">
														{submitting ? (
															<img src={waiting} alt="submitting" />
														) : (
															'Save'
														)}
													</button>

													<button
														className="btn btn-primary ml-2"
														onClick={() => this.props.closeModals(false)}
														type="button">
														Cancel
													</button>
												</div>
											</div>
										</div>
									</Carousel>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ModalCreateRecordDelivery = reduxForm({
	form: 'record_delivery',
})(ModalCreateRecordDelivery);
const mapStateToProps = state => {
	return {
		labourDetail: state.patient.labourDetail,
		deliveryRecord: state.patient.deliveryRecord,
	};
};
export default connect(mapStateToProps, {
	closeModals,
	closeLabour,
	loadDeliveryRecord,
})(ModalCreateRecordDelivery);
