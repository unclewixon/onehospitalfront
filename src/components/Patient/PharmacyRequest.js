/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';

import PrescriptionForm from '../Pharmacy/PrescriptionForm';

const PharmacyRequest = () => {
	const patient = useSelector(state => state.user.patient);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<PrescriptionForm patient={patient} module="patient" />
			</div>
		</div>
	);
};

export default PharmacyRequest;
