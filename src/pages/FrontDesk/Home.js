/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import startCase from 'lodash.startcase';
import qs from 'querystring';

import { registerNewPatient } from '../../actions/general';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import { socket } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';

const AllAppointments = lazy(() => import('./AllAppointments'));
const AllPatients = lazy(() => import('./AllPatients'));
const InsuranceTrans = lazy(() => import('./InsuranceTrans'));

const Home = ({ match, location }) => {
	const [title, setTitle] = useState('Dashboard');
	const [listenning, setListenning] = useState(false);
	const [count, setCount] = useState(0);

	const dispatch = useDispatch();

	const page = location.pathname.split('/').pop();

	const doRegisterNewPatient = e => {
		e.preventDefault();
		dispatch(registerNewPatient(true));
	};

	useEffect(() => {
		if (page === 'front-desk') {
			setTitle('Appointments');
		} else {
			setTitle(startCase(page));
		}

		const query = qs.parse(location.search.replace('?', ''));
		setCount(parseInt(query?.new || 0, 10) + 1);
	}, [location.search, page]);

	useEffect(() => {
		if (!listenning) {
			setListenning(true);

			socket.on('appointment-update', data => {
				console.log(data);
				if (data.action === 1) {
					notifySuccess('Doctor has accepted to see patient');
				} else {
					notifyError('Doctor has declined to see patient');
				}
			});
		}
	}, [listenning]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<a
									onClick={doRegisterNewPatient}
									className={`mr-2 btn btn-primary btn-sm ${
										page === 'filled-request' ? 'btn-outline-primary' : ''
									}`}>
									New Patient
								</a>
								<Link
									to={{
										pathname: '/front-desk',
										search: `?new=${count}`,
										state: { from: location.pathname },
									}}
									className={`btn btn-primary btn-sm ${
										page === 'all-request' ? 'btn-outline-primary' : ''
									}`}>
									New Appointment
								</Link>
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

export default withRouter(Home);
