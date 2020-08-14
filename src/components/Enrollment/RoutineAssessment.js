import React from 'react';
import DatePicker from 'react-datepicker';
import { Field } from 'redux-form';

import { renderTextInput, renderTextArea } from '../../services/utilities';

export const RoutineAssessment = props => {
	const { gest_date, setGest } = props;
	return (
		<>
			<div className="col-sm-6">
				<div className="form-group">
					<label>Gestation Date</label>
					<div className="custom-date-input">
						<DatePicker
							selected={gest_date}
							onChange={date => setGest(date, 'gest_date')}
							peekNextMonth
							showMonthDropdown
							showYearDropdownRoutineAssessment
							dropdownMode="select"
							dateFormat="dd-MMM-yyyy"
							className="single-daterange form-control"
							placeholderText="Select gestational date"
						/>
					</div>
				</div>
			</div>
			<div className="col-sm-6">
				<Field
					id="routine_height_of_fundus"
					name="routine_height_of_fundus"
					component={renderTextInput}
					label="Height of fundus"
					type="number"
					placeholder="Enter Height of fundus"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="position"
					name="position"
					component={renderTextInput}
					label="Presentation/Position"
					type="text"
					placeholder="Enter presentation/position"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="fetal_heart"
					name="fetal_heart"
					component={renderTextInput}
					label="Fetal Heart"
					type="text"
					placeholder="enter fetal heart"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="routineWeight"
					name="routineWeight"
					component={renderTextInput}
					label="Weight"
					type="number"
					placeholder="Enter weight"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="oedema"
					name="oedema"
					component={renderTextArea}
					label="Oedema"
					type="text"
					placeholder="Enter Oedema"
				/>
			</div>
		</>
	);
};
