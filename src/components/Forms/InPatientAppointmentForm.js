import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import waiting from '../../assets/images/waiting.gif';
import { useForm } from 'react-hook-form';
import { formatNumber, fullname, request } from '../../services/utilities';
import { serviceAPI } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { connect } from 'react-redux';
import { closeModals } from '../../actions/general';
import { addTransaction } from '../../actions/transaction';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';

function InPatientAppointmentForm(props) {
	const { register, handleSubmit, setValue, getValues } = useForm();

	const [doctorsList, setDoctorsList] = useState();
	const [rooms, setRooms] = useState();
	const [room, setRoom] = useState('');
	const [patient, setPatient] = useState(null);
	const [doctors, setDoctors] = useState();
	const [validationMessage, setValidationMessage] = useState();
	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [submitting, setSubmitting] = useState(false);
	const [services, setServices] = useState([]);
	const [servicesCategory, setServicesCategory] = useState([]);

	const fetchServicesByCategory = async id => {
		if (patient === null) {
			notifyError('please select a patient first!!!');
		} else {
			try {
				const rs = await request(
					`${serviceAPI}/categories/${id}?hmo_id=${patient?.hmo?.id}`,
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

	async function getConsultingRooms() {
		const rs = await request(`consulting-rooms`, 'GET', true);
		const res = rs.map(room => ({
			value: room.id,
			label: room.name,
		}));
		setRooms(res);
	}

	async function getActiveDoctors() {
		const rs = await request(`utility/active-doctors`, 'GET', true);
		setDoctorsList(rs);
		const res = rs.map(item => ({
			value: item.id,
			label: fullname(item) + ' (Room ' + item.room.name + ')',
		}));
		setDoctors(res);
	}

	async function validateAppointment(patient_id, service_id) {
		const url = `front-desk/appointments/validate?patient_id=${patient_id}&service_id=${service_id}`;
		const rs = await request(url, 'GET', true);
		if (rs.amount > 0) {
			register({ name: 'amount' });
			setValue('amount', rs.amount);
		}
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

	const getOptionValues = option => option.id;
	const getOptionLabels = option => `${option.other_names} ${option.surname}`;

	const getOptions = async q => {
		if (!q || q.length < 3) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		try {
			setSubmitting(true);
			const url = 'front-desk/appointments/new';
			const rs = await request(url, 'POST', true, values);
			setSubmitting(false);
			if (rs.success) {
				notifySuccess('New appointment record has been saved!');
				props.addTransaction(rs.appointment);
				props.closeModals(false);
			} else {
				notifyError(rs.message || 'Could not save appointment record');
			}
		} catch (e) {
			setSubmitting(false);
			notifyError(e.message || 'Could not save appointment record');
		}
	};

	const init = useCallback(async () => {
		await Promise.all([
			getConsultationServicesCategory(),
			getActiveDoctors(),
			getConsultingRooms(),
			// getSpecializations()
		]);
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="modal-body">
				<div className="form-group">
					<label>Patient</label>

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
				</div>
				<div className="form-group">
					<label>What is wrong with the patient?</label>
					<textarea
						className="form-control"
						name="description"
						rows="3"
						placeholder="Enter a brief description"
						ref={register}></textarea>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Whom To See?</label>
							<Select
								id="doctor_id"
								placeholder="Select Whom to see"
								options={doctors}
								ref={register({ name: 'doctor_id' })}
								onChange={evt => {
									if (evt == null) {
										setValue('doctor_id', null);
									} else {
										const doctor = doctorsList.find(
											item => item.id === evt.value
										);
										// console.log(doctorl);
										setValue('consulting_room_id', doctor?.room?.id);
										setRoom(doctor?.room?.name);
										setValue('doctor_id', evt.value);
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
								<div className="help-text text-info invert">
									{validationMessage}
								</div>
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
									dateFormat="dd-MM-yyyy"
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
							<input
								disabled={true}
								placeholder=""
								className="form-control"
								type="text"
								options={rooms}
								ref={register({ name: 'consulting_room_id' })}
								value={room}
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
