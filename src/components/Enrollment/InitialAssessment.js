import React from 'react';
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker';

import { renderTextInput } from '../../services/utilities';

export const InitialAssessment = props => {
	const { dom, setDom } = props;
	return (
		<>
			<div className="col-sm-4">
				<Field
					id="initialMenarche"
					name="initialMenarche"
					component={renderTextInput}
					label="Menarche"
					type="text"
					placeholder="Enter menarche"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="initialMenstralCycle"
					name="initialMenstralCycle"
					component={renderTextInput}
					label="Menstral Cycle"
					type="text"
					placeholder="Enter menstral cycle"
				/>
			</div>

			<div className="col-sm-4">
				<div className="form-group">
					<label>Date of movement</label>
					<div className="custom-date-input">
						<DatePicker
							selected={dom}
							onChange={date => setDom(date, 'dom')}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							dateFormat="dd-MMM-yyyy"
							className="single-daterange form-control"
							placeholderText="Select date of movement"
							maxDate={new Date()}
						/>
					</div>
				</div>
			</div>
			<div className="col-sm-4">
				<Field
					id="w_r"
					name="w_r"
					component={renderTextInput}
					label="W.R"
					type="text"
					placeholder="Enter W.R"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="initHeight"
					name="initHeight"
					component={renderTextInput}
					label="Height(cm)"
					type="number"
					placeholder="Enter height"
				/>
			</div>
			<div className="col-sm-4">
				<Field
					id="initWeight"
					name="initWeight"
					component={renderTextInput}
					label="Weight(kg)"
					type="number"
					placeholder="Enter weight"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="height_of_fundus"
					name="height_of_fundus"
					component={renderTextInput}
					label="Height of Fundus(cm)"
					type="number"
					placeholder="Enter height of fundus"
				/>
			</div>

			<div className="col-sm-4">
				<Field
					id="engaged"
					name="engaged"
					component={renderTextInput}
					label="Engaged"
					type="text"
					placeholder="Enter engaged"
				/>
			</div>
		</>
	);
};
