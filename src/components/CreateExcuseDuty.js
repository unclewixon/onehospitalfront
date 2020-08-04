import React, { useState } from 'react';
import { connect } from 'react-redux';
import waiting from '../assets/images/waiting.gif';
import moment from 'moment';
import { notifySuccess, notifyError } from './../services/notify';
import { API_URI, diagnosisAPI } from '../services/constants';
import { request } from '../services/utilities';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';

const CreateExcuseDuty = ({ history }) => {
	const { handleSubmit, register, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedStaff, setSelectedStaff] = useState('');
	const [selectedDoctor, setSelectedDoctor] = useState('');
	const [duration, setDuration] = useState(1);
	const [date, setDate] = useState(new Date());
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const getOptionValues = option => option.id;
	const getOptionLabels = option => option.description;
	const handleChangeOptions = selectedOption => {
		setValue('diagnosis', selectedOption);
		setSelectedOption(selectedOption);
	};
	const getOptions = async inputValue => {
		if (!inputValue) {
			return [];
		}
		let val = inputValue.toUpperCase();
		const res = await request(
			`${API_URI}/${diagnosisAPI}search?q=${val}`,
			'GET',
			true
		);
		return res;
	};

	const getStaffValues = option => option.id;
	const getStaffLabels = option => {
		return `${option.first_name} ${option.last_name} ${option.other_names}`;
	};
	const handleStaffOptions = selectedStaff => {
		setValue('staff', selectedStaff);
		setSelectedStaff(selectedStaff);
	};
	const getStaffs = async inputValue => {
		if (!inputValue) {
			return [];
		}
		const res = await request(
			`${API_URI}/hr/staffs/find?q=${inputValue}`,
			'GET',
			true
		);
		return res;
	};

	const getDoctorValues = option => option.id;
	const getDoctorLabels = option => {
		return `${option.first_name} ${option.last_name} ${option.other_names}`;
	};
	const handleDoctorOptions = selectedDoctor => {
		setValue('consulting_doctor', selectedDoctor);
		setSelectedDoctor(selectedDoctor);
	};
	const getDoctors = async inputValue => {
		if (!inputValue) {
			return [];
		}
		const res = await request(
			`${API_URI}/hr/staffs/find?q=${inputValue}`,
			'GET',
			true
		);
		const filteredRes =
			res && res.length
				? res.filter(staff => staff.job_title === 'Doctor')
				: [];
		return res;
	};

	const getEndDate = () => {
		const newStartDate = moment(date).format('YYYY-MM-DD');
		const newDuration = duration ? duration : 1;
		const newDate = moment(startDate)
			.add(newDuration, 'days')
			.format('YYYY-MM-DD');
		setStartDate(newStartDate);
		setEndDate(newDate);
	};

	const onHandleSubmit = async value => {
		setSubmitting(true);
		const newRequestData = {
			staff_id: value && value.staff ? value.staff.id : '',
			start_date: startDate ? startDate : '',
			end_date: endDate ? endDate : '',
			leave_category_id: '248cd662-a260-46be-bc90-dbaeb1ba1f1c',
			application: value ? value.reason : '',
			appliedBy:
				value && value.consulting_doctor ? value.consulting_doctor.id : '',
			diagnosis_id: value && value.diagnosis ? value.diagnosis : '',
		};
		try {
			const rs = await request(
				`${API_URI}/hr/leave-management`,
				'POST',
				true,
				newRequestData
			);
			setSubmitting(false);
			notifySuccess('Leave request added');
			history.push('/front-desk#excuse-duty');
		} catch (error) {
			setSubmitting(false);
			notifyError('Could not add excuse duty');
		}
	};

	return (
		<div className="element-wrapper my-4">
			<h6 className="element-header"> Create Excuse Duty</h6>
			<div className="element-box">
				<div className="form-block">
					<form onSubmit={handleSubmit(onHandleSubmit)}>
						<div className="row">
							<div className="form-group col-sm-6">
								<label>Staff ID</label>
								<AsyncSelect
									required
									cacheOptions
									value={selectedStaff}
									getOptionValue={getStaffValues}
									getOptionLabel={getStaffLabels}
									defaultOptions
									name="staff"
									ref={register({ name: 'staff', required: true })}
									loadOptions={getStaffs}
									onChange={handleStaffOptions}
									placeholder="Enter Staff Name"
								/>
							</div>
							<div className="col-sm-6">
								<label>Exempted for day:</label>
								<input
									id="exempted_days"
									name="exempted_days"
									className="form-control"
									ref={register}
									type="number"
									placeholder="Enter number of days for exemption"
									onChange={e => {
										setDuration(e.target.value);
										getEndDate();
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-3">
								<label>Start Date</label>
								<div className="custom-date-input">
									<DatePicker
										selected={date}
										peekNextMonth
										onChange={date => {
											setDate(date);
											getEndDate();
										}}
										showMonthDropdown
										required
										ref={register}
										showYearDropdown
										dropdownMode="select"
										dateFormat="dd-MMM-yyyy"
										className="single-daterange form-control"
										placeholderText="Select date of leave"
										minDate={new Date()}
									/>
								</div>
							</div>
							<div className="col-sm-3">
								<label>End Date</label>
								<div className="custom-date-input">
									<DatePicker
										value={endDate}
										disabled
										peekNextMonth
										showMonthDropdown
										required
										ref={register}
										showYearDropdown
										dropdownMode="select"
										dateFormat="dd-MMM-yyyy"
										className="single-daterange form-control"
										placeholderText="Select date of leave"
										minDate={new Date()}
									/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group">
									<label>Diagnosis Data</label>
									<AsyncSelect
										required
										cacheOptions
										value={selectedOption}
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										name="diagnosis"
										ref={register({ name: 'diagnosis', required: true })}
										loadOptions={getOptions}
										onChange={handleChangeOptions}
										placeholder="Enter ICD10 Code"
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<label>Consulting doctor</label>
								<AsyncSelect
									required
									cacheOptions
									value={selectedDoctor}
									getOptionValue={getDoctorValues}
									getOptionLabel={getDoctorLabels}
									defaultOptions
									name="consulting_doctor"
									ref={register({ name: 'consulting_doctor', required: true })}
									loadOptions={getDoctors}
									onChange={handleDoctorOptions}
									placeholder="Enter Staff Name"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12 form-group">
								<label>Doctor's Note</label>
								<textarea
									id="reason"
									name="reason"
									ref={register}
									type="text"
									style={{ width: '100%', borderRadius: '7px', height: '80px' }}
									onChange={e => setValue('reason', e.target.value)}
									placeholder="Enter doctor's note"
								/>
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-sm-12 text-right">
								<button
									className="btn btn-primary"
									disabled={submitting}
									type="submit">
									{submitting ? <img src={waiting} alt="submitting" /> : 'Save'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		staff: state.user.staff,
	};
};

export default withRouter(connect(mapStateToProps, {})(CreateExcuseDuty));
