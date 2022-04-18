/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import startCase from 'lodash.startcase';

import { qsParse } from '../../services/utilities';
import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import PatientForm from '../../components/Modals/PatientForm';

const PageOne = lazy(() => import('./PageOne'));
const PageTwo = lazy(() => import('./PageTwo'));
const PageThree = lazy(() => import('./PageThree'));

const CallCenter = ({ location }) => {
	const [title, setTitle] = useState('Dashboard');
	const [showModal, setShowModal] = useState(false);
	const [count, setCount] = useState(0);

	const staff = useSelector(state => state.user.profile);

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page === 'call-center') {
			setTitle('Groups');
		} else if (page === 'task') {
			setTitle('Tasks');
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
		<Suspense fallback={<Splash />}>
			<Switch>
				<Route path="/update-center/page-one" component={PageOne} />
				<Route path="/update-center/page-two" component={PageTwo} />
				<Route path="/update-center/page-three" component={PageThree} />

				<Route component={NoMatch} />
			</Switch>
		</Suspense>
	);
};
export default withRouter(CallCenter);
