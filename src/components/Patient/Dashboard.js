/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import VisitNotesTable from './VisitNotesTable';
import VisitSummaryTable from './VisitSummaryTable';
import PatientBills from './PatientBills';
import AppointmentHistory from './AppointmentHistory';
import CreateNote from '../Modals/CreateNote';

const Dashboard = () => {
	const [tab, setTab] = useState('visitNotes');
	const [showModal, setShowModal] = useState(false);

	const addNote = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const user = useSelector(state => state.user.profile);

	return (
		<div className="col-lg-12 col-md-12">
			<div className="element-box mt-2">
				<div className="os-tabs-w">
					<div className="os-tabs-controls os-tabs-complex">
						<ul className="nav nav-tabs">
							<li className="nav-item">
								<a
									className={
										tab === 'visitNotes' ? 'nav-link active' : 'nav-link'
									}
									onClick={() => setTab('visitNotes')}
								>
									Visit Notes
								</a>
							</li>
							<li className="nav-item">
								<a
									className={
										tab === 'visitSummary' ? 'nav-link active' : 'nav-link'
									}
									onClick={() => setTab('visitSummary')}
								>
									Visit Summary
								</a>
							</li>
							<li className="nav-item">
								<a
									className={
										tab === 'appointment' ? 'nav-link active' : 'nav-link'
									}
									onClick={() => setTab('appointment')}
								>
									Appointment History
								</a>
							</li>
							<li className="nav-item">
								<a
									className={tab === 'billing' ? 'nav-link active' : 'nav-link'}
									onClick={() => setTab('billing')}
								>
									Billing
								</a>
							</li>
							{(user.role.slug === 'it-admin' || user.role.slug === 'doctor') &&
								tab === 'visitNotes' && (
									<li className="nav-item nav-actions d-sm-block">
										<a
											className="btn btn-primary btn-sm text-white"
											onClick={() => addNote()}
										>
											<i className="os-icon os-icon-ui-22"></i>
											<span>New Note</span>
										</a>
									</li>
								)}
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
			{showModal && (
				<CreateNote
					closeModal={closeModal}
					updateNote={() => {}}
					type="consultation"
				/>
			)}
		</div>
	);
};

export default withRouter(Dashboard);
