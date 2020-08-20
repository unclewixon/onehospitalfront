import React from 'react';
import { Field } from 'redux-form';

import { renderTextInput } from '../../services/utilities';

export const FamilyHistory = () => {
	return (
		<>
			<div className="col-sm-4">
				<Field
					id="childHealthHistory"
					name="childHealthHistory"
					component={renderTextInput}
					label="Child  health history"
					type="text"
					placeholder="Enter Child  health history"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="adultHealthHistory"
					name="adultHealthHistory"
					component={renderTextInput}
					label="Child  health history"
					type="text"
					placeholder="Enter Child  health history"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="hereditaryDisease"
					name="hereditaryDisease"
					component={renderTextInput}
					label="Hereditary Disease"
					type="text"
					placeholder="Enter Hereditary Disease"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="motherHealthStatus"
					name="motherHealthStatus"
					component={renderTextInput}
					label="Mother Health Status"
					type="text"
					placeholder="Enter Mother's Health Status"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="motherAgeOfDeath"
					name="motherAgeOfDeath"
					component={renderTextInput}
					label="Mother's age of death"
					type="text"
					placeholder="Enter Mother's age of death"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="motherCauseOfDeath"
					name="motherCauseOfDeath"
					component={renderTextInput}
					label="Mother Cause of Death"
					type="text"
					placeholder="Enter Mother's Cause of Death"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="fatherHealthStatus"
					name="fatherHealthStatus"
					component={renderTextInput}
					label="Father Health Status"
					type="text"
					placeholder="Enter Father's Health Status"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="fatherAgeOfDeath"
					name="fatherAgeOfDeath"
					component={renderTextInput}
					label="Father's age of death"
					type="text"
					placeholder="Enter father's age of death"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="fatherCauseOfDeath"
					name="fatherCauseOfDeath"
					component={renderTextInput}
					label="Father Cause of Death"
					type="text"
					placeholder="Enter father's Cause of Death"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="siblingHealthStatus"
					name="siblingHealthStatus"
					component={renderTextInput}
					label="Sibling Health Status"
					type="text"
					placeholder="Enter sibling(s) Health Status"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="siblingAgeOfDeath"
					name="siblingAgeOfDeath"
					component={renderTextInput}
					label="Sibling's age of death"
					type="text"
					placeholder="Enter sibling(s) age of death"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="siblingCauseOfDeath"
					name="siblingCauseOfDeath"
					component={renderTextInput}
					label="Sibling(s) Cause of Death"
					type="text"
					placeholder="Enter sibling(s) Cause of Death"
				/>
			</div>
		</>
	);
};
