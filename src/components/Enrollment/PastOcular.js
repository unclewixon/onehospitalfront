import React, { Component } from 'react';
import {
	renderTextInput,
	renderSelect,
	renderTextArea,
} from '../../services/utilities';

import { Field } from 'redux-form';

const fgmType = [
	{
		id: 'Type I',
		name: 'Type I',
	},
	{
		id: 'Type II',
		name: 'Type II',
	},
	{
		id: 'Type III',
		name: 'Type III',
	},
	{
		id: 'Type IV',
		name: 'Type IV',
	},
];
export const PastOcular = () => {
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="ocularTrauma"
					name="ocularTrauma"
					component={renderTextInput}
					label="History of Ocular Trauma"
					type="text"
					placeholder="Enter history of ocular trauma"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="spectacleCorrection"
					name="spectacleCorrection"
					component={renderTextInput}
					label="History of Spectacle Correction"
					type="text"
					placeholder="Enter history of spectacle correction"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="ocularSurgery"
					name="ocularSurgery"
					component={renderTextInput}
					label="History of Ocular Surgery"
					type="text"
					placeholder="Enter history of ocular surgery"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="ocularMedication"
					name="ocularMedication"
					component={renderTextInput}
					label="History of Ocular Medication"
					type="text"
					placeholder="Enter history of ocular medication"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="traditionalMedication"
					name="traditionalMedication"
					component={renderTextInput}
					label="Including traditional Medication"
					type="text"
					placeholder="Including traditional medication"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="lastEyeExam"
					name="lastEyeExam"
					component={renderTextInput}
					label="Last Eye Examination"
					type="text"
					placeholder="Enter last eye examination"
				/>
			</div>

			<div className="col-sm-12">
				<Field
					id="past_others"
					name="past_others"
					component={renderTextArea}
					label="Others"
					type="text"
					placeholder="Enter others"
				/>
			</div>
		</>
	);
};
