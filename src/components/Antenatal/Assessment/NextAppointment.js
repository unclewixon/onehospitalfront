/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, change, reset } from 'redux-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { renderTextInput, request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { antenatalAPI } from '../../../services/constants';
import { notifyError } from '../../../services/notify';
import { notifySuccess } from '../../../services/notify';
import { messageService } from "../../../services/message";

const validate = values => {
	const errors = {};
	return errors;
};

const NextAppointment = ({
	appointment_id,
	handleSubmit,
	change,
	previous,
	error,
	closeModal,
	assessment,
	reset,
	antenatal,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [apptTime, setApptTime] = useState('');
	const [appointmentDate, setAppointmentDate] = useState('');

	const dispatch = useDispatch();

	const staff = useSelector(state => state.user.profile.details);

	const initData = useCallback(() => {
		setApptTime(assessment?.apptTime || '');
		setAppointmentDate(assessment?.appointmentDate || '');
	}, [assessment]);

	useEffect(() => {
		if (!loaded) {
			initData();
			setLoaded(true);
		}
	}, [initData, loaded]);

	const checkNextDate = async date => {
		try {
			setAppointmentDate(date);
			dispatch(change('appointmentDate', date));
			dispatch(startBlock());
			const _date = moment(new Date(date));
			const _next = _date.format('YYYY-MM-DD HH:mm:ss');
			const url = `front-desk/appointments/check-date/available?date=${_next}&staff_id=${staff.id}`;
			const rs = await request(url, 'GET', true);
			if (rs && rs.success && rs.available) {
				dispatch(stopBlock());
			} else {
				dispatch(stopBlock());
				const _time = _date.format('DD-MMM-YYYY h:mm A');
				notifyError(`The selected time (${_time}) is not available`);
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError('Error, could not check date');
		}
	};

	const saveAssessment = async data => {
		try {
			dispatch(startBlock());
			const info = {
				measurement: {
					fetal_heart_rate: data.fetalHeartRate,
					height_of_fundus: data.heightOfFundus,
				},
				position_of_foetus: data.positionOfFoetus,
				fetal_lie: data.fetalLie,
				brim: data.relationshipToBrim,
				comment: data.comment,
				investigation: {
					labRequest: {
						lab_tests: data.lab_tests || [],
						lab_note: data.lab_note,
						lab_urgent: data.lab_urgent,
					},
					radiologyRequest: {
						scans: data.scans || [],
						scan_note: data.scan_note,
						scan_urgent: data.scan_urgent,
					},
					pharmacyRequest: {
						prescriptions: data.prescriptions || [],
						regimen_note: data.regimen_note,
					},
				},
				nextAppointment: {
					date: data.appointmentDate
						? moment(new Date(data.appointmentDate)).format(
								'YYYY-MM-DD HH:mm:ss'
						  )
						: '',
					duration: data.appt_duration || '',
					time: data.apptTime?.value || '',
				},
				appointment_id: appointment_id,
			};
			const url = `${antenatalAPI}/assessments/${antenatal.id}`;
			const rs = await request(url, 'POST', true, info);
			dispatch(stopBlock());
			if (rs && rs.success) {
				messageService.sendMessage({
					type: 'update-appointment',
					data: { appointment: rs.appointment },
				});

				notifySuccess('Assessment completed successfully');
				dispatch(reset('antenatalAssessment'));
				closeModal(true);
			} else {
				dispatch(stopBlock());
				notifyError('Error, could not save antenatal assessment');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error, could not save antenatal assessment');
		}
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(saveAssessment)}>
				{error && (
					<div
						className="alert alert-danger"
						dangerouslySetInnerHTML={{
							__html: `<strong>Error!</strong> ${error}`,
						}}
					/>
				)}
				<div className="row">
					<div className="col-sm-4">
						<div className="form-group">
							<label>Appointment Date</label>
							<DatePicker
								dateFormat="dd-MMM-yyyy h:mm aa"
								className="single-daterange form-control"
								selected={appointmentDate}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={15}
								onChange={date => checkNextDate(date)}
							/>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="form-group">
							<Field
								id="note"
								name="appt_duration"
								component={renderTextInput}
								label="Duration"
								type="text"
								placeholder="Duration"
							/>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="form-group">
							<label>(Minutes/Hour/Days/etc)</label>
							<Select
								placeholder="-- Select --"
								name="appt_time"
								value={apptTime}
								options={[
									{ value: '', label: '-- Select --' },
									{ value: 'minutes', label: 'Minutes' },
									{ value: 'hour', label: 'Hour(s)' },
									{ value: 'day', label: 'Day(s)' },
									{ value: 'week', label: 'Week(s)' },
									{ value: 'month', label: 'Month(s)' },
								]}
								onChange={e => {
									setApptTime(e);
									dispatch(change('apptTime', e));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Finish
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: { ...ownProps.assessment },
	};
};

export default connect(mapStateToProps, { change, reset })(
	reduxForm({
		form: 'antenatalAssessment', //Form name is same
		destroyOnUnmount: false,
		forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
		validate,
	})(NextAppointment)
);
