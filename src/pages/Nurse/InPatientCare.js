/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Patients from './Patients';

const InPatientCare = ({ location, match }) => {
	const [activePage, setActivePage] = useState('');

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page !== activePage) {
			setActivePage(page);
		}
	}, [activePage, page]);

	return (
		<div className="element-wrapper">
			{match.path !== '/front-desk/admitted' && (
				<div className="os-tabs-w mx-1">
					<div className="os-tabs-controls os-tabs-complex">
						<ul className="nav nav-tabs upper">
							<li className="nav-item">
								<Link
									className={`nav-link ${
										activePage === 'admitted' ? 'active' : ''
									}`}
									to="/nurse/in-patients/admitted"
								>
									Admitted Patients
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${
										activePage === 'discharged' ? 'active' : ''
									}`}
									to="/nurse/in-patients/discharged"
								>
									Dicharged
								</Link>
							</li>
						</ul>
					</div>
				</div>
			)}
			{activePage === 'admitted' && <Patients filter="admitted" />}
			{activePage === 'discharged' && <Patients filter="discharged" />}
		</div>
	);
};

export default InPatientCare;
