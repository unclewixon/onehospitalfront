/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import VisitNotesTable from './VisitNotesTable';
import VisitSummaryTable from './VisitSummaryTable';
import PatientBills from './PatientBills';
import AppointmentHistory from './AppointmentHistory';

const Dashboard = () => {
	const [tab, setTab] = useState('visitNotes');

	return (
		<div className="col-lg-12 col-md-12">
			<div className="element-box mt-2">
				<div className="os-tabs-w">
					<div className="os-tabs-controls">
						<ul className="nav nav-tabs smaller">
							<li className="nav-item">
								<a
									className={
										tab === 'visitNotes' ? 'nav-link active' : 'nav-link'
									}
									onClick={() => setTab('visitNotes')}>
									Visit Notes
								</a>
							</li>
							<li className="nav-item">
								<a
									className={
										tab === 'visitSummary' ? 'nav-link active' : 'nav-link'
									}
									onClick={() => setTab('visitSummary')}>
									Visit Summary
								</a>
							</li>
							<li className="nav-item">
								<a
									className={
										tab === 'appointment' ? 'nav-link active' : 'nav-link'
									}
									onClick={() => setTab('appointment')}>
									Appointment History
								</a>
							</li>
							<li className="nav-item">
								<a
									className={tab === 'billing' ? 'nav-link active' : 'nav-link'}
									onClick={() => setTab('billing')}>
									Billing
								</a>
							</li>
						</ul>
					</div>
					<div className="tab-content">
						{tab === 'visitNotes' && <VisitNotesTable />}
						{tab === 'visitSummary' && <VisitSummaryTable />}
						{tab === 'appointment' && <AppointmentHistory />}
						{tab === 'billing' && <PatientBills />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Dashboard);
