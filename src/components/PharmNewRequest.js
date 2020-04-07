import React, { useEffect, useState } from 'react';
import PharmNewRequestComponent from './PharmNewRequestComponent';
import { getAllDiagnosises } from '../actions/settings';
import { connect } from 'react-redux';
import { API_URI } from '../services/constants';
import { request } from '../services/utilities';

const PharmNewRequest = props => {
	const { diagnosis } = props;
	const [allPatients, setAllPatients] = useState([]);
	const [patientsLoading, setPatientsLoading] = useState(false);
	const [diagnosisLoading, setDiagnosisLoading] = useState(false);

	useEffect(() => {
		const { getAllDiagnosises } = props;
		setDiagnosisLoading(true);
		getAllDiagnosises(() => {
			setDiagnosisLoading(false);
		});
	}, []);

	useEffect(() => {
		const getPatients = async () => {
			setPatientsLoading(true);
			const rs = await request(`${API_URI}/patient/list`, 'GET', true);
			const res = rs.map(patient => ({
				value: patient.id,
				label: patient.surname + ', ' + patient.other_names,
			}));
			setAllPatients(res);
			setPatientsLoading(false);
		};
		getPatients();
	}, []);

	const diagnosisList = diagnosis
		? diagnosis.map(diag => {
				return {
					label: diag.icd10Code,
					value: diag.icd10Code,
				};
		  })
		: [];

	return (
		<PharmNewRequestComponent
			diagnosisList={diagnosisList}
			allPatients={allPatients}
			patientsLoading={patientsLoading}
			diagnosisLoading={diagnosisLoading}
		/>
	);
};

const mapStateToProps = ({ user, settings }) => ({
	patient: user.patient,
	diagnosis: settings.diagnosis,
});

export default connect(mapStateToProps, { getAllDiagnosises })(PharmNewRequest);
