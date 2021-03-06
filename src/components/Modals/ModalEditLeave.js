import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import waiting from '../../assets/images/waiting.gif';
import { get_all_leave_category } from '../../actions/settings';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';

const ModalEditLeave = ({
	showModal,
	onModalClick,
	staff,
	get_all_leave_category,
	leave_categories,
	activeRequest,
	onExitModal,
}) => {
	const { register, handleSubmit, setValue, watch } = useForm({
		defaultValues: {
			leave_type: activeRequest.category.id,
			reason: activeRequest.application,
			endDate: activeRequest.endDate,
		},
	});
	const [submitting, setSubmitting] = useState(false);
	const [date, setDate] = useState(new Date(activeRequest.start_date));
	const [leaveDate, setLeaveDate] = useState(
		new Date(activeRequest.start_date)
	);
	const [category, setCategory] = useState(activeRequest.category);
	const [endDate, setEndDate] = useState(new Date(activeRequest.end_date));

	const values = watch();
	console.log(values);

	const fetchLeaveCategory = useCallback(async () => {
		try {
			const rs = await request(`leave-category`, 'GET', true);
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
		const catObj =
			category && category.id ? leaveObj[category.id] : leaveObj[category];
		const duration = catObj && catObj.duration ? parseInt(catObj.duration) : 0;
		const startDate = moment(date).format('YYYY-MM-DD');
		const newDate = moment(date).add(duration, 'days').format('YYYY-MM-DD');
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
			await request(
				`hr/leave-management/${activeRequest.id}/update`,
				'PATCH',
				true,
				newRequestData
			);
			setSubmitting(false);
			notifySuccess('Leave request added');
			onModalClick();
		} catch (error) {
			setSubmitting(false);
			notifyError('Could not add leave request');
		}
	};

	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}
			onExit={onExitModal}
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<div className="onboarding-content with-gradient text-center">
					<div className="modal-body">
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
												defaultValue={{
													value: category.id,
													label: category.name,
												}}
												options={leaveOptions}
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
														minDate={new Date(activeRequest.start_date)}
													/>
												</div>
											</div>
										</div>

										<div className="col-sm-4">
											<div className="form-group">
												<label>End of leave date</label>
												<div className="custom-date-input">
													<DatePicker
														disabled
														value={endDate}
														peekNextMonth
														name="endDate"
														showMonthDropdown
														ref={register({ name: 'endDate' })}
														showYearDropdown
														dropdownMode="select"
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
												type="submit"
											>
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Update leave request'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		leave_categories: state.settings.leave_categories,
		staff: state.user.staff,
	};
};
export default connect(mapStateToProps, {
	get_all_leave_category,
})(ModalEditLeave);
