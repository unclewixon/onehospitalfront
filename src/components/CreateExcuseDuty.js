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


const CreateExcuseDuty = ({
	history
}) => {
	const { handleSubmit, register, setValue } = useForm()
	const [submitting, setSubmitting] = useState(false);
	const [searching, setSearching] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedStaff, setSelectedStaff] = useState('');
	const [staffs, setStaffs] = useState([])
	const [date, setDate] = useState({
		startDate: moment(Date.now()).format('YYYY-MM-DD'),
		endDate: moment(Date.now()).format('YYYY-MM-DD')
	})


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
			`${API_URI}${diagnosisAPI}search?q=${val}`,
			'GET',
			true
		);
		return res;
	};

	const getStaffValues = option => option.id;
	const getStaffLabels = option => {
		return `${option.first_name} ${option.last_name} ${option.other_names}`
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

	const dateChange = e => {
		console.log(e)
		let newDate = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		})
		setDate({
			startDate: newDate[0],
			endDate: newDate[1]
		});
	}

	const onHandleSubmit = async (value) => {
		setSubmitting(true)
		const newRequestData = {
			staff_id: value && value.staff ? value.staff : '',
			start_date: date && date.startDate ? date.startDate : '',
			end_date: date && date.endDate ? date.endDate : '',
			leave_category_id: '',
			application: value.reason,
			applyBy: value && value.consulting_doctor ? value.consulting_doctor : ''
		}
		try {
			const rs = await request(`${API_URI}/hr/leave-management`, 'POST', true, newRequestData);
			setSubmitting(false)
			notifySuccess('Leave request added')
			history.push('/front-desk#leave-request')
		} catch (error) {
			setSubmitting(false)
			notifyError('Could not add leave request');
		}
	}

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
									type="text"
									placeholder="Enter number of days for exemption"
									onChange={e => setValue('exempted_days', e.target.value)}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<label>Date</label>
								<div className="custom-date-input">
									<DatePicker
										selected={date}
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
									<DatePicker
										selected={date}
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
								<input
									id="consulting_doctor"
									name="consulting_doctor"
									className="form-control"
									type="text"
									onChange={e => setValue("consulting_doctor", e.target.value)}
								/>
							</div>
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
									type="button">
									Cancel
									</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		staff: state.user.staff
	};
};

export default withRouter(
	connect(mapStateToProps, {

	})(CreateExcuseDuty))

