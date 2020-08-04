import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { formatNumber, request } from '../../services/utilities';
import { serviceAPI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import { addTransaction } from '../../actions/transaction';

function InPatientAppointmentForm(props) {
	const { register, handleSubmit, setValue, getValues } = useForm();
	const [departments, setDepartments] = useState();
	const [rooms, setRooms] = useState();
	const [specializations, setSpecializations] = useState();
	const [validationMessage, setValidationMessage] = useState();
	const [patients, setPatients] = useState();
	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);

	const today = moment().format('YYYY-MM-DD');

	async function getPatients() {
		const rs = await request(`patient/list`, 'GET', true);
		const res = rs.map(patient => ({
			value: patient.id,
			label: patient.surname + ', ' + patient.other_names,
		}));
		setPatients(res);
	}

	const fetchServicesByCategory = async id => {
		try {
			const rs = await request(
				`${serviceAPI}` + '/categories/' + id,
				'GET',
				true
			);
			const res = rs.map(service => ({
				value: service,
				label: service.name + ' N' + formatNumber(service.tariff),
			}));
			setServices(res);
		} catch (error) {
			console.log(error);
			notifyError('error fetching imaging requests for the patient');
		}
	};

	async function getConsultationServicesCategory() {
		const rs = await request(`services/categories`, 'GET', true);
		const res = rs.map(service => ({
			value: service.id,
			label: service.name,
		}));
		setServicesCategory(res);
	}

	async function getConsultationServices() {
		const rs = await request(`services/consultations`, 'GET', true);
		const res = rs.map(service => ({
			value: service,
			label: service.name + ' N' + formatNumber(service.tariff),
		}));
		setServices(res);
	}

	async function getDepartments() {
		const rs = await request(`departments`, 'GET', true);
		const res = rs.map(department => ({
			value: department.id,
			label: department.name,
		}));
		setDepartments(res);
	}

	async function getConsultingRooms() {
		const rs = await request(`consulting-rooms`, 'GET', true);
		const res = rs.map(room => ({
			value: room.id,
			label: room.name,
		}));
		setRooms(res);
	}

	async function getSpecializations() {
		const rs = await request(`specializations`, 'GET', true);
		const res = rs.map(spec => ({
			value: spec.id,
			label: spec.name,
		}));
		setSpecializations(res);
	}

	async function validateAppointment(patient_id, service_id) {
		const rs = await request(
			`front-desk/appointments/validate?patient_id=${patient_id}&service_id=${service_id}`,
			'GET',
			true
		);
		setValidationMessage(`The patient is to pay N${formatNumber(rs.amount)}`);
	}

	const handleServiceCategoryChange = evt => {
		setValue('serviceType', null);
		fetchServicesByCategory(evt);
	};

	const handleAppointmentTypeChange = service => {
		setValue('serviceType', service.id);
		const values = getValues();
		if (values.patient_id) {
			validateAppointment(values.patient_id, values.serviceType);
		} else {
			notifyError('Please select a patient');
		}
	};

	// useEffect(() => {
	// 	socket.on('appointmentSaved', res => {
	// 		setSubmitting(false);
	// 		if (res.success) {
	// 			notifySuccess('New appointment record has been saved!');
	// 			props.addTransaction(res.appointment);
	// 			props.closeModals(false);
	// 		} else {
	// 			notifyError(res.message || 'Could not save appointment record');
	// 		}
	// 	});
	// }, [socket]);

	const onSubmit = async values => {
		setSubmitting(true);
		const rs = await request(
			`front-desk/appointments/new`,
			'POST',
			true,
			values
		);
		setSubmitting(false);
		if (rs.success) {
			notifySuccess('New appointment record has been saved!');
			props.addTransaction(rs.appointment);
			props.closeModals(false);
		} else {
			notifyError(rs.message || 'Could not save appointment record');
		}
	};

	useEffect(() => {
		getPatients();
	}, []);

	useEffect(() => {
		getDepartments();
	}, []);

	useEffect(() => {
		getConsultationServicesCategory();
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
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="modal-body">
				<div className="form-group">
					<label>Patient</label>
					<Select
						id="patient"
						placeholder="Select Patient"
						options={patients}
						ref={register({ name: 'patient_id' })}
						onChange={evt => {
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
								onChange={evt => {
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
								onChange={evt => {
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

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Appointment Category</label>
							<Select
								id="serviceCategory"
								placeholder=""
								options={servicesCategory}
								ref={register({ name: 'serviceCategory' })}
								onChange={evt => {
									if (evt == null) {
										setValue('serviceCategory', null);
									} else {
										handleServiceCategoryChange(evt.value);
									}
								}}
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Appointment Type</label>
							<Select
								id="serviceType"
								placeholder=""
								options={services}
								ref={register({ name: 'serviceType' })}
								onChange={evt => {
									if (evt == null) {
										setValue('serviceType', null);
									} else {
										handleAppointmentTypeChange(evt.value);
									}
								}}
							/>
							{validationMessage && (
								<div className="help-text text-danger">{validationMessage}</div>
							)}
						</div>
					</div>
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
									onChange={date => {
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
								onChange={evt => {
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
				<button className="btn btn-primary" type="submit" disabled={submitting}>
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
	);
}

export default connect(null, { closeModals, addTransaction })(
	InPatientAppointmentForm
);
