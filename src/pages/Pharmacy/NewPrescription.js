import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import PrescriptionForm from '../../components/Pharmacy/PrescriptionForm';
import { request } from '../../services/utilities';

const NewPrescription = () => {
	const [allPatients, setAllPatients] = useState([]);
	const [patientsLoading, setPatientsLoading] = useState(true);

	useEffect(() => {
		const getPatients = async () => {
			const rs = await request(`patient/list`, 'GET', true);
			const res = rs.map(patient => ({
				value: patient.id,
				label: `${patient.other_names} ${patient.surname}`,
			}));
			setAllPatients(res);
			setPatientsLoading(false);
		};

		if (patientsLoading) {
			getPatients();
		}
	}, [patientsLoading]);

	return (
		<PrescriptionForm
			allPatients={allPatients}
			patientsLoading={patientsLoading}
		/>
	);
};

const mapStateToProps = state => ({
	patient: state.user.patient,
});

export default connect(mapStateToProps)(NewPrescription);
