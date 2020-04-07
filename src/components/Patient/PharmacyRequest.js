/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PharmNewRequestComponent from '../PharmNewRequestComponent';
import { connect } from 'react-redux';
import { getAllDiagnosises } from '../../actions/settings';

const PharmacyRequest = props => {
	const { patient, diagnosis } = props;
	const [diagnosisLoading, setDiagnosisLoading] = useState(false);

	useEffect(() => {
		const { getAllDiagnosises } = props;
		setDiagnosisLoading(true);
		getAllDiagnosises(() => {
			setDiagnosisLoading(false);
		});
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
			patient={patient}
			diagnosisList={diagnosisList}
			diagnosisLoading={diagnosisLoading}
		/>
	);
};

const mapStateToProps = ({ user, settings }) => ({
	patient: user.patient,
	diagnosis: settings.diagnosis,
});

export default connect(mapStateToProps, { getAllDiagnosises })(PharmacyRequest);
