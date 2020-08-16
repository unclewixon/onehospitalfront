/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	registerNewPatient,
	createNewAppointment,
	viewAppointmentDetail,
} from '../../actions/general';

import Queue from '../../components/Queue';
import Dashboard from '../../components/FrontDesk/FrontDeskDashboard';
//import Appointments from '../../components/FrontDesk/FrontDeskAppointments';
import Incoming from '../../components/FrontDesk/Incoming';
import { compose } from 'redux';
import {
	addPatientUploadData,
	loadPatientUploadData,
} from '../../actions/patient';
import NoMatch from '../NoMatch';

import Splash from '../../components/Splash';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import startCase from 'lodash.startcase';
import { socket } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
const Appointments = lazy(() =>
	import('../../components/FrontDesk/FrontDeskAppointments')
);
const AllAppointments = lazy(() =>
	import('../../components/FrontDesk/AllAppointments')
);

const AllPatients = lazy(() =>
	import('../../components/FrontDesk/AllPatients')
);

const FrontDesk = props => {
	const [title, setTitle] = useState('Dashboard');
	const { match, location } = props;
	const page = location.pathname.split('/').pop();

	const RegisterNewPatient = e => {
		e.preventDefault();
		props.registerNewPatient(true);
	};

	const CreateNewAppointment = e => {
		e.preventDefault();
		props.createNewAppointment(true);
	};

	useEffect(() => {
		if (page === 'front-desk') {
			setTitle('Dashboard');
		} else {
			setTitle(startCase(page));
		}
		socket.on('appointment-update', data => {
			if (data.action === 1) {
				notifySuccess('Doctor has accepted to see patient');
			} else {
				notifyError('Doctor has declined to see patient');
			}
			// open appointment modal
			ViewAppointmentDetail(data.appointment);
		});
	}, [page]);

	const ViewAppointmentDetail = appointment => {
		props.viewAppointmentDetail(appointment);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<Link
									to="#"
									onClick={RegisterNewPatient}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'filled-request' ? 'btn-outline-primary' : ''
									}`}>
									{' '}
									Add new patient
								</Link>
								<Link
									to="#"
									onClick={CreateNewAppointment}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'all-request' ? 'btn-outline-primary' : ''
									}`}>
									{' '}
									New appointment
								</Link>
							</div>
							<h6 className="element-header">{startCase(title)}</h6>

							<div className="element-content row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}/`}
												component={Appointments}
											/>
											<Route
												path={`${match.url}/all-appointments`}
												component={AllAppointments}
											/>
											<Route
												path={`${match.url}/all-patients`}
												component={AllPatients}
											/>
											<Route component={NoMatch} />
										</Switch>
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="content-panel compact">
				<Queue department="all" />
			</div>
		</div>
	);
};

export default compose(
	withRouter,
	connect(null, {
		registerNewPatient,
		createNewAppointment,
		viewAppointmentDetail,
	})
)(FrontDesk);
