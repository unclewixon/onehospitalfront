import React from 'react';
import { Field } from 'redux-form';

import { renderTextInput, renderSelect } from '../../services/utilities';

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

export const FGM = () => {
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="f_g_m"
					name="f_g_m"
					component={renderTextInput}
					label="FGM"
					type="text"
					placeholder="Enter F.G.M"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="fgmType"
					name="fgmType"
					component={renderSelect}
					label="FGM Type"
					type="text"
					data={fgmType}
				/>
			</div>
		</>
	);
};
