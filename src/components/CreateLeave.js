import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import waiting from '../assets/images/waiting.gif';
import { get_all_leave_category } from '../actions/settings';
import { notifySuccess, notifyError } from './../services/notify';
import { API_URI } from '../services/constants';
import { request } from '../services/utilities';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const CreateLeave = ({
	get_all_leave_category,
	leave_categories,
	staff,
	history,
}) => {
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [date, setDate] = useState(new Date());
	const [leaveDate, setLeaveDate] = useState(new Date());
	const [category, setCategory] = useState('');
	const [endDate, setEndDate] = useState('');

	const fetchLeaveCategory = useCallback(async () => {
		try {
			const rs = await request(`${API_URI}/leave-category`, 'GET', true);
			get_all_leave_category(rs);
		} catch (error) {
			notifyError('could not fetch leave categories!');
		}
	}, [get_all_leave_category]);

	useEffect(() => {
		fetchLeaveCategory();
	}, [fetchLeaveCategory]);

	let leaveObj = {};
	const leaveOptions =
		leave_categories &&
		leave_categories.map(leave => {
			leaveObj[leave.id] = {
				...leave,
				value: leave.id,
				label: leave.name,
			};
			return leaveObj[leave.id];
		});

	const getEndDate = () => {
		const catObj = category ? leaveObj[category] : '';
		const duration = catObj && catObj.duration ? parseInt(catObj.duration) : 0;
		const startDate = moment(date).format('YYYY-MM-DD');
		const newDate = moment(date)
			.add(duration, 'days')
			.format('YYYY-MM-DD');
		setLeaveDate(startDate);
		setEndDate(newDate);
	};

	const onHandleSubmit = async value => {
		setSubmitting(true);
		const newRequestData = {
			staff_id: staff && staff.details ? staff.details.id : '',
			start_date: leaveDate ? leaveDate : '',
			end_date: endDate ? endDate : '',
			leave_category_id: category ? category : '',
			application: value.reason,
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
			history.push('/front-desk#leave-request');
		} catch (error) {
			setSubmitting(false);
			notifyError('Could not add leave request');
		}
	};

	return (
		<div className="row my-4">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Create Leave Request</h6>
					<div className="element-box">
						<div className="form-block">
							<form onSubmit={handleSubmit(onHandleSubmit)}>
								<div className="row">
									<div className="col-sm-4">
										<label>Select leave type</label>
										<Select
											id="leave_type"
											name="leave_type"
											ref={register}
											placeholder="Select leave type"
											options={leaveOptions}
											defaultValue={leaveOptions[0]}
											onChange={e => {
												setCategory(e.value);
												getEndDate();
											}}
										/>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label>Date of leave start </label>
											<div className="custom-date-input">
												<DatePicker
													selected={date}
													onChange={date => {
														setDate(date, 'leave_date');
														getEndDate();
													}}
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
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label>End of leave date</label>
											<div className="custom-date-input">
												<DatePicker
													value={endDate}
													disabled
													peekNextMonth
													showMonthDropdown
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
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<textarea
											id="reason"
											name="reason"
											label="Leave Reason"
											ref={register}
											type="text"
											style={{
												width: '100%',
												borderRadius: '7px',
												height: '80px',
											}}
											onChange={e => setValue('reason', e.target.value)}
											placeholder="Enter your leave reason"
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit">
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Create leave request'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		leave_categories: state.settings.leave_categories,
		staff: state.user.staff,
	};
};
export default withRouter(
	connect(mapStateToProps, {
		get_all_leave_category,
	})(CreateLeave)
);
