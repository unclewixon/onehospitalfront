/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { qsParse } from '../../services/utilities';
import AllAppointments from './AllAppointments';
import PatientForm from '../../components/Modals/PatientForm';
import { hasCreateAppointmentPermission, hasViewAppointmentPermission } from '../../permission-utils/appointment';

const Appointments = ({ location }) => {
	const [activePage, setActivePage] = useState('');
	const [count, setCount] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const staff = useSelector(state => state.user.profile);

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page !== activePage) {
			setActivePage(page);
		}

		const query = qsParse(location.search.replace('?', ''));
		setCount(parseInt(query?.new || 0, 10) + 1);
	}, [activePage, location.search, page]);

	const newPatient = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	return (
		<div className="element-wrapper">
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						{hasViewAppointmentPermission(staff.permissions) && (
							<li className="nav-item">
								<Link
									className={`nav-link ${
										activePage === 'queue' ? 'active' : ''
									}`}
									to="/front-desk/appointments/queue">
									Todays Appointments
								</Link>
							</li>
						)}
						{hasViewAppointmentPermission(staff.permissions) && (
							<li className="nav-item">
								<Link
									aria-expanded="false"
									className={`nav-link ${
										activePage === 'history' ? 'active' : ''
									}`}
									to="/front-desk/appointments/history">
									All Appointments
								</Link>
							</li>
						)}
						<li className="nav-item nav-actions d-sm-block">
							<div className="row no-gutters">
								<div className="col-md-6">
									<a
										className="btn btn-primary btn-sm text-white"
										onClick={() => newPatient()}>
										<i className="os-icon os-icon-plus-circle"></i>
										<span>New Patient</span>
									</a>
								</div>
								{hasCreateAppointmentPermission(staff.permissions) && (
									<div className="col-md-6">
										<Link
											className="btn btn-primary btn-sm text-white"
											to={{
												pathname: '/front-desk/appointments/queue',
												search: `?new=${count}`,
												state: { from: location.pathname },
											}}>
											<i className="os-icon os-icon-plus-circle"></i>
											<span>New Appointment</span>
										</Link>
									</div>
								)}
							</div>
						</li>
					</ul>
				</div>
			</div>
			{activePage === 'queue' && <AllAppointments filter="today" />}
			{activePage === 'history' && <AllAppointments filter="all" />}
			{showModal && <PatientForm closeModal={() => closeModal()} />}
		</div>
	);
};

export default Appointments;
