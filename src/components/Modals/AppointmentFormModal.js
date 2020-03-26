/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

import { closeModals } from '../../actions/general';
import { request, formatNumber } from '../../services/utilities';
import { API_URI, socket } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentFormModal = (props) => {
	const { register, handleSubmit, setValue, getValues } = useForm();
	const [departments, setDepartments] = useState();
	const [rooms, setRooms] = useState();
	const [specializations, setSpecializations] = useState();
	const [validationMessage, setValidationMessage] = useState();
	const [patients, setPatients] = useState();
	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState([]);

	const today = moment().format('YYYY-MM-DD');

	useEffect(() => {
		document.body.classList.add('modal-open');
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	async function getPatients() {
		const rs = await request(`${API_URI}/patient/list`, 'GET', true);
		const res = rs.map((patient) => ({
			value: patient.id,
			label: patient.surname + ', ' + patient.other_names,
		}));
		setPatients(res);
	}

	async function getConsultationServices() {
		const rs = await request(`${API_URI}/services/consultations`, 'GET', true);
		const res = rs.map((service) => ({
			value: service,
			label: service.name +' N'+formatNumber(service.tariff),
		}));
		setServices(res);
	}

	async function getDepartments() {
		const rs = await request(`${API_URI}/departments`, 'GET', true);
		const res = rs.map((department) => ({
			value: department.id,
			label: department.name,
		}));
		setDepartments(res);
	}

	async function getConsultingRooms() {
		const rs = await request(`${API_URI}/consulting-rooms`, 'GET', true);
		const res = rs.map((room) => ({
			value: room.id,
			label: room.name,
		}));
		setRooms(res);
	}

	async function getSpecializations() {
		const rs = await request(`${API_URI}/specializations`, 'GET', true);
		const res = rs.map((spec) => ({
			value: spec.id,
			label: spec.name,
		}));
		setSpecializations(res);
	}

	async function validateAppointment(patient_id, service_id) {
		const rs = await request(`${API_URI}/front-desk/appointments/validate?patient_id=${patient_id}&service_id=${service_id}`, 'GET', true);
		setValidationMessage(`The patient is to pay N${ formatNumber(rs.amount)}`)
	}

	const handleAppointmentTypeChange = service => {
		setValue('serviceType', service.id);
		const values = getValues();
		if(values.patient_id) {
			validateAppointment(values.patient_id, values.serviceType)
		}else{
			notifyError('Please select a patient');
		}
	}

	useEffect(() => {
		getPatients();
	}, []);

	useEffect(() => {
		getDepartments();
	}, []);

	useEffect(() => {
		getConsultationServices();
	}, []);

	useEffect(() => {
		getSpecializations();
	}, []);

	useEffect(() => {
		getConsultingRooms();
	}, []);

	useEffect(() => {
		setValue('appointment_date', new Date());
	}, []);

	useEffect(() => {
		socket.on('appointmentSaved', (res) => {
			setSubmitting(false);
			if (res.success) {
				notifySuccess('New appointment record has been saved!');
				props.closeModals(false);
			} else {
				notifyError(res.message || 'Could not save appointment record');
			}
		});
	}, [socket]);

	const onSubmit = async (values) => {
		// console.log(values);
		setSubmitting(true);
		socket.emit('saveAppointment', values);
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div className="modal-dialog modal-centered" role="document">
				<div className="modal-content text-center">
					<div className="modal-header faded smaller">
						<div className="modal-title">New Appointment</div>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => props.closeModals(false)}>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>

					<div className="onboarding-content with-gradient">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="modal-body">
								<div className="form-group">
									<label>Patient</label>
									<Select
										id="patient"
										placeholder="Select Patient"
										options={patients}
										ref={register({ name: 'patient_id' })}
										onChange={(evt) => {
											setValue('patient_id', String(evt.value));
										}}
									/>
								</div>
								<div className="form-group">
									<label>What is wrong with the patient?</label>
									<textarea
										className="form-control"
										name="description"
										rows="3"
										placeholder="Enter a breif description"
										ref={register}></textarea>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label> Department</label>
											<Select
												id="department"
												placeholder="Select Department"
												options={departments}
												ref={register({ name: 'department_id' })}
												onChange={(evt) => {
													if (evt == null) {
														setValue('department_id', null);
													} else {
														setValue('department_id', String(evt.value));
													}
												}}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Whom To See?</label>
											<Select
												id="gender"
												placeholder="Select Whom to see"
												options={specializations}
												ref={register({ name: 'specialization_id' })}
												onChange={(evt) => {
													if (evt == null) {
														setValue('specialization_id', null);
													} else {
														setValue('specialization_id', String(evt.value));
													}
												}}
											/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label>Appointment Type</label>
									<Select
										id="gender"
										placeholder=""
										options={services}
										ref={register({ name: 'serviceType' })}
										onChange={(evt) => {
											if (evt == null) {
												setValue('serviceType', null);
											} else {
												handleAppointmentTypeChange(evt.value);
											}
										}}
									/>
									{validationMessage && (<div className="help-text text-danger">{validationMessage}</div>)}
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label> Appointment Date</label>
											<div className="date-input">
												<DatePicker
													dateFormat="yyyy-MM-dd"
													className="single-daterange form-control"
													ref={register({
														name: 'appointment_date',
														defaultValue: appointmentDate,
													})}
													selected={appointmentDate}
													onChange={(date) => {
														setValue('appointment_date', date);
														setAppointmentDate(date);
													}}
												/>
											</div>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label>Consulting Room</label>
											<Select
												id="gender"
												placeholder="Select"
												options={rooms}
												ref={register({ name: 'consulting_room_id' })}
												onChange={(evt) => {
													if (evt == null) {
														setValue('consulting_room_id', null);
													} else {
														setValue('consulting_room_id', String(evt.value));
													}
												}}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label> Referred By</label>
											<input
												className="form-control"
												placeholder=""
												type="text"
												name="referredBy"
												ref={register}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label> Referral Company</label>
											<input
												className="form-control"
												placeholder=""
												type="text"
												name="referralCompany"
												ref={register}
											/>
										</div>
									</div>
								</div>
								<div className="form-check">
									<label className="form-check-label">
										<input
											className="form-check-input mt-0"
											name="sendToQueue"
											value={true}
											type="checkbox"
											ref={register}
										/>{' '}
										Add patient to queue
									</label>
								</div>
							</div>
							<div className="modal-footer buttons-on-right">
								<button
									className="btn btn-primary"
									type="submit"
									disabled={submitting}>
									{submitting ? (
										<img src={waiting} alt="submitting" />
									) : (
										'Save Schedule'
									)}
								</button>
								<button
									className="btn btn-link"
									data-dismiss="modal"
									type="button"
									onClick={() => props.closeModals(false)}>
									{' '}
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { closeModals })(AppointmentFormModal);
