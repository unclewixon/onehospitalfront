import React from 'react';

import EnrollmentForm from '../../pages/Antenatal/EnrollmentForm';

const EnrollAntenatalPatient = () => {
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Enroll Antenatal</h6>
				<EnrollmentForm module="patient" />
			</div>
		</div>
	);
};

export default EnrollAntenatalPatient;
