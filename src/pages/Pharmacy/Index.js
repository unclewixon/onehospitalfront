/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import { socket } from '../../services/constants';
import PrescriptionForm from '../../components/Pharmacy/PrescriptionForm';

const PrescriptionQueue = lazy(() => import('./PrescriptionQueue'));
const PrescriptionRequests = lazy(() => import('./PrescriptionRequests'));
const Billing = lazy(() => import('./PayPoint'));

const Index = ({ match, location }) => {
	const [listenning, setListenning] = useState(false);

	const page = location.pathname.split('/').pop();

	let pageTitle = 'Request Queue';
	if (page === 'all-request') {
		pageTitle = 'Prescription Requests';
	} else if (page === 'new-request') {
		pageTitle = 'New Prescription';
	} else if (page === 'billing') {
		pageTitle = 'Transactions';
	}

	useEffect(() => {
		if (!listenning) {
			setListenning(true);

			socket.on('paypoint-queue', data => {
				if (data.payment) {
					console.log('--------- transaction -------');
					console.log(data);
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
								<Link
									to={`${match.path}`}
									className={`mx-2 btn btn-primary btn-sm  ${
										page === 'pharmacy' ? 'btn-outline-primary' : ''
									}`}>
									Prescription Queue
								</Link>
								<Link
									to={`${match.path}/all-request`}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'all-request' ? 'btn-outline-primary' : ''
									}`}>
									Prescription Requests
								</Link>
								<Link
									to={`${match.path}/new-request`}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'new-request' ? 'btn-outline-primary' : ''
									}`}>
									New Prescription
								</Link>
							</div>
							<h6 className="element-header">{pageTitle}</h6>
							<div className="row">
								<div className="col-sm-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												exact
												path={`${match.url}`}
												component={PrescriptionQueue}
											/>
											<Route
												path={`${match.url}/all-request`}
												component={PrescriptionRequests}
											/>
											<Route
												path={`${match.url}/new-request`}
												component={PrescriptionForm}
											/>
											<Route
												path={`${match.url}/billing`}
												component={Billing}
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

export default Index;
