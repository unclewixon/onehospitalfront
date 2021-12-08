/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import startCase from 'lodash.startcase';
import qs from 'querystring';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import { socket } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import PatientForm from '../../components/Modals/PatientForm';

const AllAppointments = lazy(() => import('./AllAppointments'));
const AllPatients = lazy(() => import('./AllPatients'));
const InsuranceTransactions = lazy(() => import('./InsuranceTransactions'));
const InPatientCare = lazy(() => import('../Nurse/InPatientCare'));

const Home = ({ match, location }) => {
	const [title, setTitle] = useState('Dashboard');
	const [listenning, setListenning] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [count, setCount] = useState(0);

	const staff = useSelector(state => state.user.profile);

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page === 'front-desk') {
			setTitle('Appointments');
		} else if (page === 'admitted-patients') {
			setTitle('Patients on Admission');
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

	const newPatient = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							{(staff?.role?.slug === 'front-desk' ||
								staff?.role?.slug === 'it-admin') && (
								<div className="element-actions">
									<a
										onClick={() => newPatient()}
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
							)}
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
												path={`${match.url}/admitted-patients`}
												component={InPatientCare}
											/>
											<Route
												path={`${match.url}/insurance-transactions`}
												component={InsuranceTransactions}
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
			{showModal && <PatientForm closeModal={() => closeModal()} />}
		</div>
	);
};

export default withRouter(Home);
