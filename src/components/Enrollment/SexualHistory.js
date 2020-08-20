import React from 'react';
import { Field } from 'redux-form';

import { renderSelect, renderTextInput } from '../../services/utilities';

const sex = [
	{
		id: 'yes',
		name: 'yes',
	},
	{
		id: 'no',
		name: 'no',
	},
];

const sat = [
	{
		id: 'yes',
		name: 'yes',
	},
	{
		id: 'no',
		name: 'no',
	},
	{
		id: 'maybe',
		name: 'maybe',
	},
	{
		id: 'not sure',
		name: 'not sure',
	},
];

export const SexualHistory = props => {
	return (
		<>
			<div className="col-sm-4">
				<Field
					id="coitarche"
					name="coitarche"
					component={renderTextInput}
					label="Coitarche"
					type="text"
					placeholder="Enter coitarche"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="noOfPartners"
					name="noOfPartners"
					component={renderTextInput}
					label="Number of Partner"
					type="number"
					placeholder="Enter no of partner"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="methodOfSex"
					name="methodOfSex"
					component={renderTextInput}
					label="Method Of Sex"
					type="text"
					placeholder="Enter method of sex"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="currentPartnerHealth"
					name="currentPartnerHealth"
					component={renderTextInput}
					label="Current Partner Health"
					type="text"
					placeholder="Current partner health"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="dyspareunia"
					name="dyspareunia"
					component={renderSelect}
					label="Dyspareunia"
					type="text"
					placeholder="dyspareunia"
					data={sex}
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="satisfaction"
					name="satisfaction"
					component={renderSelect}
					label="Satisfaction"
					type="text"
					placeholder="Satisfaction"
					data={sat}
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="historyOfAbuse"
					name="historyOfAbuse"
					component={renderSelect}
					label="Assault/Abuse"
					type="text"
					placeholder="select sexual assault or abuse"
					data={sat}
				/>
			</div>
		</>
	);
};
