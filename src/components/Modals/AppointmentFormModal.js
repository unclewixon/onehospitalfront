/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'react-bootstrap/Image';

import consultingImage from '../../assets/images/icon-consultatio-1.png';
import inPatientImg from '../../assets/images/in-patient.png';
import PatientAppointment from '../Forms/PatientAppointment';
import OutPatientAppointmentForm from '../Forms/OutPatientAppointmentForm';

function SelectAppointment({ setView }) {
	return (
		<div className="onboarding-content with-gradient">
			<div className="row">
				<div className="col-sm-12">
					<a
						className="element-box el-tablo"
						onClick={() => setView('consultation-form')}>
						<div className="p-4">
							<Image src={consultingImage} width={60} />
						</div>
						<div className="label">
							Create an appointment for a patient who wants to see a doctor
						</div>
						<div className="value">Consultation</div>
					</a>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<a
						className="element-box el-tablo"
						onClick={() => setView('outpatient-form')}>
						<div className="p-4">
							<Image src={inPatientImg} width={60} />
						</div>
						<div className="label">
							Create appointment for OPD patients to Lab/Radiology
						</div>
						<div className="value">OPD</div>
					</a>
				</div>
			</div>
		</div>
	);
}

const AppointmentFormModal = ({ addAppointment, closeModal }) => {
	const [currentView, setCurrentView] = useState('select-appointment');

	useEffect(() => {
		document.body.classList.add('modal-open');
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	const changeView = view => {
		setCurrentView(view);
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}>
			<div
				className="modal-dialog modal-centered"
				style={{
					maxWidth: `${
						currentView === 'consultation-form' ? '800px' : '550px'
					}`,
				}}
				role="document">
				<div className="modal-content text-center">
					<div className="modal-header faded smaller">
						<div className="modal-title">New Appointment</div>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={closeModal}>
							<span aria-hidden="true"> ×</span>
						</button>
					</div>

					{
						{
							'select-appointment': <SelectAppointment setView={changeView} />,
							'consultation-form': (
								<PatientAppointment
									closeModal={closeModal}
									addAppointment={addAppointment}
								/>
							),
							'outpatient-form': <OutPatientAppointmentForm />,
						}[currentView]
					}
				</div>
			</div>
		</div>
	);
};

export default AppointmentFormModal;
