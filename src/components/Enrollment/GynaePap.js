import React from 'react';
import { renderTextInput } from '../../services/utilities';

import { Field } from 'redux-form';

export const GynaePap = () => {
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="abnormalPapSmear"
					name="abnormalPapSmear"
					component={renderTextInput}
					label="Abnormal Pap-Smear"
					type="text"
					placeholder="Enter abnormal pap-smear"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="followup"
					name="followup"
					component={renderTextInput}
					label="Follow up & treatment"
					type="text"
					placeholder="Enter follow up and treatment"
				/>
			</div>
		</>
	);
};
