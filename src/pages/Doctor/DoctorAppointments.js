import React, { useCallback, useEffect, useState } from 'react';
import waiting from '../../assets/images/waiting.gif';
import { formatDateStr, request } from '../../services/utilities';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import { withRouter } from 'react-router-dom';
import AppointmentTable from '../../components/Doctor/AppointmentTable';

const { RangePicker } = DatePicker;

const DoctorAppointments = ({ profile }) => {
	const staff = profile.details;
	const [state, setState] = useState({
		filtering: false,
		loading: false,
		id: null,
		startDate: '',
		endDate: '',
		status: '',
	});
	const [appointments, setAppointments] = useState([]);

	const init = useCallback(async () => {
		setState({ ...state, loading: true });
		request(
			`front-desk/appointments?startDate=${state.startDate}&endDate=${state.endDate}`,
			'GET',
			true
		)
			.then(res => {
				setState({ ...state, loading: false, filtering: false });
				setAppointments(
					res.filter(appointment => appointment.whomToSee.id === staff.id)
				);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	const doFilter = e => {
		e.preventDefault();
		setState({ ...state, filtering: true });
		init();
	};

	const change = e => {
		//console.log(e.target.value)
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const dateChange = e => {
		let date = e.map(d => {
			return formatDateStr(d._d);
		});

		setState({
			...state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	const { filtering, loading } = state;

	return (
		<>
			<div className="content-i">
				<div className="content-box">
					<div className="element-wrapper">
						<div className="element-actions">
							<form style={{ display: 'flex' }}>
								<div className="mr-2">
									<RangePicker onChange={e => dateChange(e)} />
								</div>
								<div>
									<button
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={doFilter}>
										<i className="os-icon os-icon-ui-37" />
										<span>
											{filtering ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Filter'
											)}
										</span>
									</button>
								</div>
							</form>
						</div>
						<h6 className="element-header">Appointment History </h6>

						<div className="element-content">
							<div className="element-box-tp">
								<div className="table-responsive">
									<AppointmentTable
										appointments={appointments}
										loading={loading}
										today={false}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
const mapStateToProps = state => {
	return {
		profile: state.user.profile,
	};
};

export default withRouter(connect(mapStateToProps)(DoctorAppointments));
