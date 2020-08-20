import React from 'react';
import { Field } from 'redux-form';

import { renderTextInput, renderTextArea } from '../../services/utilities';

export const LabObservation = () => {
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="h_b"
					name="h_b"
					component={renderTextInput}
					label="H.B"
					type="text"
					placeholder="Enter H.B"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="hbsag"
					name="hbsag"
					component={renderTextInput}
					label="HBSAg"
					type="text"
					placeholder="Enter HBSAg"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="hiv"
					name="hiv"
					component={renderTextInput}
					label="HIV"
					type="text"
					placeholder="Enter HIV"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="vdrl"
					name="vdrl"
					component={renderTextInput}
					label="VDRL"
					type="text"
					placeholder="Enter VDRL"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="urinalysis"
					name="urinalysis"
					component={renderTextInput}
					label="Urinalysis"
					type="text"
					placeholder="Enter urinalysis"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="lab_comment"
					name="lab_comment"
					component={renderTextArea}
					label="Comment"
					type="text"
					placeholder="Enter Comment"
				/>
			</div>
		</>
	);
};
