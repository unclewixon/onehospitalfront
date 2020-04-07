/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import {
	registerNewPatient,
	createNewAppointment,
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
const Appointments = lazy(() =>
	import('../../components/FrontDesk/FrontDeskAppointments')
);
const AllAppointments = lazy(() =>
	import('../../components/FrontDesk/AllAppointments')
);

const FrontDesk = props => {
	const [ShowDashboard, setDashboard] = useState(true);
	const [ShowAppointment, setAppointment] = useState(false);
	const [ShowIncoming, setIncoming] = useState(false);
	const { match, location } = props;
	const page = location.pathname.split('/').pop();

	const onDashboard = () => {
		setDashboard(true);
		setAppointment(false);
		setIncoming(false);
	};

	const onAppointment = () => {
		setAppointment(true);
		setDashboard(false);
		setIncoming(false);
	};

	const onIncoming = () => {
		setIncoming(true);
		setDashboard(false);
		setAppointment(false);
	};

	const RegisterNewPatient = e => {
		e.preventDefault();
		props.registerNewPatient(true);
	};

	const CreateNewAppointment = e => {
		e.preventDefault();
		props.createNewAppointment(true);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<h6 className="element-header">Dashboard</h6>
							<div className="row mt-2 mb-4">
								<Link
									to={`${match.path}/`}
									className={`mx-2 btn btn-primary btn-sm  ${
										page === '' ? 'btn-outline-primary' : ''
									}`}>
									{' '}
									Dashboard
								</Link>
								<Link
									to={`${match.path}/all-appointments`}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'recent-request' ? 'btn-outline-primary' : ''
									}`}>
									{' '}
									All appointments
								</Link>
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

							<div className="row">
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
				<Queue />
			</div>
		</div>
	);
};

export default compose(
	withRouter,
	connect(null, { registerNewPatient, createNewAppointment })
)(FrontDesk);
