/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PharmNewRequestComponent from '../PharmNewRequestComponent';
import { connect } from 'react-redux';
import { getAllDiagnosises } from '../../actions/settings';

const PharmacyRequest = props => {
	const { patient, diagnosis } = props;

	useEffect(() => {
		const { getAllDiagnosises } = props;
		getAllDiagnosises();
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
		<PharmNewRequestComponent patient={patient} diagnosisList={diagnosisList} />
	);
};

const mapStateToProps = ({ user, settings }) => ({
	patient: user.patient,
	diagnosis: settings.diagnosis,
});

export default connect(mapStateToProps, { getAllDiagnosises })(PharmacyRequest);
