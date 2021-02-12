/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import startCase from 'lodash.startcase';

import {
	registerNewPatient,
	createNewAppointment,
	viewAppointmentDetail,
} from '../../actions/general';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import { socket } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';

const AllAppointments = lazy(() =>
	import('../../components/FrontDesk/AllAppointments')
);

const AllPatients = lazy(() =>
	import('../../components/FrontDesk/AllPatients')
);

const InsuranceTrans = lazy(() =>
	import('../../components/FrontDesk/InsuranceTrans')
);

const FrontDesk = props => {
	const [title, setTitle] = useState('Dashboard');
	const [listenning, setListenning] = useState(false);

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
		if (!listenning) {
			setListenning(true);

			if (page === 'front-desk') {
				setTitle('Appointments');
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
				props.viewAppointmentDetail(data.appointment);
			});
		}
	}, [listenning, page, props]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<a
									onClick={RegisterNewPatient}
									className={`mr-2 btn btn-primary btn-sm ${
										page === 'filled-request' ? 'btn-outline-primary' : ''
									}`}>
									New Patient
								</a>
								<a
									onClick={CreateNewAppointment}
									className={`btn btn-primary btn-sm ${
										page === 'all-request' ? 'btn-outline-primary' : ''
									}`}>
									New Appointment
								</a>
							</div>
							<h6 className="element-header">{startCase(title)}</h6>

							<div className="element-content row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}`}
												component={AllAppointments}
											/>

											<Route
												path={`${match.url}/patients`}
												component={AllPatients}
											/>

											<Route
												path={`${match.url}/insurance-transactions`}
												component={InsuranceTrans}
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
