/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { socket } from '../../services/constants';
import { request, itemRender, updateImmutable } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import AppointmentTable from '../../components/Doctor/AppointmentTable';
import { startBlock, stopBlock } from '../../actions/redux-block';

const limit = 15;

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState([]);
	const [listenning, setListenning] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: limit,
		totalPages: 0,
	});

	const profile = useSelector(state => state.user.profile);

	const dispatch = useDispatch();

	const getAppointments = useCallback(
		async page => {
			try {
				setLoading(true);
				const staff = profile.details;
				const today = moment().format('YYYY-MM-DD');
				const p = page || 1;
				const url = `front-desk/appointments?page=${p}&limit=${limit}&today=${today}&doctor_id=${
					staff.id
				}&canSeeDoctor=1&department_id=${staff?.department?.id || ''}`;
				const res = await request(url, 'GET', true);
				const { result, ...meta } = res;
				setAppointments([...result]);
				setMeta(meta);
				setLoading(false);
				dispatch(stopBlock());
			} catch (e) {
				setLoading(false);
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch appointments');
			}
		},
		[dispatch, profile]
	);

	useEffect(() => {
		if (!listenning) {
			setListenning(true);

			socket.on('consultation-queue', res => {
				console.log('new appointment message');
				if (res.success) {
					console.log(res.queue);
					const today = moment().format('YYYY-MM-DD');
					console.log(today);
					if (
						moment(res.queue.appointment.appointment_date).format(
							'YYYY-MM-DD'
						) === today
					) {
						console.log(res.queue.appointment);
						setAppointments([...appointments, res.queue.appointment]);
						setMeta({ ...meta, totalPages: meta.totalPages + 1 });
					}
					console.log(appointments);
				}
			});

			socket.on('appointment-update', data => {
				if (data.action === 1) {
					// replace with update appointments
					getAppointments();
				}
			});
		}
	}, [appointments, getAppointments, listenning, meta]);

	useEffect(() => {
		if (loading) {
			getAppointments();
		}
	}, [getAppointments, loading]);

	const updateAppointment = e => {
		const updatedAppointments = updateImmutable(appointments, e);
		setAppointments([...updatedAppointments]);
	};

	const onNavigatePage = nextPage => {
		dispatch(startBlock());
		getAppointments(nextPage);
	};

	return (
		<div className="element-wrapper">
			<h6 className="element-header">Today's Appointments</h6>
			<div className="element-box p-3 m-0">
				<div className="table-responsive">
					<AppointmentTable
						appointments={appointments}
						loading={loading}
						updateAppointment={updateAppointment}
					/>
				</div>

				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={parseInt(meta.currentPage, 10)}
							pageSize={parseInt(meta.itemsPerPage, 10)}
							total={parseInt(meta.totalPages, 10)}
							showTotal={total => `Total ${total} appointments`}
							itemRender={itemRender}
							onChange={current => onNavigatePage(current)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default withRouter(Dashboard);
