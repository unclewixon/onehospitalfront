import React from 'react';
import DatePicker from 'react-datepicker';
import { Field } from 'redux-form';

import {
	renderSelect,
	renderTextInput,
	renderTextArea,
} from '../../services/utilities';

const sex = [
	{
		id: 'male',
		name: 'male',
	},
	{
		id: 'female',
		name: 'female',
	},
];

export const ObstericHistory = props => {
	const { dob, setDate } = props;
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="gestHistory"
					name="gestHistory"
					component={renderTextInput}
					label="Gest  history"
					type="text"
					placeholder="Enter gest history"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="sex"
					name="sex"
					component={renderSelect}
					label="Sex"
					placeholder="Select Sex"
					data={sex}
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="weight"
					name="weight"
					component={renderTextInput}
					label="Weight"
					type="number"
					placeholder="Enter weight"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="obsteric_alive"
					name="obsteric_alive"
					component={renderTextInput}
					label="Alive"
					type="text"
					placeholder="alive ?"
				/>
			</div>

			<div className="col-sm-6">
				<div className="form-group">
					<label>DOB</label>
					<div className="custom-date-input">
						<DatePicker
							selected={dob}
							onChange={date => setDate(date, 'dob')}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							dateFormat="dd-MMM-yyyy"
							className="single-daterange form-control"
							placeholderText="Select date of birth"
							maxDate={new Date()}
						/>
					</div>
				</div>
			</div>
			<div className="col-sm-6">
				<Field
					id="abnormalities"
					name="abnormalities"
					component={renderTextInput}
					label="Abnormalities"
					type="text"
					placeholder="Enter Abnormalities"
				/>
			</div>
			<div className="col-sm-12">
				<Field
					id="additional_comment"
					name="additional_comment"
					component={renderTextArea}
					label="Additional Comment"
					type="text"
					placeholder="Enter Additional Comment"
				/>
			</div>
		</>
	);
};
