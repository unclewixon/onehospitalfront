/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import startCase from 'lodash.startcase';

import { qsParse } from '../../services/utilities';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import PatientForm from '../../components/Modals/PatientForm';

const AllPatients = lazy(() => import('./AllPatients'));
const InsuranceTransactions = lazy(() => import('./InsuranceTransactions'));
const InPatientCare = lazy(() => import('../Nurse/InPatientCare'));

const FrontDesk = ({ location }) => {
	const [title, setTitle] = useState('Dashboard');
	const [showModal, setShowModal] = useState(false);
	const [count, setCount] = useState(0);

	const staff = useSelector(state => state.user.profile);

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page === 'front-desk') {
			setTitle('Appointments');
		} else if (page === 'admitted') {
			setTitle('Patients on Admission');
		} else {
			setTitle(startCase(page));
		}

		const query = qsParse(location.search.replace('?', ''));
		setCount(parseInt(query?.new || 0, 10) + 1);
	}, [location.search, page]);

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
			{(staff?.role?.slug === 'front-desk' ||
				staff?.role?.slug === 'it-admin') && (
				<div className="element-actions">
					<a
						onClick={() => newPatient()}
						className="btn btn-primary btn-sm mr-2">
						New Patient
					</a>
					<Link
						to={{
							pathname: '/front-desk/appointments/queue',
							search: `?new=${count}`,
							state: { from: location.pathname },
						}}
						className="btn btn-primary btn-sm">
						New Appointment
					</Link>
				</div>
			)}
			<h6 className="element-header">{startCase(title)}</h6>
			<div className="element-content row">
				<div className="col-sm-12">
					<Suspense fallback={<Splash />}>
						<Switch>
							<Route path="/front-desk/patients" component={AllPatients} />
							<Route path="/front-desk/admitted" component={InPatientCare} />
							<Route
								path="/front-desk/insurance-transactions"
								component={InsuranceTransactions}
							/>
							<Route component={NoMatch} />
						</Switch>
					</Suspense>
				</div>
			</div>
			{showModal && <PatientForm closeModal={() => closeModal()} />}
		</div>
	);
};

export default withRouter(FrontDesk);
