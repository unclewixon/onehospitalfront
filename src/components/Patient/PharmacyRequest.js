/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';

import PrescriptionForm from '../Pharmacy/PrescriptionForm';

const PharmacyRequest = props => {
	const { patient } = props;

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<PrescriptionForm patient={patient} module="patient" />
			</div>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({
	patient: user.patient,
});

export default connect(mapStateToProps)(PharmacyRequest);
