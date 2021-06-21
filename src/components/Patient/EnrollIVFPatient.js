import React from 'react';

import EnrollmentForm from '../../pages/IVF/EnrollmentForm';

const EnrollIVFPatient = () => {
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Enroll IVF</h6>
				<EnrollmentForm module="patient" />
			</div>
		</div>
	);
};

export default EnrollIVFPatient;
