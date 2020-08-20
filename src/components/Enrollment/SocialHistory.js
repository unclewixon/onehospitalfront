import React from 'react';
import { Field } from 'redux-form';

import { renderSelect, renderTextInput } from '../../services/utilities';

const maritalStatus = [
	{
		id: 'single',
		name: 'Single',
	},
	{
		id: 'married',
		name: 'Married',
	},
];

export const SocialHistory = () => {
	return (
		<>
			<div className="col-sm-12">
				<Field
					id="maritalStatus"
					name="maritalStatus"
					component={renderSelect}
					label="Select Marital Status"
					placeholder="Select Marital Status"
					data={maritalStatus}
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="occupation"
					name="occupation"
					component={renderTextInput}
					label="Occupation"
					type="text"
					placeholder="Enter Occupation"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="homeEnvironment"
					name="homeEnvironment"
					component={renderTextInput}
					label="Home Environment"
					type="text"
					placeholder="Enter home environment"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="dailyRoutine"
					name="dailyRoutine"
					component={renderTextInput}
					label="Daily routine"
					type="text"
					placeholder="Enter daily routine"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="dietaryPattern"
					name="dietaryPattern"
					component={renderTextInput}
					label="Dietary Pattern"
					type="text"
					placeholder="Enter dietary Pattern"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="exercisePattern"
					name="exercisePattern"
					component={renderTextInput}
					label="Exercise Pattern"
					type="text"
					placeholder="Enter exercise pattern"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="sleepPattern"
					name="sleepPattern"
					component={renderTextInput}
					label="Sleep Pattern"
					type="text"
					placeholder="Enter sleep pattern"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="coffeConsumption"
					name="coffeConsumption"
					component={renderTextInput}
					label="Coffee Consumption"
					type="text"
					placeholder="Enter coffee consumption"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="tobaccoUse"
					name="tobaccoUse"
					component={renderTextInput}
					label="Tobacco Use"
					type="text"
					placeholder="Enter tobacco use"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="alcoholUse"
					name="alcoholUse"
					component={renderTextInput}
					label="Alcohol Use"
					type="text"
					placeholder="Enter alcohol use"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="drugUse"
					name="drugUse"
					component={renderTextInput}
					label="Drug Use"
					type="text"
					placeholder="Enter drug use"
				/>
			</div>
		</>
	);
};
