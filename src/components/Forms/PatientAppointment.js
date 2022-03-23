import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import moment from 'moment';

import waiting from '../../assets/images/waiting.gif';
import {
	staffname,
	request,
	patientname,
	formatCurrency,
} from '../../services/utilities';
import { serviceAPI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { searchAPI } from '../../services/constants';
import { AppointmentSchema } from '../../services/validationSchemas';
import { startBlock, stopBlock } from '../../actions/redux-block';

const consultations = [
	{
		label: 'Regular Encounter/Initial Consultation/Normal Consultation',
		value: 'initial',
	},
	{ label: 'Follow Up Consultation', value: 'follow-up' },
	{ label: 'Investigation Review', value: 'review' },
];

const defaultValues = {
	consultation_id: 'initial',
	appointment_date: new Date(),
};

const PatientAppointment = ({ addAppointment, closeModal }) => {
	const { register, handleSubmit, setValue, errors } = useForm({
		validationSchema: AppointmentSchema,
		defaultValues,
	});

	const departments = useSelector(state =>
		state.department
			.filter(d => d.has_appointment === 1)
			.map(dept => ({
				...dept,
				label: dept.name,
				value: dept.id,
			}))
	);

	const [patient, setPatient] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [doctors, setDoctors] = useState([]);
	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState([]);
	const [consultation, setConsultation] = useState({ ...consultations[0] });
	const [department, setDepartment] = useState({ ...departments[0] });
	const [doctor, setDoctor] = useState(null);
	const [service, setService] = useState(null);

	const dispatch = useDispatch();

	async function getActiveDoctors() {
		try {
			const rs = await request('utility/active-doctors', 'GET', true);
			const res = rs.map(item => ({
				...item,
				value: item.id,
				label: staffname(item) + ' (Room ' + item.room.name + ')',
			}));
			setDoctors(res);
		} catch (e) {}
	}

	const fetchServicesByCategory = useCallback(
		async slug => {
			try {
				const url = `${serviceAPI}/${slug}`;
				const rs = await request(url, 'GET', true);
				const res = rs.map(service => ({
					...service,
					value: service.id,
					label: service.name,
				}));
				setServices(res);
				dispatch(stopBlock());
			} catch (error) {
				console.log({ error });
				notifyError('error fetching consultations');
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			dispatch(startBlock());
			setValue('department_id', departments[0].id);
			try {
				fetchServicesByCategory('consultancy');
				getActiveDoctors();
			} catch (e) {}
			setLoaded(true);
		}
	}, [departments, dispatch, fetchServicesByCategory, loaded, setValue]);

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async data => {
		try {
			if (!service) {
				notifyError('Select specialty');
				return;
			}

			dispatch(startBlock());
			setSubmitting(true);
			const values = { ...data, service_id: service.id, doctor, consultation };
			const url = 'front-desk/appointments/new';
			const rs = await request(url, 'POST', true, values);
			setSubmitting(false);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('New appointment scheduled!');
				addAppointment(rs.appointment);
				closeModal();
			} else {
				notifyError(rs.message || 'Could not schedule appointment');
			}
		} catch (e) {
			dispatch(stopBlock());
			setSubmitting(false);
			notifyError(e.message || 'Could not schedule appointment');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="modal-body">
				{patient && patient.lastAppointment && (
					<div className="onboarding-text alert-custom text-center">
						{`Last Appointment Date - ${moment(
							patient.lastAppointment.appointment_date
						).format('DD MMM, YYYY HH:mm A')}`}
					</div>
				)}
				{patient && patient.outstanding < 0 && (
					<div className="alert alert-danger mt-3">
						{`Outstanding Balance: ${formatCurrency(
							patient.outstanding,
							true
						)}`}
					</div>
				)}
				<div className="row mt-3">
					<div className="col-sm-6">
						<div className="form-group relative">
							<label>Patient</label>
							{patient && (
								<div className="posit-top">
									<div className="row">
										<div className="col-sm-12">
											<span className="badge badge-info text-white">
												{patient.hmo.name}
											</span>
										</div>
									</div>
								</div>
							)}
							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient"
								ref={register({ name: 'patient_id' })}
								loadOptions={getOptions}
								onChange={e => {
									setValue('patient_id', e?.id);
									setPatient(e);
								}}
								placeholder="Search patients"
							/>
							<small className="text-danger">
								{errors.patient_id && errors.patient_id.message}
							</small>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label> Appointment Date</label>
							<div className="date-input">
								<DatePicker
									dateFormat="dd-MMM-yyyy"
									className="single-daterange form-control"
									ref={register({ name: 'appointment_date' })}
									selected={appointmentDate}
									onChange={date => {
										setValue('appointment_date', date);
										setAppointmentDate(date);
									}}
								/>
								<small className="text-danger">
									{errors.appointment_date && errors.appointment_date.message}
								</small>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>Consultation</label>
							<Select
								id="consultation"
								name="consultation"
								placeholder="Select a consultation"
								options={consultations}
								ref={register({ name: 'consultation_id' })}
								defaultValue={consultation}
								onChange={e => {
									setConsultation(e);
									setValue('consultation_id', e.value);
								}}
							/>
							<small className="text-danger">
								{errors.consultation_id && errors.consultation_id.message}
							</small>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Select Department</label>
							<Select
								id="department"
								name="department"
								placeholder="Select Department"
								options={departments}
								ref={register({ name: 'department_id' })}
								defaultValue={department}
								onChange={e => {
									setDepartment(e);
									setValue('department_id', e.id);
								}}
							/>
							<small className="text-danger">
								{errors.department_id && errors.department_id.message}
							</small>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label>Who do you want to see?</label>
					<Select
						id="specialty"
						name="specialty"
						getOptionValue={option => option.id}
						getOptionLabel={option => option.name}
						placeholder="Select a Specialty"
						options={services}
						ref={register({ name: 'specialty' })}
						onChange={e => {
							if (e == null) {
								setValue('specialty', null);
								setService(null);
							} else {
								setService(e);
								setValue('specialty', e.id);
							}
						}}
					/>
					<small className="text-danger">
						{errors.specialty && errors.specialty.message}
					</small>
				</div>

				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Whom To See?</label>
							<Select
								id="doctor_id"
								name="doctor_id"
								placeholder="Select Whom to see"
								options={doctors}
								ref={register({ name: 'doctor_id' })}
								onChange={e => {
									if (e == null) {
										setValue('doctor_id', null);
										setDoctor(null);
									} else {
										setValue('consulting_room_id', e.room?.id);
										setValue('doctor_id', e.value);
										setDoctor(e);
									}
								}}
							/>
							{doctor && (
								<small className="text-danger">
									{`Consultation Room ${doctor.room.name}`}
								</small>
							)}
						</div>
					</div>
				</div>

				<div className="form-group">
					<label>Reason for visit</label>
					<textarea
						className="form-control"
						name="description"
						rows="3"
						placeholder="Enter a brief description"
						ref={register}
					></textarea>
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
						'Schedule Appointment'
					)}
				</button>
				<button className="btn btn-link" type="button" onClick={closeModal}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default PatientAppointment;
