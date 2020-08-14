import React from 'react';
import { renderTextInput, renderTextArea } from '../../services/utilities';

import { Field } from 'redux-form';

export const PhysicalExam = () => {
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="codema"
					name="codema"
					component={renderTextInput}
					label="Codema"
					type="text"
					placeholder="Enter codema"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="breast"
					name="breast"
					component={renderTextInput}
					label="Breast"
					type="text"
					placeholder="Enter breast"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="goitre"
					name="goitre"
					component={renderTextInput}
					label="Goitre"
					type="text"
					placeholder="Enter Goitre"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="teeth"
					name="teeth"
					component={renderTextInput}
					label="Teeth"
					type="text"
					placeholder="Enter teeth"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="nutrition"
					name="nutrition"
					component={renderTextInput}
					label="Nutrition"
					type="text"
					placeholder="Nutrition"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="anemia"
					name="anemia"
					component={renderTextInput}
					label="Anemia"
					type="text"
					placeholder="Enter anemia"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="cvs"
					name="cvs"
					component={renderTextInput}
					label="CVS"
					type="text"
					placeholder="Enter CVS"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="physicalExamComment"
					name="physicalExamComment"
					component={renderTextArea}
					label="Comment"
					type="text"
					placeholder="Enter Comment"
				/>
			</div>
		</>
	);
};
