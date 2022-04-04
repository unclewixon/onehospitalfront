import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import waiting from '../assets/images/waiting.gif';
import { notifySuccess, notifyError } from './../services/notify';
import { request } from '../services/utilities';

const CreateLeave = ({ history }) => {
	const { register, handleSubmit, setValue } = useForm();
	const [submitting, setSubmitting] = useState(false);
	const [date, setDate] = useState('');
	const [leaveDate, setLeaveDate] = useState('');
	const [category, setCategory] = useState('');
	const [endDate, setEndDate] = useState('');
	const [leaveCategories, setLeaveCategories] = useState([]);

	const staff = useSelector(state => state.user.profile);

	const fetchLeaveCategory = useCallback(async () => {
		try {
			const rs = await request('leave-category', 'GET', true);
			setLeaveCategories(rs);
		} catch (error) {
			notifyError('could not fetch leave categories!');
		}
	}, []);

	useEffect(() => {
		fetchLeaveCategory();
	}, [fetchLeaveCategory]);

	const leaveOptions = leaveCategories.map(leave => ({
		...leave,
		value: leave.id,
		label: leave.name,
	}));

	const getEndDate = categoryId => {
		const catObj = leaveCategories.find(c => c.id === categoryId);
		const duration = catObj && catObj.duration ? parseInt(catObj.duration) : 0;
		const start = date === '' ? new Date() : date;
		const startDate = moment(start).format('YYYY-MM-DD');
		const newDate = moment(start).add(duration, 'days').format('YYYY-MM-DD');
		setDate(start);
		setLeaveDate(startDate);
		setEndDate(newDate);
	};

	const onHandleSubmit = async value => {
		try {
			setSubmitting(true);
			const newRequestData = {
				staff_id: staff && staff.details ? staff.details.id : '',
				start_date: leaveDate ? leaveDate : '',
				end_date: endDate ? endDate : '',
				leave_category_id: category ? category : '',
				application: value.reason,
			};
			await request('hr/leave-management', 'POST', true, newRequestData);
			setSubmitting(false);
			notifySuccess('Leave request sent');
			history.push('/my-account/leave-request');
		} catch (error) {
			setSubmitting(false);
			notifyError('Could not send leave request');
		}
	};

	return (
		<div className="row my-4">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Leave Request</h6>
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
											onChange={e => {
												setCategory(e.value);
												getEndDate(e.value);
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
														setDate(date);
														getEndDate(category);
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
											className="form-control"
											onChange={e => setValue('reason', e.target.value)}
											placeholder="Enter your leave reason"
										/>
									</div>
								</div>

								<div className="row mt-2">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Submit'
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

export default withRouter(CreateLeave);
